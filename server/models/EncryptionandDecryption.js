const CryptoJS=require("crypto-js")
const crypto =require("crypto")
const dotenv=require('dotenv')
dotenv.config()

const KEY=process.env.KEY
const encryptdata=(data)=>{
    const encrypted=CryptoJS.AES.encrypt(data,KEY).toString()
    return encrypted
}

const decryptdata=(data)=>{
    const decrypted=CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8)
    return decrypted
}



module.exports={encryptdata,decryptdata}