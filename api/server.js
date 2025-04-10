import express from 'express'
import ViteExpress from 'vite-express'
import nodemailer from 'nodemailer'

import path from 'path'

import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

dotenv.config({ path: './.env.local' })

const app = express()
const port = 3001
ViteExpress.config({ mode: 'production' })

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staticPath = path.join(__dirname, '..', 'dist')
app.use(express.static(staticPath))
app.use(express.static('public'))
app.use(express.json())
app.use(compression())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://ghxstling.dev'],
    methods: ['GET', 'POST'],
  })
)

app.get('/api', (req, res) => {
  res.send({
    message: 'Hello from /api (root)!',
    status_code: 200,
  })
})

app.get('/api/email', (req, res) => {
  res.send({
    message: 'Hello from /api/email!',
    status_code: 200,
  })
})

app.post('/api/email', (req, res) => {
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
        throw error
      } else if (success) {
        console.log('SERVER: SMTP server is verified and ready to send messages')
      }
    })

    const mailOptions = {
      from: `${fullName}`,
      to: 'dylan.choy21@gmail.com',
      subject: `Message from ${fullName} | ghxstling.dev`,
      text: body,
      html: `
        <p><strong>Name</strong>: ${fullName}</p>
        <p><strong>Email</strong>: ${email}</p>
        <p><strong>Phone</strong>: ${phone}</p>
        <p><strong>Subject</strong>: ${subject}</p>
        <br />
        <p>${body.replace(/\n/g, '<br />')}</p>
        <br />
        <p><strong>Sent from ghxstling.dev</strong></p>
      `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('SERVER: Error sending email - ', error)
        res.status(400).send({
          status_code: 400,
          error: error.message,
        })
      } else {
        console.log('SERVER: Email sent - ', info.response)
        res.status(200).send({
          status_code: 200,
          message: info.response,
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
      error: error.message,
    })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

ViteExpress.listen(app, port, () => {
  console.log(`SERVER: ViteExpress is running on port ${port} ...`)
})

export default app
