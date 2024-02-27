import React, { useContext, useEffect, useState } from 'react'
import "./css/Home.css"
import { Link } from 'react-router-dom'
import UserRegisterContext from './context/UserRegisterContext'
import { ToastContainer ,Zoom} from 'react-toastify'
const Register = () => {
    const {newuser,setnewuser,regload,setregload,handlechange,handleSubmit}=useContext(UserRegisterContext)
  return (
    <div className='signuppage'>
        <div className='signupform-container'>
        
        <form className='signupform' onSubmit={handleSubmit}>
            
            <div className='inp'>
                <label>Name</label>
                <input type='text' required className='form-control' onChange={handlechange} name="username"  />
            </div>
            <div className='inp'>
                <label>Email</label>
                <input type='email' required className='form-control' onChange={handlechange} name="email" />
            </div>
            <div className='inp'>
                <label>Password</label>
                <input type='password' required  className='form-control' onChange={handlechange} name="password" />
            </div>
            <div className='inp'>
                 <button type='submit' value="Login" className='btn btn-primary'>
                {(regload)?(<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ):""}  <span> Register</span>
                </button>
                <input type='reset' value="Reset" className='btn btn-danger'/>
            </div>
      
            <div className='inp'>
                <span>Already have an account ? <Link to="/">Signin</Link> </span>
            </div>
        </form>
        <ToastContainer  position="top-center" className="toast-notification" transition={Zoom} />
        </div>
    </div>
  )
}

export default Register