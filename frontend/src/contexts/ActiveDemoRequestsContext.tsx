import React, { Dispatch, createContext, useEffect, useReducer } from 'react';
import { ActiveDemoRequestsReducer } from '../reducers/ActiveDemoRequestsReducer';

interface Props {
    children: React.ReactNode;
}

interface ActiveDemoRequestsContextType {
    activeDemoRequests: number;
    activeDemoRequestsDispatch: Dispatch<{ type: string; payload: number }>;
}

export const ActiveDemoRequestsContext = createContext<ActiveDemoRequestsContextType>({
    activeDemoRequests: 0,
    activeDemoRequestsDispatch: () => null
});

const initialState: number = 0;

const ActiveDemoRequestsContextProvider: React.FC<Props> = ({ children }) => {
    const [activeDemoRequests, activeDemoRequestsDispatch] = useReducer(
        ActiveDemoRequestsReducer, 
        initialState,
        () => {
            const savedRequests = localStorage.getItem('activeDemoRequests');
            return savedRequests ? JSON.parse(savedRequests) : initialState;
        }
    );

    useEffect(() => {
        localStorage.setItem('activeDemoRequests', JSON.stringify(activeDemoRequests));
    }, [activeDemoRequests]);

    return (
        <ActiveDemoRequestsContext.Provider value={{ activeDemoRequests, activeDemoRequestsDispatch }}>
            {children}
        </ActiveDemoRequestsContext.Provider>
    );
};

export default ActiveDemoRequestsContextProvider;
