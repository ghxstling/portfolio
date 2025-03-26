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
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { GitHub, LinkedIn, Instagram } from '@mui/icons-material'
import { theme } from './theme'

const HEADER_HEIGHT = 3.5
const HEADER_MARGIN = 1.5

const ICON_SIZE = 'large'

export default function App() {
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setLoaded(true)
  }, [setLoaded])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loaded && (
        <Container component="main">
          <Box sx={{ my: HEADER_MARGIN * 2 + HEADER_HEIGHT + 'rem' }}>
            <Header />
          </Box>
          <Stack spacing={5}>
            <AvatarCard />
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

function Header() {
  const buttons = ['Home', 'About', 'Projects', 'Contact']

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

  return (
    <Paper
      id="home"
      component="header"
      elevation={5}
      sx={{
        position: 'fixed',
        inset: HEADER_MARGIN + 'rem 0 0 50%',
        transform: 'translate(-50%, -50%)',
        my: HEADER_MARGIN + 'rem',
        zIndex: 100,
        height: HEADER_HEIGHT + 'rem',
        maxWidth: '80rem',
        width: '100%',
        minWidth: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 2,
      }}
    >
      <Grid2 container spacing={3}>
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
        py: '5rem',
        fontSize: FONT_SIZE,
      }}
    >
      <img
        src="./assets/code.jpg"
        alt="Background"
        style={{
          position: 'absolute',
          zIndex: -1,
          width: '60rem',
          filter: 'blur(2.5px)',
          opacity: 0.25,
        }}
      />
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
          <code>Hey, I'm Dylan.</code>
        </Typography>
        <Typography
          fontSize={'1.25rem'}
          sx={{
            textWrap: 'wrap',
          }}
        >
          Empowering businesses of tomorrow with software solutions
        </Typography>
        <Grid2 container gap={2}>
          <Link href="#contact">
            <Button variant="contained">Projects</Button>
          </Link>
          <Link href="#contact">
            <Button variant="contained">Get in Touch</Button>
          </Link>
        </Grid2>
      </Stack>
    </Grid2>
  )
}

function About() {
  return (
    <Container
      id="about"
      sx={{
        bgcolor: 'orange',
        height: '20rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2">About</Typography>
      <Typography variant="body1">sadadasdasdasdadsadasdassadasdsadasdasdas</Typography>
    </Container>
  )
}

// TODO: Implement Projects component
// type ProjectData = {
//   name: string
//   description: string
//   html_url: string
// }

function Projects() {
  const [projects, setProjects] = React.useState<any[]>([])

  const CARD_SIZE = '20rem'

  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN
        const username = import.meta.env.VITE_GITHUB_USERNAME
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
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
        setProjects([])
      }
    }

    fetchProjects()
  }, [])

  return (
    <Container
      id="projects"
      sx={{
        bgcolor: 'darkblue',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2">Projects</Typography>
      <Grid2 container spacing={2} justifyContent={'center'}>
        {projects.map((project) => (
          <Card
            key={project.id}
            variant="outlined"
            sx={{
              width: CARD_SIZE,
              height: CARD_SIZE,
            }}
          >
            <Typography key={project.id}>{project.name}</Typography>
          </Card>
        ))}
      </Grid2>
    </Container>
  )
}

function Contact() {
  return (
    <Container
      id="contact"
      sx={{
        bgcolor: 'purple',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2">Get in Touch</Typography>
    </Container>
  )
}

function Footer() {
  return (
    <Container
      component="footer"
      sx={{
        bgcolor: 'black',
        backgroundColor: 'black',
        justifyItems: 'center',
      }}
    >
      <Stack direction="row" spacing={1.5}>
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
      <Grid2>
        <Typography variant="body2">
          {'Copyright © '}
          {new Date().getFullYear()}
          {' Dylan Choy'}
        </Typography>
      </Grid2>
    </Container>
  )
}
