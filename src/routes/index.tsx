import { useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    let location = useLocation();
    // useEffect(() => {
    //     console.log({ location });
    // }, [location]);
    return useRoutes([LoginRoutes, AuthenticationRoutes, AdminRoutes]);
}
