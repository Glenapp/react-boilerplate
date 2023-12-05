const getRouteForRole = (role: string | undefined) => {
    switch (role) {
        case 'admin':
            return '/admin';
        case 'hr':
            return '/add-sites-roles';
        case 'manager':
            return '/add-users';
        // Add more cases for other roles as needed
        default:
            // Default route or handle unknown roles
            return '/';
    }
};

export default getRouteForRole;
