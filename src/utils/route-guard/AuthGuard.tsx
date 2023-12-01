import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { GuardProps } from 'types';
import React from 'react';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
    const { isLoggedIn, permissions, checkPermission } = useAuth();
    console.log(React.Children.toArray(children));

    const navigate = useNavigate();
    const location = useLocation();
    const routePermission: any = {
        budgets: 'view_budget',
        'add-budget': 'add_budget',
        'update-budget': 'update_budget',
        reports: 'view_report',
        roles: 'view_role',
        users: 'view_user',
        settings: 'view_settings'
    };
    const pathSegments = location.pathname.split('/');
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('login', { replace: true });
        }
        if (permissions?.length) {
            console.log(location);
            if (checkPermission(routePermission[pathSegments[1]])) {
                return;
            } else {
                navigate('budgets', { replace: true });
            }
        }
    }, [isLoggedIn, navigate, location, permissions, checkPermission]);

    return children;
};

export default AuthGuard;
