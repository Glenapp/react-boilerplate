import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Settings from 'views/settings';
import Users from 'views/users';
import Roles from 'views/roles';

// Routes
const Budgets = Loadable(lazy(() => import('views/budgets')));
const Reports = Loadable(lazy(() => import('views/reports')));
const AddBudget = Loadable(lazy(() => import('views/addBudget')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/budgets',
            element: <Budgets />
        },
        {
            path: '/reports/:type',
            element: <Reports />
        },
        {
            path: '/add-budget',
            element: <AddBudget />
        },
        {
            path: '/update-budget/:id',
            element: <AddBudget />
        },
        {
            path: '/settings',
            element: <Settings />
        },
        {
            path: '/roles',
            element: <Roles />
        },
        {
            path: '/users',
            element: <Users />
        }
    ]
};

export default MainRoutes;
