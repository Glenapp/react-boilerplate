import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AdminGuard from 'utils/route-guard/AdminGuard';

const SubAdminPage = Loadable(lazy(() => import('views/pages/create-subadmin')));
const SitesPage = Loadable(lazy(() => import('views/pages/sites')));
const QuestionAnswerPage = Loadable(lazy(() => import('views/pages/qa-categories/question')));
const CategoriesPage = Loadable(lazy(() => import('views/pages/qa-categories/categories')));
const RolesPage = Loadable(lazy(() => import('views/pages/roles')));
const AddUserPage = Loadable(lazy(() => import('views/pages/add-user')));
const DeclarationFormPage = Loadable(lazy(() => import('views/pages/declaration-form')));
const TrainingPage = Loadable(lazy(() => import('views/pages/training')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/admin',
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
            path: '/admin/sites',
            element: <SitesPage />
        },
        {
            path: `/admin/qa-categories/question`,
            element: <QuestionAnswerPage />
        },
        {
            path: `/admin/qa-categories/categories`,
            element: <CategoriesPage />
        },
        {
            path: '/admin/roles',
            element: <RolesPage />
        },
        {
            path: '/admin/add-users',
            element: <AddUserPage />
        },
        {
            path: '/admin/declaration-form',
            element: <DeclarationFormPage />
        },
        {
            path: '/admin/training',
            element: <TrainingPage />
        }
    ]
};

export default AdminRoutes;
