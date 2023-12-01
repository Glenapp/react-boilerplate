import { useContext } from 'react';
import { AppContext } from 'contexts/AppContext';

export const UseApp = () => {
    const appContext = useContext(AppContext);

    if (!appContext) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return appContext;
};
