import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { GuardProps } from 'types';
import getRouteForRole from 'utils/route.utils';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AdminGuard = ({ children }: GuardProps) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/admin') {
            navigate('/admin/create-subadmin', { replace: true });
            return;
        }
        if (!isLoggedIn) {
            navigate('/login', { replace: true });
        } else if (user && user?.role !== 'admin') {
            const route = getRouteForRole(user?.role);
            navigate(route);
        }
    }, [isLoggedIn, user, navigate, location]);

    return children;
};

export default AdminGuard;
