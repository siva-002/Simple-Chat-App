const fspromises=require("fs/promises")
const {v4:uid}=require("uuid")
const {format}=require("date-fns")
const path=require("path")
const fs=require("fs")
const logEvents=async(data,filename)=>{
    const date=format(Date(),"yyyy/MM/dd hh:mm:ss")
    const message=`${data}\t ${date} \n`
    try{
    if(!fs.existsSync(path.join(__dirname,"..",'logs')))
        await fspromises.mkdir(path.join(__dirname,"..",'logs'))

    await fspromises.appendFile(path.join(__dirname,"..","logs",filename),message)
   
    }catch(err){
        console.log(err.message)
    }
    
}
const errorhandler=(err,req,res)=>{
    if(err){
        logEvents(`${err.name} ${err.message}`,'error.txt')
    }
    
    
}
module.exports={logEvents,errorhandler}