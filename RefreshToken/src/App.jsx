import { Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'
import Home from './component/Home'
import  AuthProvider  from './context/AuthProvider'
import PrivateRoutes from './privateRoutes/PrivateRoutes'

function App() {
  

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={ <Login/> }/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={ <PrivateRoutes> <Home/> </PrivateRoutes> }/>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
