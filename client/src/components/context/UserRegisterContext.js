import { createContext ,useState } from "react";
import Register from "../Register";
import Apicon from "../Api/Apicon";
import { toast ,Zoom} from "react-toastify";

const UserRegisterContext=createContext({})


export const UserRegisterDataProvider=()=>{
    const [newuser,setnewuser]=useState({username:"",email:"",password:""})
    const [regload,setregload]=useState(false)
    const handlechange=(e)=>{
            setnewuser({...newuser,[e.target.name]:e.target.value})
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setregload(true)
        const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(newuser)}
        const res=await Apicon('register',options)
        console.log(res)
        setregload(false)
        if(res.status==201){
            toast.success("Registration Success",{transition:Zoom})
          
        }else if(res.status==200){
            toast.info(`Email Already Registered`)
           
        }else{
            toast.error(`Registration Failed ${res.message}`)
        }
    }
    return(
        <UserRegisterContext.Provider value={{
            newuser,setnewuser,regload,setregload,handlechange,handleSubmit
        }}>
            <Register/>
        </UserRegisterContext.Provider>
    )
}

export default UserRegisterContext