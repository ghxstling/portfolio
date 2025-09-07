import React, { Suspense } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import { ThemeProvider } from '@mui/material/styles'

const MobileMsg = React.lazy(() => import('./components/MobileMsg'))
const Header = React.lazy(() => import('./components/Header'))
const AvatarCard = React.lazy(() => import('./components/AvatarCard'))
const About = React.lazy(() => import('./components/About'))
const Projects = React.lazy(() => import('./components/Projects'))
const Contact = React.lazy(() => import('./components/Contact'))
const Footer = React.lazy(() => import('./components/Footer'))

import theme from './css/theme'

export default function App() {
  const IMG_LINEAR_GRADIENT = 'linear-gradient(to left, rgba(0, 0, 0, 0), rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0))'

  const image = {
    position: 'fixed',
    inset: '0 50% 0 50%',
    zIndex: -1,
    height: '100vh',
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
      <Suspense>
        <Container component={'main'}>
          <MobileMsg />
          <Header />
          <AvatarCard />
          <Stack spacing={{ lg: 5, md: 3, sm: 3, xs: 2 }}>
            <About />
            <Projects />
            <Contact />
            <Footer />
          </Stack>
        </Container>
      </Suspense>
    </ThemeProvider>
  )
}
