import React, { useEffect, useState } from 'react'

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
  Button,
  Grid2,
  Card,
} from '@mui/material'
import { createTheme, useColorScheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { GitHub, LinkedIn, Description, Instagram, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
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
        minHeight: '20rem',
        alignItems: 'center',
        backgroundColor: 'lightblue',
      }}
    >
      {/* <Grid2
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
          <FaAngleLeft />
        </IconButton>
        {/* {projectData.map((item, index) => (
          <Grid2>
            <Sheet
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
            </Sheet>
          </Grid2>
        ))}
        <IconButton
          sx={{
            ...buttonIconStyle,
            left: buttonPosition,
          }}
        >
          <FaAngleRight />
        </IconButton>
      </Grid2> */}
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
        size="small"
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
        <Tooltip arrow title="My Documents" placement="top">
          <Description fontSize={ICON_SIZE} />
        </Tooltip>
      </IconButton>
      <Menu
        id="menu"
        component="ul"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
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
    </>
    // <div>
    //   <Modal
    //     open={open}
    //     onClose={() => setOpen(false)}
    //     aria-labelledby="modal-title"
    //     aria-describedby="modal-description"
    //     closeAfterTransition
    //     slots={{ backdrop: Backdrop }}
    //     slotProps={{
    //       backdrop: {
    //         timeout: 300,
    //       },
    //     }}
    //   >
    //     <Fade in={open}>
    //       {modal === 'cv' ? (
    //         <Box sx={{ ...modalStyle, width: '40rem' }}></Box>
    //       ) : modal === 'transcript' ? (
    //         <Box sx={{ ...modalStyle }}>
    //           <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
    //             My Academic Transcript
    //           </Typography>
    //           {/* <Transcript /> */}
    //         </Box>
    //       ) : modal === 'awards' ? (
    //         <Box sx={{ ...modalStyle }}>
    //           <Awards />
    //         </Box>
    //       ) : (
    //         <></>
    //       )}
    //     </Fade>
    //   </Modal>
    // </div>
  )
}

// function Footer() {
//   const styles = {
//     icon: 'size-8',
//     toggleDarkMode: 'text-white size-8 transition-all',
//   }

//   const [loaded, setLoaded] = React.useState(false)
//   const { setTheme, theme, resolvedTheme } = useTheme()

//   React.useEffect(() => {
//     setLoaded(true)
//     setTheme(resolvedTheme === 'light' ? 'light' : 'dark')
//   }, [setTheme, resolvedTheme])

//   const toggleTheme = () => {
//     setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
//   }

//   return (
//     <footer className="w-full h-[7.5rem] max-h-[10vh] bg-indigo-900 text-white">
//       <div className="flex flex-col items-center justify-center h-full gap-2">
//         <div className="Grid2 Grid2-flow-col gap-4">
//           <a href="https://github.com/ghxstling/" target="_blank" rel="noopener noreferrer">
//             <FaGithub className={styles.icon} />
//           </a>
//           <a href="https://www.linkedin.com/in/dylan-choy/" target="_blank" rel="noopener noreferrer">
//             <FaLinkedin className={styles.icon} />
//           </a>
//           <a href="https://www.instagram.com/doodlyn_/" target="_blank" rel="noopener noreferrer">
//             <FaInstagram className={styles.icon} />
//           </a>
//           {loaded && (
//             <div className="absolute flex right-0 mr-4 items-center">
//               <Button
//                 onClick={() => toggleTheme()}
//                 variant="solid"
//                 className={`size-10 bg-transparent hover:bg-indigo-700 rounded-[100%] cursor-pointer`}
//               >
//                 {theme === 'light' ? (
//                   <FaMoon className={styles.toggleDarkMode + ' text-white'} />
//                 ) : (
//                   <FaSun className={styles.toggleDarkMode} />
//                 )}
//               </Button>
//             </div>
//           )}
//         </div>
//         <a
//           className="hover:underline hover:underline-offset-2"
//           href="https://www.ghxstling.dev/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Copyright © 2025 Dylan Choy
//         </a>
//       </div>
//     </footer>
//   )
// }

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
          <MyDocuments />
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
