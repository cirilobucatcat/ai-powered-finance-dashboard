import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export default PrivateRoute;
