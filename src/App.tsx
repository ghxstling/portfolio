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
  FormControl,
  FormHelperText,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { GitHub, LinkedIn, Instagram, DataObject, VideogameAsset, School } from '@mui/icons-material'
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
  const ICON_STYLE = { fontSize: '5rem', color: 'primary.main' }

  function Section({ children }: { children: React.ReactNode }) {
    return (
      <Stack direction={'row'} spacing={5} alignItems={'center'}>
        {children}
      </Stack>
    )
  }

  function Bold({ children }: { children: string }) {
    return (
      <Typography component="span" sx={{ color: 'primary.light', fontWeight: 'bold' }}>
        {children}
      </Typography>
    )
  }

  return (
    <Paper
      id="about"
      sx={{
        height: 'fit-content',
        px: '3.5rem',
      }}
    >
      <Stack spacing={5}>
        <Box>
          <Typography variant="h2">About</Typography>
          <Grid2 container spacing={3}>
            <Section>
              <DataObject sx={ICON_STYLE} />
              <Typography textAlign={'left'}>
                An aspiring Software Developer with a focus on <Bold>backend web development</Bold>. My passion in
                technology and programming began at a young age, building my first <Bold>Snake</Bold> game using Python
                in 2018. Since then, I am fueled by a desire to understand the intricacies of software and its potential
                to provide <Bold>effective solutions</Bold>. I am committed to placing people at the heart of every
                project, ensuring that my software makes a <Bold>real difference</Bold> in their lives.
              </Typography>
            </Section>
            <Section>
              <School sx={ICON_STYLE} />
              <Typography textAlign={'left'}>
                During my studies at the <Bold>University of Auckland</Bold>, I gained a strong foundation in web
                development, utilising technologies like <Bold>Python, TypeScript, and React</Bold>. I am a
                self-motivated learner with proven <Bold>problem-solving skills</Bold> in debugging and optimizing web
                applications, and I <Bold>quickly adapt</Bold> to new technologies (e.g., AWS, SendGrid). I also excel
                in <Bold>collaborative settings</Bold>, demonstrating strong communication and teamwork abilities.
              </Typography>
            </Section>
            <Section>
              <VideogameAsset sx={ICON_STYLE} />
              <Typography textAlign={'left'}>
                When I am not spending hours fixing my broken code, I enjoy <Bold>playing video games</Bold> with my
                friends to unwind. I also have a keen interest in <Bold>all things technology</Bold>, particularly{' '}
                computer hardware and mobile phones. I am a <Bold>gym enthusiast</Bold>, regularly working out and
                focusing on fitness through cooking high-protein meals and experimenting with new recipes. I also enjoy{' '}
                <Bold>exploring new technologies</Bold> and <Bold>experimenting with coding projects</Bold> in my free
                time.
              </Typography>
            </Section>
          </Grid2>
        </Box>
        {/* <Box>
          <Typography variant="h2">Work</Typography>
          <Grid2 container spacing={2}>
            <Typography>(display work and experience as a timeline)</Typography>
          </Grid2>
        </Box>
        <Box>
          <Typography variant="h2">Skills</Typography>
          <Grid2 container spacing={2}>
            <Typography>(display skills icon as a sliding carousel)</Typography>
          </Grid2>
        </Box> */}
      </Stack>
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
  const [fullName, setFullName] = React.useState<string | undefined>(undefined)
  const [email, setEmail] = React.useState<string | undefined>(undefined)
  const [phone, setPhone] = React.useState<string | undefined>(undefined)
  const [subject, setSubject] = React.useState<string | undefined>(undefined)
  const [body, setBody] = React.useState<string | undefined>(undefined)
  const [message, setMessage] = React.useState<string | undefined>(undefined)
  const [touched, setTouched] = React.useState({
    fullName: false,
    email: false,
    phone: false,
    subject: false,
    body: false,
  })

  const TEXTFIELD_WIDTH = 'calc(50% - 0.5rem)'

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  // TODO: add email sending functionality
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      subject: true,
      body: true,
    })

    if (!fullName || !email || !subject || !body) {
      setMessage('Please fill out all required fields.')
      return
    }

    const formData = { fullName, email, phone, subject, body }
    setMessage(`Success! \n${JSON.stringify(formData)}`)
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
      <Box component="form" autoComplete="off" onSubmit={handleSubmit} noValidate>
        <Grid2
          component={Card}
          container
          spacing={2}
          sx={{
            mt: '1rem',
            width: '50rem',
            p: '1.5rem',
            justifySelf: 'center',
          }}
        >
          <FormControl error={!fullName} fullWidth>
            <TextField
              id="form-fullname"
              label="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur('fullName')}
            />
            {touched.fullName && !fullName && <FormHelperText>Full Name is required.</FormHelperText>}
          </FormControl>
          <Grid2 container spacing={2} sx={{ width: '100%' }}>
            <FormControl error={!email || !/\S+@\S+\.\S+/.test(email)} sx={{ width: TEXTFIELD_WIDTH }}>
              <TextField
                id="form-email"
                type="email"
                label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {touched.email && (!email || !/\S+@\S+\.\S+/.test(email)) && (
                <FormHelperText>Invalid Email address.</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!phone || !/^[0-9]{9,10}$/.test(phone)} sx={{ width: TEXTFIELD_WIDTH }}>
              <TextField
                id="form-phone"
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur('phone')}
              />
              {touched.phone && phone != '' && phone != null && !/^[0-9]{9,10}$/.test(phone) && (
                <FormHelperText>Please enter a valid phone number (9-10 digits).</FormHelperText>
              )}
            </FormControl>
          </Grid2>
          <FormControl error={!subject} fullWidth>
            <TextField
              id="form-subject"
              label="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onBlur={() => handleBlur('subject')}
            />
            {touched.subject && !subject && <FormHelperText>Subject is required.</FormHelperText>}
          </FormControl>
          <FormControl error={!body} fullWidth>
            <TextField
              id="form-content"
              label="Body"
              required
              multiline
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onBlur={() => handleBlur('body')}
            />
            {touched.body && !body && <FormHelperText>Message body is required.</FormHelperText>}
          </FormControl>
          <Button type="submit" variant="contained" sx={{ py: '1rem', mt: '0.5rem', width: '100%' }}>
            Contact Me
          </Button>
          {message && (
            <Typography
              variant="body2"
              color="primary.main"
              sx={{
                maxWidth: '100%',
                wordWrap: 'break-word',
              }}
            >
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
