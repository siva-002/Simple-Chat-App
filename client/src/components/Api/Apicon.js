import React from 'react'
import {Link} from './Link'
const Apicon = async(opr,data) => {
    try{
    
    const apilink=`${Link()}${opr}`
    const response=await fetch(apilink,data)
    const res=await response.json()
    return res
    }catch(err){
        return err.message
    }

}

export default Apicon