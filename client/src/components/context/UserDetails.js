import { createContext,useState ,useEffect} from "react";
import Homepage from "../User/Homepage";
import HomeRight from "../User/HomeRight";
import { useNavigate, useParams } from "react-router-dom";
import Apicon from "../Api/Apicon";

import Authverify from "../User/Authverify";
const UserDetailsContext=createContext({})

export const UserDetailsProvider=()=>{
    
    const [user,setuser]=useState([])
    const [data,setdata]=useState({})
    const [rec,setrec]=useState()
    const [userid,setuserid]=useState()
    const [sendmsg,setsendmsg]=useState('')
    const [sentmsg,setsentmsg]=useState([])
    const [recmsg,setrecmsg]=useState([])
    const [chatload,setchatload]=useState(true)
    const {user_id}=useParams()
    const [msgload,setmsgload]=useState(true)
    const [message,setmessage]=useState()
    const users=[]
    const [sorted,setsorted]=useState([])
    const [userloading,setuserloading]=useState(true)
    const [updatedata,setupdatedata]=useState({name:""})
    const [updateload,setupdateload]=useState(false)
    const [upstatus,setupstatus]=useState(false)
    const [imgfile,setimgfile]=useState()
    const [error,seterror]=useState("")
    const [newmsgs,setnewmsgs]=useState("")
const usenav=useNavigate()
    const [uploadfile,setuploadfile]=useState()
    const getuserdetails=async(id)=>{     
        const options=id?{
            method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"user_id":id})
        }:{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify()}
        const res=id?await Apicon('getuser',options):await Apicon('getusers',options)
        return res
    }
   useEffect(()=>{
         const id=sessionStorage.getItem('user_id')
        const getuserdata=async()=>{ 
        const res=await getuserdetails(id)
        setdata(res.data) 
        setupdatedata(res.data)
        }
        const getalldata=async()=>{ 
        const res=await getuserdetails()
        setuser(res.data)
        setchatload(false)
        }
        getuserdata()
        getalldata()

    
   },[upstatus])
    //Authentication Checking for logined user
    const [Auth,setAuth]=useState(false)
    const [loginload,setloginload]=useState(true)
    const authfunction=async()=>{
  
     await Authverify(setAuth,setloginload)
   }

   //chat-panel
 
    const getdata=async(userid)=>{ 
        const response=await getuserdetails(userid)
        setrec(response.data)              
   }
       
   const handlemsgsend=async(e)=>{
    e.preventDefault()
    const msgdata={senderid:data._id,receiverid:rec._id,message:sendmsg}
    const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(msgdata)}
    const response=await Apicon("sendmessage",options)
    setsendmsg('')    
   }

   const logout=()=>{
    sessionStorage.removeItem('user_token')
    setdata({})
    setuser([])
    usenav("/")
   }
   const getsentmessage=async()=>{
    const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"id":data._id})}
    const response=await Apicon("getsentmessage",options)
    setsentmsg(response.data)
    }

    const newmessages=async()=>{
      const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"id":data._id})}
      const response=await Apicon("getnewmessages",options)
      setnewmsgs(response.data)
 
    }
    
    const getreceivedmessages=async()=>{
        const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"id":data._id})}
        const response=await Apicon("getreceivedmessage",options)

        setrecmsg(response.data)
    }
    
    //Storing  sent and received messages 
    const storingmessage=(sender,receiver)=>{
        const newmessages=[]
        sentmsg.map((ele)=>{
            ele.messages.filter((ele)=>ele.receiverid==receiver).map(ele=>{
                ele.data.map(ele=>(               
                  newmessages.push({...ele,type:"sent",Date:new Date(ele.time)})
                ))
              })
            }) 
            recmsg.filter(ele=>ele._id==receiver).map(ele=>(
              ele.messages.filter((ele)=>ele.receiverid==sender).map(ele=>{
                ele.data.map(ele=>(
                  newmessages.push({...ele,type:"received",Date:new Date(ele.time)})
                ))
              })
            ))
            const sorted= [...newmessages].sort((a,b)=>a.Date-b.Date)
            return sorted
    }
    useEffect(()=>{    
        const res=storingmessage(data._id,user_id)        
        setmessage(res)
        setmsgload(false)   
  },[sentmsg,user_id,sendmsg,recmsg])

   //getlast message and time for sorting
    const getsortedlist=()=>{
    user.map((ele)=>{        
      const out=storingmessage(data._id,ele._id)
      const last=out[out.length-1]
      if(last){
        users.push( {...ele,lastmsg:last.msg,time:new Date(last.time),type:last.type})
      }
      })
      users.sort((a,b)=>b.time-a.time)  
      setsorted(users)
       setuserloading(false)   
    }
    useEffect(()=>{   
      const start=async()=>{  
      await getsentmessage()
      await getreceivedmessages()
      await getsortedlist()
      await newmessages()
      }
      start()
    },[rec,user,data])
    const handleformupdate=async()=>{    
       setupdateload(true)  
       const formdata=new FormData()
       formdata.append('file',uploadfile)
       for(const key in updatedata){  
        formdata.append(key,updatedata[key])
       } 
      const options={method:"POST",body:formdata}
       const response=await Apicon("updateuser",options)
      setupdateload(false)
      setupstatus(!upstatus)
     return response
    }

    const fileupload=(e)=>{
        const file=e.target.files[0]
      if(file.type.startsWith("image/")){
        seterror("")
        const reader=new FileReader()
        reader.onload=()=>{
          setimgfile(reader.result)
        }
        reader.readAsDataURL(file)
        setuploadfile(file)
      }else{
        seterror("image files only supported")
      }
    }

    useEffect(()=>{
      const removenewcount=async()=>{
      const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"sendid":user_id,"recid":data._id})}
      const response=await Apicon("removenewmsgcount",options)
   
      }
      removenewcount()
    },[user_id])
  
    
    return(
        <UserDetailsContext.Provider value={{
                user,Auth,loginload,authfunction,data,rec,setuserid,handlemsgsend,sendmsg,setsendmsg,chatload,getdata
        ,sentmsg,getreceivedmessages,recmsg
        ,getsentmessage,data,user_id,
        msgload,message,storingmessage,sorted,userloading,setupdatedata,updatedata,handleformupdate,updateload
        ,fileupload,imgfile,error,newmsgs,logout
        }}>
                <Homepage/>
        </UserDetailsContext.Provider>
    )
}
export default UserDetailsContext