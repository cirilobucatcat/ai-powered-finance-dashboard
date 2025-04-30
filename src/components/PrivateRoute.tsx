import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';

interface PrivateRouteProps {
    children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {

    const { user } = useAuth();
    return user ? <>
        <div className='flex w-full bg-slate-950'>
            <Sidebar />
            <div className='w-full h-screen overflow-y-auto'>
                {children}
            </div>
        </div>
    </> : <Navigate to="/" replace />;
}

export default PrivateRoute;
