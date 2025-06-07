import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user: "sanmithdevadiga91@gmail.com",
        pass: "mmaurprvbdrrhvzh"
    }
});

export const sendMail = (from, email, sub, msg) =>{
    return transport.sendMail({
        from: from || "sanmithdevadiga91@gmail.com",
        to: email || "sanmithdevadiga91@gmail.com",
        subject: sub,
        html: msg
    });
}