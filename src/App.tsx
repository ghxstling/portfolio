import * as React from 'react'
import {
  Avatar,
  Box,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Button,
  Grid2,
  Container,
  CssBaseline,
  Card,
  TextField,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { GitHub, LinkedIn, Instagram } from '@mui/icons-material'
import { theme } from './css/theme'
// import nodemailer from 'nodemailer'

const HEADER_HEIGHT = 3.5
const HEADER_MARGIN = 1.5

const ICON_SIZE = 'large'

const GITHUB_USERNAME = 'ghxstling'

export default function App() {
  const [loaded, setLoaded] = React.useState(false)
  const IMG_LINEAR_GRADIENT = 'linear-gradient(to left, rgba(0, 0, 0, 0), rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0))'

  React.useEffect(() => {
    setLoaded(true)
  }, [setLoaded])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component={'img'}
        src="./assets/code.jpg"
        alt="Background"
        style={{
          position: 'fixed',
          inset: '0 50% 0 50%',
          zIndex: -1,
          height: '100vh',
          width: 'fit-content',
          filter: 'blur(3px) saturate(0)',
          opacity: 0.3,
          justifySelf: 'center',
          maskMode: 'alpha',
          maskImage: IMG_LINEAR_GRADIENT,
          WebkitMaskImage: IMG_LINEAR_GRADIENT,
        }}
      />
      {loaded && (
        <Container component={'main'}>
          <Header />
          <AvatarCard />
          <Stack spacing={5}>
            <About />
            <Projects />
            <Contact />
            <Footer />
          </Stack>
        </Container>
      )}
    </ThemeProvider>
  )
}

const handleScrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const rect = element.getBoundingClientRect()
    let yPos
    if (element.id === 'home') {
      yPos = 0
    } else {
      yPos = rect.top + window.scrollY - (HEADER_HEIGHT + HEADER_MARGIN) * 16
    }
    window.scrollTo({ top: yPos, behavior: 'smooth' })
  }
}

function Header() {
  const buttons = ['Home', 'About', 'Projects', 'Contact']

  return (
    <Box
      sx={{
        position: 'sticky',
        top: HEADER_MARGIN + 'rem',
        zIndex: 100,
        width: '100%',
      }}
    >
      <Paper
        id="home"
        component="header"
        elevation={10}
        sx={{
          maxWidth: '80rem',
          height: HEADER_HEIGHT + 'rem',
          borderRadius: 2,
          py: 0,
          boxShadow: '0 0 1.5rem rgb(10, 10, 10)',
        }}
      >
        <Grid2
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {buttons.map((button) => (
            <Button
              key={button}
              onClick={() => handleScrollTo(button.toLowerCase())}
              sx={{ px: '1rem', fontSize: '1.25rem' }}
            >
              {button}
            </Button>
          ))}
        </Grid2>
      </Paper>
    </Box>
  )
}

function AvatarCard() {
  const AVATAR_SIZE = '20rem'
  const FONT_SIZE = '2.5rem'
  return (
    <Grid2
      component="section"
      id="home"
      container
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        py: '3rem',
        pt: 3 + HEADER_MARGIN + 'rem',
        fontSize: FONT_SIZE,
      }}
    >
      <Avatar
        alt="Dylan Choy"
        src="./assets/avatar.jpg"
        sx={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
        }}
      />

      <Stack
        sx={{
          textAlign: 'left',
          ml: '5rem',
          maxWidth: '25rem',
        }}
      >
        <Typography variant="h1" mb={1.5}>
          <code>Hey, I'm Dylan</code>
        </Typography>
        <Typography
          fontSize={'1.25rem'}
          sx={{
            textWrap: 'wrap',
          }}
        >
          Empowering businesses of tomorrow with innovative software solutions 🚀
        </Typography>
        <Grid2 container gap={2} mt={2}>
          <Button variant="contained" onClick={() => handleScrollTo('projects')}>
            Projects
          </Button>
          <Button variant="contained" onClick={() => handleScrollTo('contact')}>
            Get in Touch
          </Button>
        </Grid2>
      </Stack>
    </Grid2>
  )
}

function About() {
  return (
    <Paper
      id="about"
      sx={{
        height: '20rem',
      }}
    >
      <Typography variant="h2">About</Typography>
      <Typography variant="body1">sadadasdasdasdadsadasdassadasdsadasdasdas</Typography>
    </Paper>
  )
}

// TODO: add more ProjectData fields
type ProjectData = {
  id: number
  name: string
  description: string
  html_url: string
}

function Projects() {
  const [projects, setProjects] = React.useState<ProjectData[] | string>('')
  const projectsToDisplay = {
    'markit-uoa': 'Markit-UOA',
    learnquest: 'LearnQuest',
    'pc-part-hunter': 'PC Part Hunter',
    'shortr-url': 'Shortr URL',
  }

  const CARD_SIZE = { lg: '30rem', md: '40rem', sm: '35rem', xs: '30rem' }

  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const repositories = await response.json()
        setProjects(repositories)
      } catch (error) {
        console.error('Error fetching repositories:', error)
        setProjects('GitHub API Error')
      }
    }

    fetchProjects()
  }, [])

  return (
    <Paper id="projects">
      <Typography variant="h2">Projects</Typography>
      <Grid2 container spacing={{ lg: 3, md: 3, sm: 3, xs: 1 }} justifyContent={'center'}>
        {Array.isArray(projects) ? (
          projects.map((project) => {
            if (!Object.prototype.hasOwnProperty.call(projectsToDisplay, project.name)) return null
            const projectName = projectsToDisplay[project.name as keyof typeof projectsToDisplay]
            return (
              <Card
                key={project.id}
                variant="outlined"
                sx={{
                  width: CARD_SIZE,
                  height: CARD_SIZE,
                  borderRadius: '0.5rem',
                }}
              >
                <Typography key={project.id}>{projectName}</Typography>
              </Card>
            )
          })
        ) : (
          <Typography variant="body1" color="primary.main">
            {projects}
          </Typography>
        )}
      </Grid2>
    </Paper>
  )
}

function Contact() {
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [body, setBody] = React.useState('')
  const [message, setMessage] = React.useState('')

  const TEXTFIELD_WIDTH = 'calc(50% - 0.5rem)'

  // TODO: add email sending functionality
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = {
      fullName: fullName,
      email: email,
      phone: phone,
      subject: subject,
      body: body,
    }
    setMessage(JSON.stringify(formData))
    // try {
    //   const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'dylan.choy21@gmail.com',
    //       pass: process.env.GOOGLE_APP_PASSWORD,
    //     },
    //   })
    //   const mailOptions = {
    //     from: fullName + email,
    //     to: 'dylan.choy21@gmail.com',
    //     subject: subject,
    //     text: body,
    //     html: `<p>${body}</p><br/><p>From: ${fullName}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><br/><p>Sent from ghxstling.dev</p>`,
    //   }
    //   const info = await transporter.sendMail(mailOptions)
    // } catch (error) {
    //   console.error('Error sending email:', error)
    //   setMessage('Failed to send message. Please try again later.')
    //   return
    // }
  }

  return (
    <Paper id="contact">
      <Typography variant="h2">Let's Work Together</Typography>
      <Typography variant="body1">
        Got ideas for your website or interested in working with me? Get in touch!
      </Typography>
      <Box component="form" onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <Grid2
          container
          spacing={2}
          component={Card}
          sx={{
            mt: '1rem',
            width: '50rem',
            p: '1.5rem',
            justifyContent: 'center',
            justifySelf: 'center',
          }}
        >
          <TextField
            id="form-fullname"
            label="Full Name"
            required
            fullWidth
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            id="form-email"
            label="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: TEXTFIELD_WIDTH }}
          />
          <TextField
            id="form-phone"
            label="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            sx={{ width: TEXTFIELD_WIDTH }}
          />
          <TextField
            id="form-subject"
            label="Subject"
            required
            fullWidth
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            id="form-content"
            label="Body"
            required
            multiline
            rows={6}
            fullWidth
            onChange={(e) => setBody(e.target.value)}
          />
          <Button variant="contained" sx={{ py: '1rem', mt: '0.5rem', width: '100%' }}>
            Contact Me
          </Button>
          {message && (
            <Typography variant="body2" color="primary.main" mt={1}>
              {message}
            </Typography>
          )}
        </Grid2>
      </Box>
    </Paper>
  )
}

function Footer() {
  return (
    <Box component="footer" pb={5}>
      <Stack direction="row" spacing={1.5} justifyContent={'center'}>
        <Link href="https://github.com/ghxstling" target="_blank">
          <Tooltip arrow title="GitHub" placement="top">
            <GitHub fontSize={ICON_SIZE} />
          </Tooltip>
        </Link>
        <Link href="https://www.linkedin.com/in/dylan-choy/" target="_blank">
          <Tooltip arrow title="LinkedIn" placement="top">
            <LinkedIn fontSize={ICON_SIZE} />
          </Tooltip>
        </Link>
        <Link href="https://www.instagram.com/doodlyn_" target="_blank">
          <Tooltip arrow title="Instagram" placement="top">
            <Instagram fontSize={ICON_SIZE} />
          </Tooltip>
        </Link>
      </Stack>
      <Typography variant="body2" textAlign={'center'}>
        {'Copyright © '}
        {new Date().getFullYear()}
        {' Dylan Choy'}
      </Typography>
    </Box>
  )
}
