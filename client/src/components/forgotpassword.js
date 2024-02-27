import React, { useState } from 'react'
import Apicon from './Api/Apicon'

import { ToastContainer,toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn } from '@fortawesome/free-solid-svg-icons'
import Stepper from "react-stepper-horizontal"

const Forgotpassword = () => {
    const [resetload,setresetload]=useState(false)
    const [data,setdata]=useState(null)
    const [changeload,setchangeload]=useState(false)

    const [info,setinfo]=useState()
    const [activestep,setactivestep]=useState(null)
    const steps=[
        {title:"Email"},
        {title:"Otp"},
        {title:"Reset Password"},
    ]

    const Resetpassword=()=>{
        const [res,setres]=useState(false)
        const [newpass,setnewpass]=useState({pass:null,confirm:null})
        const handlechange=(e)=>{
            setnewpass({...newpass,[e.target.name]:e.target.value})
        }
        const handlechangesubmit=async(e)=>{          
            e.preventDefault()    
                setchangeload(true)
                const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"id":data.id,"password":newpass.pass})}
                const res=await Apicon("/resetpassword",options)
                toast.info(res.msg)
                setactivestep(2)      
                setinfo(<Link to="/"> Sign in <FontAwesomeIcon icon={faSignIn}/> </Link>)          
              setchangeload(false)           
        }
        return(
            <form onSubmit={handlechangesubmit}>
            <h2>Password Recovery</h2>
           <input value={newpass.pass} type='password' placeholder='Enter new password' className='form-control' required onChange={handlechange} name="pass" autoFocus/>
           <div className='pass-input'>  <input value={newpass.confirm} type='password' placeholder='Reenter new password' className='form-control' required onChange={handlechange} name="confirm" />
           <div className='info'>{newpass.pass!==newpass.confirm && newpass.confirm!==null?<span className='error'>Passwords Mismatch</span>:""}</div>
           </div>
           <button type="submit" className='btn btn-success' disabled={newpass.pass===newpass.confirm && newpass.pass!==null?false:true}>         
           {(changeload)?( <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ):""}Reset
           </button>
            <div className='info'>{info}</div>
             </form>
        )
    }

    const Emailinput=()=>{
        const [email,setemail]=useState(null)
        const handleforgotsubmit=async(e)=>{
            e.preventDefault()
            setresetload(true)
            const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"email":email})}
           const res=await Apicon("/forgotpassword",options)          
           toast.info(res.msg)
           setdata(res.data)
            if(res.status==200){
                setactivestep(0)
            }        
           setresetload(false)
        
        }
        return(
            <form onSubmit={handleforgotsubmit}>
            <h2>Password Recovery</h2>
           <input type='text' placeholder='Enter Email' className='form-control' value={email} required onChange={(e)=>setemail(e.target.value)} autoFocus/>
           <button type="submit" className='btn btn-danger'>
           {(resetload)?( <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ):"Submit"}
           </button>
       </form>
        )
    }
    const Otpenter=()=>{
        const [otp,setotp]=useState("")
        const handleotpsubmit=(e)=>{
            e.preventDefault()    
            if(otp==data.otp)
            {
                toast.success("Otp Verified")
                setactivestep(1)
                
            }else{
                toast.warning("Invalid Otp")
            }          
        }
        return(
        <form onSubmit={handleotpsubmit}>
        <h2>Password Recovery</h2>
       <input  value={otp} type='text' placeholder='Enter otp' className='form-control' required onChange={(e)=>setotp(e.target.value)} autoFocus/>
       <button type="submit" className='btn btn-danger' disabled={otp.length!=5?true:false}>
            Verify
       </button>
         </form>
        )
    }

    const Loadform=(activestep)=>{
        switch(activestep){
            case 0:
                return <Otpenter/>
            case 1:
            case 2:
                return <Resetpassword/> 
            default:
                return<Emailinput />              
        }
    }
  return (
    <div className='forgot-password'>
        <ToastContainer/>
        <div className='stepper'>
        <Stepper steps={steps}   activeStep={activestep}/>
        </div>

           {Loadform(activestep)}   
    </div>
  )
}

export default Forgotpassword