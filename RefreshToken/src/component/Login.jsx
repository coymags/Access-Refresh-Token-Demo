import axios from "axios"
import { useState } from "react"
import { FaFacebook, FaGoogle } from "react-icons/fa" 
import { MdEmail } from "react-icons/md"


import { useNavigate } from "react-router-dom"



function Login() {

    const navigate = useNavigate()
    const [ formData, setFormData ] = useState({ username:"", password:""})

    //Hook to toggle border red when its wrong and blue if correct
    const [ userWrong, setUserWrong] = useState(false)
    const [ passwordWrong, setPasswordWrong ] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Server Endpoint here Authentication is a must
        try {
            const response = await axios.post('http://localhost:3000/users/login', formData)
            console.log(response.data.token)
        } catch (error) {
            console.error(error)
            if(error.response.data.message == 'Enter a valid Username'){
                setUserWrong(true)
            }else{
                setUserWrong(false)
            }

            if(error.response.data.message == 'Wrong Password'){
                setPasswordWrong(true)
            }else{
                setPasswordWrong(false)
            }
        }
    }

    
    const goToRegister = () => {
        navigate('/register')
    }
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-300 h-150 rounded-2xl shadow-2xl flex flex-row">
                    <div className="w-150 h-150 rounded-l-2xl bg-gray-300 flex justify-center items-center">
                        <h1>Picture here</h1>
                    </div>
                    <div className="w-150 h-150 rounded-r-2xl bg-white flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center m-5">
                            <h1 className="text-5xl font-bold text-[#00b1ff]">Welcome</h1>
                            <h1 className="font-bold ">This is for JWT Refresh Token</h1>
                        </div>
                        <div className=" flex flex-col justify-center items-center gap-5 w-100">
                            <div className="relative w-90">
                                <input type="text" name='username' placeholder="Username" onChange={handleChange} className={ userWrong ? "peer w-full border border-red-500 rounded-md px-3 pt-5 pb-2 text-lg focus:outline-none focus:border-red-500 focus:placeholder-transparent" :"peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-lg focus:outline-none focus:border-blue-500 focus:placeholder-transparent"}/>
                                <label htmlFor="" className="bg-white absolute left-4 top-0 -translate-y-1/2 peer-placeholder-shown:hidden peer-focus:block">Username</label>
                            </div>
                            <div className="relative w-90 ">
                                <input type="password" name='password' placeholder="Password" onChange={handleChange} className={passwordWrong ? "peer w-full border border-red-500 rounded-md px-3 pt-5 pb-2 text-lg focus:outline-none focus:border-red-500 focus:placeholder-transparent" :"peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-lg focus:outline-none focus:border-blue-500 focus:placeholder-transparent"}/>
                                <label htmlFor="" className="bg-white absolute left-4 top-0 -translate-y-1/2 peer-placeholder-shown:hidden peer-focus:block">Password</label>
                            </div>
                        </div>
                        <div className="w-100 flex justify-end items-center m-3">
                            <h1 onClick={goToRegister} className=" underline">Not a member yet?</h1>
                        </div>
                        <div className="w-100 flex justify-center items-center h-15 mb-4">
                            <button onClick={handleSubmit} className="w-25 h-10 rounded border text-white bg-[#00b1ff] ">Submit</button>
                        </div>
                        <div className="w-90 relative mb-3">
                            <hr />
                            <h1 className="absolute left-30 bg-white pl-2 pr-2 -translate-y-1/2">or continue with</h1>
                        </div>
                        <div className='w-90 gap-5 h-20 flex justify-center items-center'>
                            <FaFacebook size={32} />
                            <FaGoogle size={30}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login