import React, { Dispatch, useReducer } from 'react'
import { createContext } from "react";
import User from '../models/User';
import { UserReducer } from '../reducers/UserReducer';

interface Props{
    children: React.ReactNode
}

interface UserContextType{
    user: null|User
    userDispatch: Dispatch<{type: string, payload: null|User}>
}

export const UserContext = createContext<UserContextType>({
    user: null,
    userDispatch: () => null
})

const initalState: User|null = null

const UserContextProvider: React.FC<Props> = (props) => {
    const [user, userDispatch] = useReducer(UserReducer, initalState)
        
    return (
        <UserContext.Provider value={{user, userDispatch}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
