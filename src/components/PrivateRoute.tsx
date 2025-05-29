import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from './Profile';

interface PrivateRouteProps {
    children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {

    const { user } = useAuth();
    return user ? <>
        <div className='flex w-full bg-slate-950'>
            <Sidebar />
            <div className='w-full relative h-screen overflow-y-auto custom-scrollbar'>
                <Profile />
                {children}
            </div>
        </div>
    </> : <Navigate to="/" replace />;
}

export default PrivateRoute;
