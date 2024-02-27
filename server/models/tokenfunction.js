const jwt =require("jsonwebtoken")

const generatetoken=async(email)=>{
    try{
    const token=await jwt.sign({email},process.env.SECRET_TOKEN,{expiresIn:"1hour"})
    return token
    }catch(err){
       return err.message
    }
}

const validatetoken=async(req,res,next)=>{

    try{
        if(!req.body.token){
            return res.json({"status":401,"msg":"UnAuthorized","token":req.body.token})
        }
        const verify=jwt.verify(req.body.token,process.env.SECRET_TOKEN)
        
        if(verify){
            return res.json({"status":200,"msg":"Authorized"})
           
        }            
        else{
           return res.json({"status":500,"msg":"Token Expired login Again"})
            
        }
      
    }catch(err){
        res.send(err.message)
    }
}
module.exports={generatetoken,validatetoken}