import { useState } from "react"
import { AuthContext } from "./authContext"

function AuthProvider({children}) {

    const [ accessToken, setAccessToken ] = useState(null)

    return(
        <AuthContext.Provider value={{ accessToken, setAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider