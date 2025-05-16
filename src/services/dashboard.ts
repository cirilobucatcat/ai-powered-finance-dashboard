import { auth, db } from "@/firebase";
import { DashboardCountData, ITransaction } from "@/types";
import { month as months } from "@/utils/constants";
import { collection, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";

const collectionName = 'transactions';
type CollectionTransaction = {
    type: any;
    amount: any;
    month: any;
}
export const listen = (callback: (data: DashboardCountData) => DashboardCountData): Unsubscribe => {
    const user = auth.currentUser

    if (!user) return () => {};

    const q = query(collection(db, collectionName), where('userId', '==', user.uid))
    const currentMonth = new Date().getMonth() + 1;
    const unsubscribe = onSnapshot(q, (snapshot) => {

        const transactions = snapshot.docs.map(doc => {
            let month = doc.data().transactionAt ? doc.data().transactionAt.split('-') : [];
            return {
                type: doc.data().type,
                amount: doc.data().amount,
                month
            };
        })

        let monthTransactions = transactions.map((transaction) => {
            return {...transaction, month: parseInt(transaction.month[1])}
        }).filter((transaction) => transaction.month === currentMonth)

        let monthIncome = totalByTransactionType(monthTransactions, 'income');
        let monthExpense = totalByTransactionType(monthTransactions, 'expense');
        let incomeVsExpense = getMonthIncomeVsExpense(transactions)

        callback({ monthIncome, monthExpense, monthSaving: monthIncome - monthExpense, incomeVsExpense });
    });

    return unsubscribe;
}

function getMonthIncomeVsExpense(transactions: CollectionTransaction[]) {

    return months.map((month, index) => {

        let totalExpense = totalByTransactionType(transactions.filter((transaction) => {
            let monthIndex = index + 1;
            return filterMonth(transaction, monthIndex)
        }), 'expense')

        let totalIncome = totalByTransactionType(transactions.filter((transaction) => {
            let monthIndex = index + 1;
            return filterMonth(transaction, monthIndex)
        }), 'income')

        return {
            month,
            totalExpense,
            totalIncome
        }
    })
}

const filterMonth = (transaction: CollectionTransaction, monthIndex: number) => {
    return parseInt(transaction.month[1]) === (monthIndex);
}

const totalByTransactionType = (transactions: CollectionTransaction[], type: ITransaction['type']) => {
    return transactions
        .filter((transaction) => filterTransactionType(transaction, type))
        .reduce((acc, curr) => acc + parseInt(curr.amount), 0);
}

const filterTransactionType = (transaction: CollectionTransaction, type: ITransaction['type']) => {
    return transaction.type === type
}