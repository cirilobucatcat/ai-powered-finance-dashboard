import { firebaseErrors } from '@/utils/constants';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';

export function useError() {

    const displayMessage = (error: FirebaseError) => {
        toast.error(firebaseErrors[error.code]);
    }

    return { displayMessage };
}
