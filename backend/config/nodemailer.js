import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_PASSWORD,
    }
})

export default transporter;