// import necessary libraries
import React, { createContext, useEffect, useReducer } from 'react';
import { jwtDecode } from 'jwt-decode';

// action - state management
import { LOGIN, LOGOUT, PERMISSIONS } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import { AuthContextType, InitialLoginContextProps } from 'types/auth';

// const
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    permissions: []
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        // Check if the user has a valid JWT token in local storage
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                dispatch({ type: LOGOUT });
            } else {
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user: {
                            id: decodedToken.id,
                            email: decodedToken.email,
                            name: decodedToken.name,
                            roleId: decodedToken.roleId
                        }
                    }
                });
            }
        } else {
            dispatch({ type: LOGOUT });
        }
    }, []);

    const setPermissions = (permissions: any) => {
        dispatch({
            type: PERMISSIONS,
            payload: {
                ...state,
                permissions: permissions
            }
        });
    };

    const checkPermission = (permission: string) => {
        if (state?.permissions?.filter((item: any) => item.name === permission && item.status)?.length) {
            return true;
        } else {
            return false;
        }
    };

    const jwtEmailPasswordSignIn = async (email: string, password: string) => {
        try {
            // const response = await fetch('your-authentication-endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ email, password })
            // });

            // if (response.ok) {
            // const { token } = await response.json();
            const token =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6InN0dWFydC5zaW5naEB1bmlsZXZlci5jb20iLCJmaXJzdG5hbWUiOiJTdHVhcnQiLCJsYXN0bmFtZSI6IlNpbmdoIiwidXNlcklkIjoyLCJyb2xlSWQiOjF9.FJpBoYc3nisX79f289XpfIcJ1zDl4XRn_rDlr842btg';
            localStorage.setItem('jwtToken', token);
            const decodedToken: any = jwtDecode(token);

            console.log({ decodedToken });

            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: {
                        id: decodedToken.id,
                        email: decodedToken.email,
                        name: decodedToken.firstname + ' ' + decodedToken.lastname,
                        roleId: decodedToken.roleId
                    }
                }
            });
            // } else {
            //     // Handle authentication error
            //     console.error('Authentication failed');
            // }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        dispatch({ type: LOGOUT });
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                jwtEmailPasswordSignIn,
                setPermissions,
                checkPermission,
                login: () => {},
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
