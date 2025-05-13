import { auth, db } from '@/firebase';
import { ITransaction } from '@/types';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, QueryConstraint, serverTimestamp, Unsubscribe, updateDoc, where } from 'firebase/firestore';

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

    const queryConstraints: QueryConstraint[] = [
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
    ];

    if(options.filter) {
        queryConstraints.push(where('type', '==', options.filter))
    }
    
    const q = query(collection(db, collectionName), ...queryConstraints)

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

        await addDoc(collection(db, collectionName), { 
            userId: user.uid, 
            ...data, 
            category: (data.category as string).toUpperCase(),
            createdAt: serverTimestamp(),
            updatedAt: null
        });

        return { data: null, error: null };

    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error('Firebase error:', error.code, error.message);
        } else {
            console.error('Unknown error:', error);
        }

        return { data: { success: true }, error: error as FirebaseError }
    }

}

export const update = async (transactionId: string, data: any) => {

    const user = auth.currentUser
    if (!user) return { data: null, error: { name: 'user', code: 'test', message: ''} }

    try {

        await updateDoc(doc(db, collectionName, transactionId), { 
            ...data,
            category: (data.category as string).toUpperCase(),
            userId: user.uid, 
            updatedAt: serverTimestamp()
        });

        return { data: null, error: null };

    } catch (error: unknown) {

        if (error instanceof FirebaseError) {
            console.error('Firebase error:', error.code, error.message);
        } else {
            console.error('Unknown error:', error);
        }

        return { data: { success: true }, error: error as FirebaseError }
    }
}

export const deleteTransaction = async (transactionId: string) => {

    const user = auth.currentUser
    if (!user) return { data: null, error: { name: 'user', code: 'test', message: ''} }

    try {

        await deleteDoc(doc(db, collectionName, transactionId));
        return { data: null, error: null };

    } catch (error: unknown) {

        if (error instanceof FirebaseError) {
            console.error('Firebase error:', error.code, error.message);
        } else {
            console.error('Unknown error:', error);
        }

        return { data: { success: true }, error: error as FirebaseError }
    }

}