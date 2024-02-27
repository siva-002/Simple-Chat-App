import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../css/HomeRight.css"
import UserDetailsContext from '../context/UserDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import {encryptdata,decryptdata} from  "./EncryptionandDecryption"
import img from "./image/profile.png"
import { imgpath } from '../Api/Link'
const HomeRight = () => {
   const {rec,handlemsgsend,setsendmsg,chatload,
    sendmsg,getdata, getsentmessage,getreceivedmessages,user_id,
    msgload,message}=useContext(UserDetailsContext)
  
  useEffect(()=>{     
      getdata(user_id)
      getsentmessage()
      getreceivedmessages()

  },[user_id,sendmsg])

  useEffect(()=>{
    if(message.length!=0 && user_id){
      const elem=document.querySelector("#chat-body")
      elem.scrollTop=elem.scrollHeight
    }
    })


  return (
    <div className='chat-panel'>
        {user_id && !chatload?(
          <div className='chat'>
              <div className='chat-header'><div className='icon-body'><img src={rec!=null && rec.profilepic?`${imgpath()}/${rec._id}/${rec.profilepic}`:img}/></div><span >{rec?rec.name:"User"}</span></div> 
              <div className='chat-body' id="chat-body">
              {msgload ?<div className='msgloading'>Loading....</div>:( 
               message.map(item=>(
                  item.type=="sent"?
                 <div className='right' key={item.msgid}><span className='con'><span className='msg'>{decryptdata(item.msg)} </span> <span className='time'>{item.time.substr(11)}</span></span></div> 
                : <div className='left' key={item.msgid}><span className='con'><span className='msg'>{decryptdata(item.msg)} </span> <span className='time'>{item.time.substr(11)}</span></span></div> 
                 ) ))}
               </div>
              <div className='chat-footer'>
                <form onSubmit={handlemsgsend}>
                <input type="text" className='form-control' onChange={(e)=>setsendmsg(e.target.value)} value={sendmsg}/>
                <button type="submit" className='btn btn-success'>Send</button>
                </form>
              </div>
          </div>
        ):(
           <div className='nouserselect'>Select An User to Chat</div> 
        )}
    </div>
  )
}

export default HomeRight 