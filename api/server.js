import express from 'express'
import ViteExpress from 'vite-express'
import nodemailer from 'nodemailer'
import rateLimiter from 'express-rate-limit'

import path from 'path'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

import client from './discord/bot.cjs'
import presenceUpdate from './discord/events/presenceUpdate.cjs'

dotenv.config({ path: './.env.local' })

const app = express()
const port = 3001
ViteExpress.config({ mode: process.env.NODE_ENV ? 'development' : 'production' })

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
    console.error(`SERVER: [ERROR] Failed to send email : ${error}`)
    res.status(400).send({
      status_code: 400,
      error: error.message,
    })
  }
})

app.get('/api/discord', (req, res) => {
  if (client.isReady()) {
    res.status(200).send({
      message: 'Hello from /api/discord! Bot is online.',
      status_code: 200,
      online: true,
      user: client.user.tag,
    })
  } else {
    console.log('SERVER: [ERROR] Discord bot is offline')
    res.status(500).send({
      message: 'Hello from /api/discord... wait, bot is offline. :(',
      status_code: 500,
      online: false,
      user: null,
    })
  }
})

app.get('/api/discord/my-activity', (req, res) => {
  if (client.isReady()) {
    try {
      const { userId, status, activity } = presenceUpdate.getLatestPresence()

      if (userId !== process.env.DISCORD_MY_USER_ID) {
        console.log('SERVER: [ERROR] Something wrong with your user ID...')
        res.status(400).send({
          message: 'Hello from /api/discord/my-activity... wait, something wrong with your user ID.',
          status_code: 400,
          online: true,
          presence: null,
        })
        return
      }

      if (activity) {
        res.status(200).send({
          message: 'Hello from /api/discord/my-activity! Activity fetched successfully.',
          status_code: 200,
          online: true,
          presence: {
            userId,
            status,
            activity,
          },
        })
      } else {
        res.status(404).send({
          message: 'Hello from /api/discord/my-activity... wait, activity not found.',
          status_code: 404,
          online: true,
          presence: null,
        })
      }
    } catch (error) {
      console.error(`SERVER: [ERROR] Failed to fetch activity from Discord Bot: ${error}`)
      res.status(500).send({
        message: 'Error: Could not fetch activity from Discord Bot.',
        status_code: 500,
        online: true,
        presence: undefined,
      })
    }
  } else {
    console.log('SERVER: [ERROR] Discord bot is offline')
    res.status(500).send({
      message: 'Hello from /api/discord/my-activity... wait, bot is offline. :(',
      status_code: 500,
      online: false,
      presence: undefined,
    })
  }
})

app.get('/api/github/projects', async (req, res) => {
  try {
    const response = await fetch(`https://api.github.com/users/ghxstling/repos`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      }
    })

    if (!response.ok) {
      throw new Error(response.message)
    }

    const projects = await response.json()
    res.status(200).send({
      message: `Hello from /api/github/projects! Projects fetched successfully`,
      status_code: 200,
      data: projects
    })

  } catch (error) {
    res.status(500).send({
      message: 'Error: Could not fetch projects from GitHub',
      status_code: 500,
      error: error.message
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
