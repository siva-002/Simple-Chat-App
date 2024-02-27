const mongoose=require("mongoose")
const connect=()=>{
    try{
        mongoose.connect(process.env.DB_URL).then(()=>{
            console.log("DB connected")
        })
        
    }catch(error){
        console.error(`Error in Db connection ${err}`)
    }
}

module.exports=connect