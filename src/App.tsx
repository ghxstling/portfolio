import React, { useEffect, useState } from 'react'
import './App.css'

import {
  Avatar,
  Box,
  Container,
  IconButton,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Modal,
  ImageList,
  ImageListItem,
  Backdrop,
  Button,
  Collapse,
  Zoom,
  Fade,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { GitHub, LinkedIn, Description, Launch, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material/'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

function Header() {
  const fontSize = {
    fontSize: '1.25vw',
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: '3%',
        }}
        component="header"
      >
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Avatar
            alt="Dylan Choy"
            // src={avatar}
            sx={{
              width: {
                sm: '25vw',
                md: '10vw',
              },
              height: {
                sm: '25vw',
                md: '10vw',
              },
            }}
          />
        </Grid>
        <Grid sx={fontSize}>
          <Typography>
            <code>Hey, I'm Dylan.</code>
          </Typography>
          <br />
          <Typography>An aspiring Software Engineer who is studying Computer Science / Information Systems</Typography>
        </Grid>
        <Grid sx={fontSize}></Grid>
      </Box>
    </>
  )
}

function Projects() {
  const projectData = [
    // {
    //   img: project1,
    //   title: 'Markit-UOA',
    //   desc: 'A web platform for organising student markers',
    //   link: 'https://markituoa.ghxstling.info/',
    // },
    // {
    //   img: project2,
    //   title: 'Calculator',
    //   desc: 'An online Calculator tool',
    //   link: 'https://calculator.ghxstling.info/',
    // },
    // {
    //   img: test,
    //   title: 'Placeholder',
    //   desc: 'Placeholder',
    //   link: '',
    // },
  ]

  const paperStyle = {
    p: 1,
    bgcolor: '#525765',
  }

  const textStyle = {
    color: 'white',
    fontSize: '0.8rem',
  }

  const buttonPosition = '3rem'
  const buttonIconStyle = {
    bgcolor: '#525765',
    color: 'white',
    '&:hover': {
      bgcolor: 'gray',
      color: 'white',
    },
    width: '2.5rem',
    height: '2.5rem',
  }

  const [hover, setHover] = useState<number>(-1)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        direction={'row'}
        spacing={3}
        sx={{
          mt: '10rem',
          mb: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          sx={{
            ...buttonIconStyle,
            right: buttonPosition,
          }}
        >
          <KeyboardArrowLeft fontSize="large" />
        </IconButton>
        {/* {projectData.map((item, index) => (
          <Grid>
            <Paper
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(-1)}
              square={false}
              elevation={15}
              sx={paperStyle}
            >
              <ImageListItem key={item.img}>
                <img id="projectImg" src={item.img} alt={item.title} loading="eager" />
              </ImageListItem>
              <Link href={item.link} target="_blank" color="inherit" underline="none">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="overline" textAlign={'left'} sx={textStyle}>
                    {item.title}
                  </Typography>
                  <Launch fontSize="small" htmlColor="white" />
                </Box>
                <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '15rem' }}>
                  <Collapse in={hover === index}>
                    <Typography variant="body2" textAlign={'left'} sx={textStyle}>
                      {item.desc}
                    </Typography>
                  </Collapse>
                </Box>
              </Link>
            </Paper>
          </Grid>
        ))} */}
        <IconButton
          sx={{
            ...buttonIconStyle,
            left: buttonPosition,
          }}
        >
          <KeyboardArrowRight fontSize="large" />
        </IconButton>
      </Grid>
    </Box>
  )
}

function MyDocuments() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [modal, setModal] = useState<string>('')
  const [open, setOpen] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget)
  const handleMenuClose = () => setMenuAnchor(null)

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#373a42',
    boxShadow: 24,
    p: 4,
  }

  return (
    <>
      <IconButton
        id="menu-button"
        color="inherit"
        size="small"
        disableRipple
        disableFocusRipple
        edge="end"
        aria-controls={Boolean(menuAnchor) ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(menuAnchor) ? 'true' : undefined}
        onClick={handleMenuOpen}
        sx={{
          padding: 0,
          margin: 0,
          paddingBottom: 1,
        }}
      >
        <Tooltip arrow title="My Documents" placement="top" TransitionComponent={Zoom}>
          <Description fontSize="large" />
        </Tooltip>
      </IconButton>
      <Menu
        id="menu"
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        sx={{
          padding: 0,
          margin: 0,
        }}
      >
        <MenuItem
          onClick={() => {
            setOpen(true)
            setModal('cv')
          }}
        >
          CV
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(true)
            setModal('transcript')
          }}
        >
          Academic Transcript
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(true)
            setModal('awards')
          }}
        >
          Awards
        </MenuItem>
      </Menu>

      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 300,
            },
          }}
        >
          <Fade in={open}>
            {modal === 'cv' ? (
              <Box sx={{ ...modalStyle, width: '40rem' }}></Box>
            ) : modal === 'transcript' ? (
              <Box sx={{ ...modalStyle }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  My Academic Transcript
                </Typography>
                {/* <Transcript /> */}
              </Box>
            ) : modal === 'awards' ? (
              <Box sx={{ ...modalStyle }}>
                <Awards />
              </Box>
            ) : (
              <></>
            )}
          </Fade>
        </Modal>
      </div>
    </>
  )
}

function Footer() {
  return (
    <>
      <Box
        sx={{
          padding: '1rem',
          position: 'fixed',
          bottom: 0,
        }}
        component="footer"
      >
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={0}>
          <Stack direction="row" spacing={1.5}>
            <Link href="https://github.com/ghxstling" target="_blank" color="inherit">
              <Tooltip arrow title="GitHub" placement="top" TransitionComponent={Zoom}>
                <FaGithub />
              </Tooltip>
            </Link>
            <Link href="https://www.linkedin.com/in/dylan-choy/" target="_blank" color="inherit">
              <Tooltip arrow title="LinkedIn" placement="top" TransitionComponent={Zoom}>
                <FaLinkedin />
              </Tooltip>
            </Link>
            <MyDocuments />
          </Stack>
          <Grid>
            <Typography variant="body2" color="white">
              {'Copyright ©'}
              {new Date().getFullYear()}
              {' Dylan Choy'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

function Awards() {
  const imgData = [
    // { img: cs101, title: 'COMPSCI 101' },
    // { img: cs335, title: 'COMPSCI 335' },
    // { img: cs399, title: 'COMPSCI 399' },
    { img: 'test', title: 'COMPSCI 399' },
  ]

  return (
    <ImageList cols={3} gap={10}>
      {imgData.map((item) => (
        <ImageListItem
          key={item.img}
          sx={{
            width: '25rem',
          }}
        >
          <img src={item.img} alt={item.title} loading="eager" />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

// function Transcript() {
//   const imgData = [
//     { img: transcript_p1, title: 'Transcript Page 1' },
//     { img: transcript_p2, title: 'Transcript Page 2' },
//     { img: transcript_p3, title: 'Transcript Page 3' },
//   ]

//   return (
//     <ImageList cols={3} gap={10}>
//       {imgData.map((item) => (
//         <ImageListItem
//           key={item.img}
//           sx={{
//             width: '25rem',
//           }}
//         >
//           <img src={item.img} alt={item.title} loading="eager" />
//         </ImageListItem>
//       ))}
//     </ImageList>
//   )
// }

function WIPModal() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    const timer = setTimeout(() => {
      setOpen(true)
    }, 1000)
    return () => clearTimeout(timer)
  }

  useEffect(() => {
    handleOpen()
  }, [])

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#373a42',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Box sx={modalStyle}>
        <Typography variant="h1" fontWeight={600} fontSize={'2rem'} id="modal-title" sx={{ mb: 1 }}>
          Hi there!
        </Typography>
        <Typography variant="body1" fontSize={'1.25rem'} id="modal-description">
          Thanks for dropping by my portfolio. Please keep in mind that it is currently a <b>work in progress</b>, so
          some features may either be missing or incomplete. In the meantime, feel free to have a look around! :)
        </Typography>
        <Box sx={{ pt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{
              bgcolor: 'white',
              color: 'black',
              '&:hover': {
                bgcolor: 'gray',
                color: 'white',
              },
            }}
          >
            close
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

function App() {
  return (
    <Container>
      <WIPModal />
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Header />
        <Projects />
        <Footer />
      </Grid>
    </Container>
  )
}

export default App
