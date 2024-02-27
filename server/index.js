const express=require('express')
const routerlink=require("./Routes/routes")
const app=express()
const cors=require("cors")
const dotenv=require('dotenv')
dotenv.config()
const connect=require("./Database/ConnectDB")
const multer=require("multer")
const {logEvents,errorhandler }=require("./middleware/logEvents")

const port=process.env.PORT || 3000
connect()


app.use(express.urlencoded({extended:true}))

app.use(cors({origin:"http://localhost:3000",methods:['GET','POST','DELETE'],allowedHeaders:['Content-Type']}))

app.use((req,res,next)=>{
    logEvents(`${req.method} ${req.headers.origin} ${req.path}`,'logs.txt')
    next()
})
app.use(express.json())

app.use("/api",routerlink)
app.use("/uploads",express.static("./uploads"))


app.use((err,req,res)=>errorhandler(err,req,res))
app.listen(port,()=>{
    console.log(`Server Running in port ${port}`)
})
