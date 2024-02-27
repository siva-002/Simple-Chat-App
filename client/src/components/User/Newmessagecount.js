import React, { useEffect, useState } from 'react'


const Newmessagecount = (id,newmsgs) => {
        // console.log(newmsgs)
        let count=0
    
       const match= newmsgs.newmessages.find(el=>el.sender_id==id )
       if(match){
        count=match.count
       }
   
    return (
        <>
        {count?<span className='new-msg-count'>{count}</span>:""}
        </>
    )

}

export default Newmessagecount