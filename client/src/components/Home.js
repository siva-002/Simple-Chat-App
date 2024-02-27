import {React, useContext, useEffect, useState} from 'react'
import { ToastContainer, Zoom, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/Home.css"
import { Link } from 'react-router-dom'

import UserLoginContext from "./context/UserLoginContext"

const Home = () => {
    const {loginload,setloginload,user,handleloginchange,handleloginSubmit}=useContext(UserLoginContext)
  
    return (
      
    <div className='signinpage'>

        <div className='signinform-container'>          
        
        <form className='signinform' onSubmit={handleloginSubmit}>
            
            <div className='inp'>
                <label>Email</label>
                <input type='email' required className='form-control' onChange={handleloginchange} name="email"/>
            </div>
            <div className='inp'>
                <label>Password</label>
                <input type='password' required  className='form-control' onChange={handleloginchange} name="password" />
            </div>
            <div className='inp'>
                <span><Link to="/forgotpassword">Forgot Password? </Link> </span>
            </div>
            <div className='inp'>
                <button type='submit' value="Login" className='btn btn-success'>
                {(loginload)?( <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                 ):""}<span> Login</span>
                </button>
                <input type='reset' value="Reset" className='btn btn-danger'/>
            </div>
      
            <div className='inp'>
                <span>Don't have an account ? <Link to="/Register">Signup</Link> </span>
            </div>
           
        </form>
        <ToastContainer position="top-center" className="toast-notification" transition={Zoom}/>
    </div>
    </div>

  )
}

export default Home