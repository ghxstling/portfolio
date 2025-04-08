import express from 'express'
import ViteExpress from 'vite-express'
import nodemailer from 'nodemailer'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'

dotenv.config({ path: './.env.local' })

const app = express()
let port
if (process.env.NODE_ENV === 'production') {
  port = 3000
} else {
  port = 8000
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.static('public', { maxAge: '1y' }))
app.use(express.static(join(__dirname, '../dist'), { maxAge: '1y' }))
app.use(compression())
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://ghxstling.dev'],
    methods: ['GET', 'POST'],
  })
)

app.post('/send-email', (req, res) => {
  try {
    const { fullName, email, subject, body, phone } = req.body

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'dylan.choy21@gmail.com',
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    })

    transporter.verify((error, success) => {
      if (error) {
        console.error('SERVER: Error verifying SMTP server - ', error)
      } else if (success) {
        console.log('SERVER: SMTP server is verified and ready to send messages')
      }
    })

    const mailOptions = {
      from: `${fullName} <${email}>`,
      to: 'dylan.choy21@gmail.com',
      subject: `Message from ${fullName} | ghxstling.dev`,
      text: body,
      html: `
        <p>Name: ${fullName}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Subject: ${subject}</p>
        <br />
        <p>${body.replace(/\n/g, '<br />')}</p>
        <br />
        <p>Sent from ghxstling.dev</p>
      `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('SERVER: Error sending email - ', error)
        res.status(400).send({
          status_code: 400,
          message: 'Error sending email',
          error: error.message,
        })
      } else {
        console.log('SERVER: Email sent - ', info.response)
        res.status(200).send({
          status_code: 200,
          message: 'Email sent successfully: ' + info.response,
          data: {
            fullName: fullName,
            email: email,
            body: body,
            phone: phone,
          },
        })
      }
    })
  } catch (error) {
    console.error('SERVER: Error sending email - ', error)
    res.status(400).send({
      status_code: 400,
      message: 'Error sending email',
      error: error.message,
    })
  }
})

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'))
})

if (process.env.NODE_ENV === 'production') {
  app.listen(port, () => console.log(`SERVER: Express.js is listening on port ${port} ...`))
} else {
  ViteExpress.listen(app, port, () => {
    console.log(`SERVER: ViteExpress is running on port ${port} ...`)
  })
}
