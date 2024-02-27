const bcrypt=require("bcrypt")
const generatehash=async(password)=>{
    const saltround=10
    const hash= await bcrypt.hash(password,saltround)
    return hash
}
const checkpassword=async(enteredpassword,storedpassword)=>{
    return await bcrypt.compare(enteredpassword,storedpassword)
}

generatehash("siva")
module.exports={generatehash,checkpassword}