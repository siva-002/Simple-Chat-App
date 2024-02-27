const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        
    },
    dob:{
        type:String
    },
    mobile:{
        type:Number
    } ,
    profilepic:{

    },
    newmessages:[],
    messages:[    ]
})

const User=mongoose.model('userdata',userschema)

module.exports=User