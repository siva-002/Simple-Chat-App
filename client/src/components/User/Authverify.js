import React from 'react'
import Apicon from '../Api/Apicon'
const Authverify = async(setAuth,setloginload) => {
    const token=sessionStorage.getItem('user_token')
    
    const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"token":token})}     
    const response=await Apicon('User',options)
    if(response.status==200){
        setAuth(true)
    }
    setloginload(false)
}

export default Authverify