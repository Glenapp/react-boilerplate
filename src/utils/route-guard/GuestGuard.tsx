import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { GuardProps } from 'types';
import { useEffect } from 'react';
import getRouteForRole from 'utils/route.utils';

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            const route = getRouteForRole(user?.role);
            navigate(route, { replace: true });
        }
    }, [isLoggedIn, navigate, user]);

    return children;
};

export default GuestGuard;
