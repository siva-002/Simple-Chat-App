import { faCamera, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { ToastContainer,Zoom,toast } from 'react-toastify'
import { imgpath } from '../Api/Link'
const Profile = ({data,img,setupdatedata,updatedata,handleformupdate,updateload,
  fileupload,imgfile,error,handlefileupload}) => {

    const [path,setpath]=useState()
   useEffect(()=>{
    setpath(`${imgpath()}/${data._id}/${data.profilepic}`)
   },[data])
 const handleupdatechange=(e)=>{
  setupdatedata({...updatedata,[e.target.name]:e.target.value})
 }
 const handleupdatesubmit=async(e)=>{
  e.preventDefault()
  const res=await handleformupdate()
  if(res.status==201){
    toast.success("Updated Successfully")
  }else if(res.status==200){
    toast.info(`${res.msg}`,{transition:Zoom })
  }else{
    toast.error("Try again later")
  }
 }
  return (
    <div className='profile'>
        <div className='form-con'>
        <ToastContainer className="toast-con" transition={Zoom } />
       <form  encType='multipart/form-data' onSubmit={handleupdatesubmit}>
          <div className='img-con'>
          <img src={imgfile!=null?imgfile:String(path).includes("undefined")?img:path}/>
          <label htmlFor='file-upload'><FontAwesomeIcon icon={faCamera} /></label>
          <input type="file" onChange={fileupload} className='file-upload' id="file-upload" accept='image/*' name="image_upload"/>
          </div>  
         <div className='error'>{error}</div>
        <input required type="text" className='form-control' name="name" onChange={handleupdatechange} value={updatedata.name} title="Username"/>
        <input required type="email"  className='form-control' name="email" onChange={handleupdatechange}  value={updatedata.email} title="Email"/>
        <input required type="date"  className='form-control' name="dob" onChange={handleupdatechange}  value={updatedata.dob} placeholder='Date Of Birth' title="Date Of Birth"/>
        <input required type="number"  className='form-control' name="mobile" onChange={handleupdatechange}  value={updatedata.mobile} placeholder='Phone no' title='Mobile Number' />
        <button required type='submit' className='btn btn-warning'>
        {(updateload)?(<span className="spinner-border spinner-border-sm" role="status" ></span>
          ):
          "Update" }</button>
         
        </form>
   
        </div>
    </div>
  )
}

export default Profile