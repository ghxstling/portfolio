import { useState, useMemo } from 'react'

import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import Description from '@mui/icons-material/Description'

import { PDFViewer } from './PDFViewer'
import { HEADER_MARGIN } from './Header'
import { handleScrollTo } from './helper/functions'

export function AvatarCard() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const AVATAR_SIZE = '20rem'
  const FONT_SIZE = '2.5rem'

  const Modal = useMemo(() => {
    const handleClose = () => setOpen(false)

    return <PDFViewer open={open} onClose={handleClose} />
  }, [open])

  return (
    <Grid
      component="section"
      id="home"
      container
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        py: '3rem',
        pt: 3 + HEADER_MARGIN + 'rem',
        fontSize: FONT_SIZE,
        gap: {
          sm: 5,
          md: 0,
        },
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
        <Grid container gap={2} mt={2}>
          <Button variant="contained" onClick={() => handleScrollTo('projects')}>
            Projects
          </Button>
          <Button variant="contained" onClick={() => handleScrollTo('contact')}>
            Get in Touch
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            <Description />
          </Button>
          {open && Modal}
        </Grid>
      </Stack>
    </Grid>
  )
}
