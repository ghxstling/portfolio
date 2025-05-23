import express from 'express'
import ViteExpress from 'vite-express'
import nodemailer from 'nodemailer'
import rateLimiter from 'express-rate-limit'

import path from 'path'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const expressVersion = require('express/package.json').version
const viteExpressVersion = require('vite-express/package.json').version

dotenv.config({ path: './.env.local' })

const app = express()
const port = 3001
ViteExpress.config({ mode: 'production' })

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staticPath = path.join(__dirname, '..', 'dist')
app.use(express.static(staticPath))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://ghxstling.dev'],
    methods: ['GET', 'POST'],
  })
)

const limiter = rateLimiter({
  windowMs: 5 * 60000,
  max: 1,
  message: {
    message: 'You can only send an email once every 5 minutes.',
    status: 429,
  },
})

app.get('/api', (req, res) => {
  res.status(200).send({
    message: 'Hello from /api (root)!',
  })
})

app.get('/api/email', (req, res) => {
  res.status(200).send({
    message: 'Hello from /api/email!',
  })
})

app.post('/api/email', limiter, (req, res) => {
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

app.get('/api/discord', (req, res) => {
  res.status(200).send({
    message: 'Hello from /api/discord!',
  })
})

app.get('/api/discord/callback', (req, res) => {
  // if (!process.env.NODE_ENV) {
  //   res.redirect(307, 'https://www.ghxstling.dev')
  // } else {
  //   res.redirect(307, 'http://localhost:5173')
  // }
  res.status(200).send({
    message: 'Hello from /api/discord/callback!',
    status_code: 200,
    req_query: req.query,
    req_params: req.params,
    req_body: req.body,
    req_headers: req.headers,
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

ViteExpress.listen(app, port, () => {
  console.log(`SERVER: Express.js version ${expressVersion}`)
  console.log(`SERVER: ViteExpress version ${viteExpressVersion}`)
  console.log(`SERVER: ViteExpress is running on port ${port} ...`)
})

export default app
