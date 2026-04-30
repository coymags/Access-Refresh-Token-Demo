import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'



function Register() {

    // Navigate to Login
    const navigate = useNavigate()
    const goToLogin = () => {
        navigate('/')
    }

    const [regFormData, setRegFormData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setRegFormData(prev => ({...prev, [name]:value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:3000/users/register', regFormData)
            console.log(response.status)

            if(response.status == 201){
                alert('Registered Succesfully')
                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <>
            <div className="w-full h-screen flex justify-center items-center ">
                <div className="w-300 h-150 rounded-2xl shadow-2xl flex flex-row">
                    <div className="w-150 h-150 rounded-l-2xl bg-gray-300">
                        <h1>Picture here</h1>
                    </div>
                    <div className="w-150 h-150 rounded-r-2xl bg-white flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center m-5 gap-1">
                            <h1 className="text-5xl font-bold text-[#00b1ff]">Register</h1>
                            <h1 className="font-bold ">This is for JWT Refresh Token</h1>
                        </div>
                        <div className=" flex flex-col justify-center items-center gap-5 w-100">
                            <div className="relative w-90">
                                <input type="text" name='username' onChange={handleChange} placeholder="username" className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-lg focus:outline-none focus:border-blue-500 focus:placeholder-transparent"/>
                                <label htmlFor="" className="bg-white absolute left-4 top-0 -translate-y-1/2 peer-placeholder-shown:hidden peer-focus:block">Username</label>
                            </div>
                            <div className="relative w-90 ">
                                <input type="password" name='password' onChange={handleChange} placeholder="Password" className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-lg focus:outline-none focus:border-blue-500 focus:placeholder-transparent"/>
                                <label htmlFor="" className="bg-white absolute left-4 top-0 -translate-y-1/2 peer-placeholder-shown:hidden peer-focus:block">Password</label>
                            </div>
                            <div className="w-100 flex justify-end items-center m-3">
                                <h1 onClick={goToLogin} className=" underline">Already have an account?</h1>
                            </div>
                            <div className="w-100 flex justify-center items-center h-15 mb-4">
                                <button onClick={handleSubmit} className="w-25 h-10 rounded border text-white bg-[#00b1ff] ">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register