import useMediaQuery from '@mui/material/useMediaQuery'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import { theme } from './css/theme'
import { useEffect, useState } from 'react'
import { Container } from '@mui/material'

export function MobileMsg() {
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
        <Container>
          <h1>Mobile View</h1>
          <p>This website is not optimized for mobile view. Please use a desktop or laptop for the best experience.</p>
          <p>Click anywhere to close this message.</p>
        </Container>
        dsadsadasds
      </Paper>
    </Modal>
  )
}
