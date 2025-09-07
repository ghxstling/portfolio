import { useEffect, useState } from 'react'

import useMediaQuery from '@mui/material/useMediaQuery'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import theme from '../css/theme'

function MobileMsg() {
  const [display, setDisplay] = useState(false)

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplay(true)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  function handleClose() {
    setDisplay(false)
  }

  if (!isSmallScreen) return null

  return (
    <Modal open={display} onClose={handleClose}>
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          width: '90vw',
          height: '60vh',
          p: 2,
        }}
      >
        <Container
          sx={{
            textAlign: 'center',
            mt: '2.5rem',
          }}
        >
          <Typography variant="h2" fontSize={'1.5rem'}>
            Dear Mobile User
          </Typography>
          <Typography pb={2}>Thanks for coming to my website!</Typography>
          <Typography>
            Just a heads up! This website is not 100% optimized for mobile view. For the best possible experience,
            please view this website on a desktop or laptop.
          </Typography>

          <Container
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Button
              variant="contained"
              onClick={handleClose}
              fullWidth
              sx={{
                position: 'relative',
                bottom: '1rem',
              }}
            >
              Got it!
            </Button>
          </Container>
        </Container>
      </Paper>
    </Modal>
  )
}

export default MobileMsg
