import React from 'react'
import Home from './components/Home'
import Register from './components/Register'
import Homepage from './components/User/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import { Routes, Route } from 'react-router-dom'
import { UserLoginDataProvider } from './components/context/UserLoginContext'
import { UserRegisterDataProvider } from './components/context/UserRegisterContext'
import { UserDetailsProvider } from './components/context/UserDetails'
import Forgotpassword from './components/forgotpassword'
const App = () => {
  return (
    <div>
       
        <Routes>
            <Route path="/" element={<UserLoginDataProvider><Home/></UserLoginDataProvider>}></Route>
            <Route path="/Register" element={<UserRegisterDataProvider><Register/></UserRegisterDataProvider>}></Route>
            <Route path="/forgotpassword" element={<Forgotpassword/>}></Route>
            <Route path="/User">
                <Route index element={<UserDetailsProvider><Homepage/></UserDetailsProvider>} />
                <Route path=":user_id" element={<UserDetailsProvider><Homepage/></UserDetailsProvider>} />
            </Route>
        </Routes>
  
       
    </div>
  )
}

export default App