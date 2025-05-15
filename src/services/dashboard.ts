import { auth, db } from "@/firebase";
import { DashboardCountData } from "@/types";
import { collection, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";

const collectionName = 'transactions';

export const listen = (callback: (data: DashboardCountData) => DashboardCountData): Unsubscribe => {
    const user = auth.currentUser

    if(!user) return () => {};

    const q = query(collection(db, collectionName), where('userId', '==', user.uid))
    const currentMonth = new Date().getMonth() + 1;
    const unsubscribe = onSnapshot(q, (snapshot) => {

        const transactions = snapshot.docs.map(doc => {
            let month = doc.data().transactionAt ? doc.data().transactionAt.split('-') : [];
            return { 
                type: doc.data().type, 
                amount: doc.data().amount,
                month: parseInt(month[1]) 
            };
        }).filter((transaction) => transaction.month === currentMonth);

        let monthIncome = transactions.filter((transaction) =>  transaction.type === 'income').reduce((acc, curr) => acc + parseInt(curr.amount), 0);
        let monthExpense = transactions.filter((transaction) =>  transaction.type === 'expense').reduce((acc, curr) => acc + parseInt(curr.amount), 0);

        callback({ monthIncome, monthExpense, monthSaving: monthIncome - monthExpense});
        
    });

    return unsubscribe;
}
