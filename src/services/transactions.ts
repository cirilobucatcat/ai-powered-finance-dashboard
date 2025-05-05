import { auth, db } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const collectionName = 'transactions';

type ResponseType = {
    data: any | null,
    error: Error | null
}

export const getAll = async () => {
    const user = auth.currentUser
    if (user) {
        const uid = user.uid;

        try {

            const collectionRef = collection(db, collectionName);
            const q = query(collectionRef, where('userId', '==', uid))
            const querySnapshot = await getDocs(q)

            return querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
        } catch (err) {
            return []
        }
    }

}

export const save = async (data: any): Promise<ResponseType> => {
    const user = auth.currentUser
    if (user) {
        const uid = user.uid;
        try {

            await addDoc(collection(db, collectionName), { userId: uid, ...data, createdAt: new Date() });
            return { data: null, error: null };

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error("Firebase error:", error.code, error.message);
            } else {
                console.error("Unknown error:", error);
            }
            return { data: { success: true }, error: null }
        }
    }

    return { data: null, error: { name: 'user-not-found', message: 'User not found. ' } }
}