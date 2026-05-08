import React from 'react'
import { useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'


function PrivateRoutes({children}) {

    const navigate = useNavigate()
    
    // Check local storage for any token
    const { accessToken, isLoggedIn, loading } = useContext(AuthContext) 


    if(loading){
        return <div>Loading...</div>
    }
        
    if(!isLoggedIn){
        // Token is not in accessToken
            return <Navigate to='/' replace/>
    }

    // If client successfully log
    return children
}


export default PrivateRoutes