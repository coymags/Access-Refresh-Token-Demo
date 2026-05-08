import { useContext } from "react"
import { AuthContext } from "../context/authContext" 
import { useNavigate } from "react-router-dom"



function Home() {

    const navigate = useNavigate()

    const { accessToken } = useContext(AuthContext)
    
    function handleOnClick() {
        navigate('/')
    }
    return(
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center bg-amber-200">
                <h1>Login Successful</h1>
                <div className="border">
                    <button onClick={handleOnClick}>Log-out</button>
                </div>
            </div>
        </>
    )
}
export default Home