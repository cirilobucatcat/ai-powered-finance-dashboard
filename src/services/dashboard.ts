import { auth, db } from '@/firebase';
import { DashboardCountData, ITransaction } from '@/types';
import { getFiveYears } from '@/utils/helpers';
import {
  collection,
  onSnapshot,
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

  if (!user) return () => {};

  const q = query(
    collection(db, collectionName),
    where('userId', '==', user.uid)
  );

  const currentMonth = new Date().getMonth() + 1;

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map((doc) => {
      let date = doc.data().transactionAt
        ? doc.data().transactionAt.split('-')
        : [];
      let category = doc.data().category ?? 'UNCATEGORIZED';
      return {
        type: doc.data().type,
        amount: doc.data().amount,
        category,
        date,
      };
    });

    let monthlyTransactions = transactions.filter(
      (transaction) => parseInt(transaction.date[1]) === currentMonth
    );
    let monthIncome = totalByTransactionType(monthlyTransactions, 'income');
    let monthExpense = totalByTransactionType(monthlyTransactions, 'expense');
    let incomeVsExpense = getYearlyIncomeVsExpense(transactions);
    let spendingByCategory = getSpendingByCategory(transactions);

    callback({
      monthIncome,
      monthExpense,
      monthSaving: monthIncome - monthExpense,
      incomeVsExpense,
      spendingByCategory,
    });
  });

  return unsubscribe;
};

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
  parseInt(transaction.date[0]) === year;

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
