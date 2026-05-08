import { useState, useEffect } from "react"
import { AuthContext } from "./authContext"
import axios from "axios"

function AuthProvider({children}) {

    const [ accessToken, setAccessToken ] = useState(null)
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {

        const refresh = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/refresh',{ withCredentials: true })

                setAccessToken(response.data.accessToken)
                setIsLoggedIn(true)
                console.log("This is from AuthProvider AccessToken:", response.data.accessToken)
            } catch (error) {
                console.log(error)
                setIsLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }

        refresh()
    },[])

    return(
        <AuthContext.Provider value={{ accessToken, setAccessToken, isLoggedIn, setIsLoggedIn, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider