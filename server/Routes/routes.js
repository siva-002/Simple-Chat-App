const express=require("express")
const router=express.Router()
const { resetpassword,forgotpassword,removenewmsgcount,registeruser,loginuser,getuser,getusers,sentmessage,getreceivedmessage,getsentmessage,updateuser,getnewmessages}=require("../models/apifunction")
const {validatetoken} =require("../models/tokenfunction")
const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
      destination:function async(req,file,cb){
            const loc=path.join(__dirname,'..','uploads')
             cb(null,loc)
      },
      filename:function(req,file,cb){
            cb(null,file.originalname)
      }
})
const upload=multer({storage:storage})
router.post("/login",(req,res)=>loginuser(req,res))
router.post("/register",(req,res)=>registeruser(req,res))
router.post("/forgotpassword",(req,res)=>forgotpassword(req,res))
router.post("/resetpassword",(req,res)=>resetpassword(req,res))

router.post("/User",validatetoken,(req,res)=>{
      res.json({status:"200",msg:"Authorized"})
})
router.post("/getuser",(req,res)=>getuser(req,res))
router.post("/getusers",(req,res)=>getusers(req,res))
router.post("/sendmessage",(req,res)=>sentmessage(req,res))
router.post("/getreceivedmessage",(req,res)=>getreceivedmessage(req,res))
router.post("/getsentmessage",(req,res)=>getsentmessage(req,res))
router.post("/getnewmessages",(req,res)=>getnewmessages(req,res))
router.post("/removenewmsgcount",(req,res)=> removenewmsgcount(req,res))
router.post("/updateuser",upload.single('file'),(req,res)=>updateuser(req,res))


module.exports=router
  