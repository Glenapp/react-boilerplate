import { ReactNode, createContext, useState } from 'react';
import { InputFieldDetails } from 'types/input-field';
import { UserDetails } from 'types/users';

interface AppContextType {
    app: {
        popupMessage: {
            message: string;
            type: string;
            show: boolean;
        };
        inputFieldList: any;
        memberList: UserDetails[];
        projectList: any;
        selectedBudgetType: number;
    };
    setApp: React.Dispatch<React.SetStateAction<typeof initials.app>>;
}

const initials = {
    app: {
        popupMessage: {
            message: '',
            type: 'success',
            show: false
        },
        inputFieldList: [] as InputFieldDetails[],
        memberList: [] as UserDetails[],
        projectList: [],
        selectedBudgetType: 1
    }
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [app, setApp] = useState({ ...initials.app });

    return <AppContext.Provider value={{ app, setApp }}>{children}</AppContext.Provider>;
};
