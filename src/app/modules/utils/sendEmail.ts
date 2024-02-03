import nodemailer from 'nodemailer'
import { NODE_MAILER_PASS, NODE_MAILER_SENDER } from '../../config'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: NODE_MAILER_SENDER,
    pass: NODE_MAILER_PASS,
  },
})

export const sendEmail = async (to: string, html: string) => {
  await transporter.sendMail({
    from: NODE_MAILER_SENDER, // sender address
    to, // list of receivers
    subject: 'Reset Password within 10 minutes', // Subject line
    html, // html body
  })
}
