import * as React from 'react'
import { Avatar, Box, Link, Paper, Stack, Tooltip, Typography, Button, Grid2, Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { GitHub, LinkedIn, Instagram } from '@mui/icons-material'
import { theme } from './theme'

const HEADER_HEIGHT = 3.5
const HEADER_MARGIN = 1.5

const ICON_SIZE = 'large'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        id="home"
        sx={{
          maxWidth: '95vw',
        }}
      >
        <Header />
        <AvatarCard />
        <Projects />
        <Footer />
      </Stack>
    </ThemeProvider>
  )
}
function Header() {
  const buttons = ['Home', 'About', 'Projects', 'Contact']

  return (
    <Paper
      component="header"
      elevation={5}
      sx={{
        position: 'sticky',
        zIndex: 100,
        inset: 0,
        height: HEADER_HEIGHT + 'rem',
        my: HEADER_MARGIN + 'rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid2 container spacing={2}>
        {buttons.map((button) => (
          <Button key={button} href={'#' + button.toLowerCase()} sx={{ px: '1.5rem' }}>
            {button}
          </Button>
        ))}
      </Grid2>
    </Paper>
  )
}

function AvatarCard() {
  const AVATAR_SIZE = '15rem'
  const FONT_SIZE = '2.5rem'

  return (
    <Grid2
      component="section"
      id="home"
      container
      sx={{
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
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
          width: '50%',
          ml: '3rem',
          backgroundColor: 'red',
        }}
        gap={2}
      >
        <Typography variant="h1">
          <code>Hey, I'm Dylan.</code>
        </Typography>
        <Typography>An aspiring Software Engineer who is studying Computer Science / Information Systems</Typography>
      </Stack>
    </Grid2>
  )
}

// TODO: Implement Projects component
type ProjectData = {
  name: string
  description: string
  html_url: string
}

function Projects() {
  const [projects, setProjects] = React.useState<any[]>([])

  React.useEffect(() => {
    async function fetchProjects() {
      const token = import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN
      const username = import.meta.env.VITE_GITHUB_USERNAME

      try {
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
        bgcolor: 'skyblue',
        height: '30rem',
        py: '1.5rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2">Projects</Typography>
      <Stack spacing={2}></Stack>
    </Container>
  )
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        p: '1.5rem',
        backgroundColor: 'black',
      }}
    >
      <Grid2 container direction="column" justifyContent="center" alignItems="center" spacing={0}>
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
            <Tooltip arrow title="LinkedIn" placement="top">
              <Instagram fontSize={ICON_SIZE} />
            </Tooltip>
          </Link>
          {/* <MyDocuments /> */}
        </Stack>
        <Grid2>
          <Typography variant="body2">
            {'Copyright © '}
            {new Date().getFullYear()}
            {' Dylan Choy'}
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  )
}
