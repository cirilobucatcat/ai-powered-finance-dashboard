import { auth, db } from "@/firebase";
import { ITransaction } from "@/types";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, onSnapshot, orderBy, query, QueryConstraint, Unsubscribe, where } from "firebase/firestore";

const collectionName = 'transactions';

type ResponseType = {
    data: any | null,
    error: FirebaseError | null
}

interface ListenOptions {
    searchTerm?: string;
    filter?: string
}

export const listen = (callback: (transction: ITransaction[]) => void, options: ListenOptions = {}): Unsubscribe => {
    const user = auth.currentUser

    if (!user) return () => { };

    let queryConstraints: QueryConstraint[] = [
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
    ];

    if(options.filter) {
        queryConstraints.push(where('type', '==', options.filter))
    }
    
    let q = query(collection(db, collectionName), ...queryConstraints)

    const unsubscribe = onSnapshot(q, (snapshot) => {

        const transactions = snapshot.docs.map(doc => {
            const data = doc.data() as Omit<ITransaction, 'id'>;
            return { id: doc.id, ...data };
        });

        if (options.searchTerm) {
            const term = options.searchTerm.toLowerCase();
            callback(transactions.filter(tx =>
                tx.transaction.toLowerCase().includes(term) ||
                String(tx.amount).includes(term)
            ));
        } else {
            callback(transactions);
        }
    });

    return unsubscribe;
}

export const save = async (data: any): Promise<ResponseType> => {

    const user = auth.currentUser
    if (!user) return { data: null, error: { name: 'user', code: 'test', message: ''} }

    try {

        await addDoc(collection(db, collectionName), { userId: user.uid, ...data, createdAt: new Date() });
        return { data: null, error: null };

    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("Firebase error:", error.code, error.message);
        } else {
            console.error("Unknown error:", error);
        }

        return { data: { success: true }, error: error as FirebaseError }
    }

}