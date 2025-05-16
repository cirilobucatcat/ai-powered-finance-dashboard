import { auth, db } from "@/firebase";
import { DashboardCountData, ITransaction } from "@/types";
import { getFiveYears } from "@/utils/helpers";
import { collection, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";

const collectionName = 'transactions';
type CollectionTransaction = {
    type: any;
    amount: any;
    date: any;
}

export const listen = (callback: (data: DashboardCountData) => DashboardCountData): Unsubscribe => {
    const user = auth.currentUser

    if (!user) return () => {};

    const q = query(collection(db, collectionName), where('userId', '==', user.uid))
    const currentMonth = new Date().getMonth() + 1;
    const unsubscribe = onSnapshot(q, (snapshot) => {

        const transactions = snapshot.docs.map(doc => {
            let date = doc.data().transactionAt ? doc.data().transactionAt.split('-') : [];
            return {
                type: doc.data().type,
                amount: doc.data().amount,
                date,
            };
        })

        let monthlyTransactions = transactions.filter((transaction) => parseInt(transaction.date[1]) === currentMonth)
        let monthIncome = totalByTransactionType(monthlyTransactions, 'income');
        let monthExpense = totalByTransactionType(monthlyTransactions, 'expense');
        let incomeVsExpense = getYearlyIncomeVsExpense(transactions)

        callback({ 
            monthIncome, 
            monthExpense, 
            monthSaving: monthIncome - monthExpense, 
            incomeVsExpense
        });
    });

    return unsubscribe;
}

function getYearlyIncomeVsExpense(transactions: CollectionTransaction[]) {

    return getFiveYears().map((year) => {

        let totalExpense = totalByTransactionType(transactions.filter((transaction) => {
            return filterYear(transaction, year)
        }), 'expense')

        let totalIncome = totalByTransactionType(transactions.filter((transaction) => {
            return filterYear(transaction, year)
        }), 'income')

        return {
            year,
            totalExpense,
            totalIncome
        }
    })
}

const filterYear = (transaction: CollectionTransaction, year: number) => {
    return parseInt(transaction.date[0]) === year;
}

const totalByTransactionType = (transactions: CollectionTransaction[], type: ITransaction['type']) => {
    return transactions
        .filter((transaction) => filterTransactionType(transaction, type))
        .reduce((acc, curr) => acc + parseInt(curr.amount), 0);
}

const filterTransactionType = (transaction: CollectionTransaction, type: ITransaction['type']) => {
    return transaction.type === type
}