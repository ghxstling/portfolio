import { useState, useMemo } from 'react'

import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'

import Description from '@mui/icons-material/Description'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard'
import EmailIcon from '@mui/icons-material/Email'

import theme from '../css/theme'
import { handleScrollTo } from './helper/functions'
import { PDFViewer } from './PDFViewer'
import { HEADER_MARGIN } from './Header'
import { DiscordActivity } from './DiscordActivity'

function AvatarCard() {
  const [open, setOpen] = useState(false)

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

  const handleOpen = () => setOpen(true)

  const AVATAR_SIZE = {
    xs: '15rem',
    sm: '20rem',
  }
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
        py: {
          xs: '2rem',
          sm: '3rem',
        },
        pt: {
          xs: 1.5 + HEADER_MARGIN + 'rem',
          sm: 3 + HEADER_MARGIN + 'rem',
        },
        fontSize: FONT_SIZE,
        gap: {
          xs: 3,
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
          textAlign: {
            xs: 'center',
            sm: 'left',
          },
          ml: {
            md: '5rem',
          },
          alignItems: {
            xs: 'center',
            sm: 'normal',
          },
          maxWidth: {
            xs: '15rem',
            sm: '20rem',
            md: '25rem',
          },
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
        <Grid
          container
          gap={2}
          mt={2}
          sx={{
            maxWidth: {
              xs: '100%',
              sm: '88%',
            },
            justifyContent: isSmall ? 'center' : 'normal',
          }}
        >
          <Button variant="contained" onClick={() => handleScrollTo('projects')}>
            {!isMobile ? 'Projects' : <DeveloperBoardIcon />}
          </Button>
          <Button variant="contained" onClick={() => handleScrollTo('contact')}>
            {!isMobile ? 'Get in Touch' : <EmailIcon />}
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            <Description />
          </Button>
          {open && Modal}
          <DiscordActivity />
        </Grid>
      </Stack>
    </Grid>
  )
}

export default AvatarCard
