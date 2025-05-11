import { auth, db } from "@/firebase";
import { DashboardCountData } from "@/types";
import { collection, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";

export const listen = (callback: (data: DashboardCountData) => DashboardCountData): Unsubscribe => {
    const user = auth.currentUser

    if(!user) return () => {};

    const q = query(collection(db, 'transactions'), where('userId', '==', user.uid))

    const unsubscribe = onSnapshot(q, (snapshot) => {

        const transactions = snapshot.docs.map(doc => {
            return { type: doc.data().type, amount: doc.data().amount };
        });

        let income = transactions.filter((transaction) =>  transaction.type === 'income').reduce((acc, curr) => acc + parseInt(curr.amount), 0);
        let expense = transactions.filter((transaction) =>  transaction.type === 'expense').reduce((acc, curr) => acc + parseInt(curr.amount), 0);

        callback({ income, expense, saving: income - expense});
        
    });

    return unsubscribe;
}
