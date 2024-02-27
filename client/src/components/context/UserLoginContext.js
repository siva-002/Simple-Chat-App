import { createContext, useState } from "react";
import Apicon from "../Api/Apicon";
import { ToastContainer, Zoom, toast ,Slide} from 'react-toastify';
import Home from "../Home"
import { useNavigate } from "react-router-dom";

const UserLoginContext=createContext({})
    
export const UserLoginDataProvider=()=>{
    const [loginload,setloginload]=useState(false)
    const nav=useNavigate()
    //userdata
    const [user,setuser]=useState({email:"",password:""})
    //formdatachange
    const handleloginchange=(e)=>{       
        setuser({...user,[e.target.name]:e.target.value})        
    }
    //signinloginfunction
    const handleloginSubmit=async(e)=>{
        e.preventDefault()
        setloginload(true)
        const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(user)}
        const res=await Apicon('login',options)
        setloginload(false)
        if(res.status==200){
            toast.success("Logged In",{transition:Zoom})
            sessionStorage.setItem('user_token',res.token)
            sessionStorage.setItem('user_id',res.userid)
            nav('/User')
            
        }else if(res.status==404){
            toast.info("Invalid Email")
        }else if(res.status==401)
            toast.error("Invalid Password")
        else
            toast.error(`Internal Server Error ${res.msg}`)
              
    }
    return (
    <UserLoginContext.Provider value={
        {
            loginload,setloginload,user,handleloginchange,handleloginSubmit
        }
    }>
        <Home/>
    </UserLoginContext.Provider>
    )
}

export default UserLoginContext