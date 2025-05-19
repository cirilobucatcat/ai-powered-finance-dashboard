import { auth, db } from '@/firebase';
import { DashboardCountData, ITransaction } from '@/types';
import { month } from '@/utils/constants';
import { getFiveYears } from '@/utils/helpers';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
  where,
} from 'firebase/firestore';

const collectionName = 'transactions';
type CollectionTransaction = {
  type: any;
  category: any;
  amount: any;
  date: any;
};

export const listen = (
  callback: (data: DashboardCountData) => DashboardCountData
): Unsubscribe => {
  const user = auth.currentUser;

  if (!user) return () => { };

  const q = query(
    collection(db, collectionName),
    where('userId', '==', user.uid),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {

    const transactions = snapshot.docs.map((doc) => {

      let date: string[] = doc.data().transactionAt
        ? doc.data().transactionAt.split('-')
        : [];

      let category: string = doc.data().category ?? 'UNCATEGORIZED';

      let data = doc.data() as ITransaction;

      return {
        ...data,
        id: doc.id,
        category,
        date,
      };

    });


    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    let monthlyTransactions = transactions.filter(
      (transaction) => parseInt(transaction.date[0]) === currentYear && parseInt(transaction.date[1]) === currentMonth
    );
    let monthIncome = totalByTransactionType(monthlyTransactions, 'income');
    let monthExpense = totalByTransactionType(monthlyTransactions, 'expense');
    let incomeVsExpense = getYearlyIncomeVsExpense(transactions);
    let monthlyComparison = getMonthlyComparison(transactions, currentYear);
    let spendingByCategory = getSpendingByCategory(transactions);

    callback({
      monthIncome,
      monthExpense,
      monthlyComparison,
      monthSaving: monthIncome - monthExpense,
      incomeVsExpense,
      spendingByCategory,
      transactions
    });
  });

  return unsubscribe;
};

const getMonthlyComparison = (transactions: CollectionTransaction[], currentYear: number) => {

  return month.map((_, index) => {

    let currentMonth = index + 1;
    let totalExpense = totalByTransactionType(
      transactions.filter((transaction) => filterYear(transaction, currentYear) && filterMonth(transaction, currentMonth)),
      'expense'
    );
    let totalIncome = totalByTransactionType(
      transactions.filter((transaction) => filterYear(transaction, currentYear) && filterMonth(transaction, currentMonth)),
      'income'
    );

    let totalSavings = totalIncome - totalExpense
    return {
      month: month[currentMonth - 1],
      totalExpense,
      totalIncome,
      totalSavings: totalSavings < 0 ? 0 : totalSavings
    }
  })
}

const getYearlyIncomeVsExpense = (transactions: CollectionTransaction[]) => {
  return getFiveYears().map((year) => {
    let totalExpense = totalByTransactionType(
      transactions.filter((transaction) => filterYear(transaction, year)),
      'expense'
    );
    let totalIncome = totalByTransactionType(
      transactions.filter((transaction) => filterYear(transaction, year)),
      'income'
    );

    return {
      year,
      totalExpense,
      totalIncome,
    };
  });
};

const getSpendingByCategory = (transactions: CollectionTransaction[]) => {
  let categories = [
    ...new Set(
      transactions
        .filter((transaction) => transaction.type === 'expense')
        .map((transaction) => (transaction.category as string).toUpperCase())
    ),
  ];

  return categories.map((category) => {
    let categoryAmount = transactions
      .filter(
        (transaction) =>
          (transaction.category as string).toUpperCase() === category
      )
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    return {
      category,
      amount: categoryAmount,
    };
  });
};

const filterYear = (transaction: CollectionTransaction, year: number) =>
  (parseInt(transaction.date[0]) === year);


const filterMonth = (transaction: CollectionTransaction, month: number) => parseInt(transaction.date[1]) === month;

const totalByTransactionType = (
  transactions: CollectionTransaction[],
  type: ITransaction['type']
) => {
  return transactions
    .filter((transaction) => filterTransactionType(transaction, type))
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
};

const filterTransactionType = (
  transaction: CollectionTransaction,
  type: ITransaction['type']
) => transaction.type === type;
