import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AdminGuard from 'utils/route-guard/AdminGuard';

const SubAdminPage = Loadable(lazy(() => import('views/pages/create-subadmin')));
const SitesRolesPage = Loadable(lazy(() => import('views/pages/sites-roles')));
const QuestionAnswerPage = Loadable(lazy(() => import('views/pages/qa-categories')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/',
    element: (
        <AdminGuard>
            <MainLayout />
        </AdminGuard>
    ),
    children: [
        {
            path: '/admin/create-subadmin',
            element: <SubAdminPage />
        },
        {
            path: '/admin/sites-roles',
            element: <SitesRolesPage />
        },
        {
            path: `/admin/qa-categories`,
            element: <QuestionAnswerPage />
        }
    ]
};

export default AdminRoutes;
