import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export const sendEmail = async ({ to, subject, html }) =>{
    try {
        const { data, error } = await resend.emails.send({
            from: "Voicley <website@resend.dev> ",
            to: [to],
            subject,
            html
        });
        if(error){
            return console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}

