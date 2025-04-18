import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import { ThemeProvider } from '@mui/material/styles'

import { Projects } from './components/Projects'
import { Header } from './components/Header'
import { AvatarCard } from './components/AvatarCard'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

import { theme } from './css/theme'
import { MobileMsg } from './MobileMsg'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const IMG_LINEAR_GRADIENT = 'linear-gradient(to left, rgba(0, 0, 0, 0), rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0))'

  useEffect(() => {
    setLoaded(true)
  }, [setLoaded])

  const image = {
    position: 'fixed',
    inset: '0 50% 0 50%',
    zIndex: -1,
    height: '100vh',
    width: '100&',
    filter: 'blur(3px) saturate(0)',
    opacity: 0.3,
    justifySelf: 'center',
    maskMode: 'alpha',
    maskImage: IMG_LINEAR_GRADIENT,
    WebkitMaskImage: IMG_LINEAR_GRADIENT,
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component={'img'} src="./assets/code.jpg" alt="Background" sx={image} />
      {loaded && (
        <Container component={'main'}>
          <MobileMsg />
          <Header />
          <AvatarCard />
          <Stack spacing={{ md: 5, sm: 2.5 }}>
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
