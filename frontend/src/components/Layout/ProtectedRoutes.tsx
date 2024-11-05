import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import Navbar from '../Navbar'

const ProtectedRoutes: React.FC = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) {
            navigate('/')
        }
    }, [navigate, user])

    return(
        user && 
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default ProtectedRoutes
