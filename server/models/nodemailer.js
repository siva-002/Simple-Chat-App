const mailer=require("nodemailer")

const transporter=mailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"chat.no.reply.recovery@gmail.com",
        pass:"pkbu pnij oclj tvyd"
    }
})

module.exports=transporter