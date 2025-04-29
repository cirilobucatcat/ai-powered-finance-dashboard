import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {

    const { user } = useAuth();
    return user ? <>{children}</> : <Navigate to="/" replace />;
}

export default PrivateRoute;
