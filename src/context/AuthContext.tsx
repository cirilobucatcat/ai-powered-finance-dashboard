import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/firebase';
import Loading from '@/components/Loading';

interface AuthContextType {
    user: FirebaseUser | null;
    login: (userData: FirebaseUser) => void;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [initializing, setInitializing] = useState(true)
    const login = (userData: FirebaseUser) => setUser(userData)
    const logout = () => signOut(auth).then(() =>  setUser(null));

    const handleOnAuthStateChanged = (user: FirebaseUser | null) => {
        
        if (!user) {
            setUser(null)
            setInitializing(false)
            return
        }

        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleOnAuthStateChanged);
        return () => unsubscribe();
    }, []);

    if(initializing) {
        return (<Loading />)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
