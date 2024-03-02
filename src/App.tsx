import React, { useState } from 'react'

import avatar from './assets/avatar.jpg'
import cs101 from './assets/cs101.jpg'
import cs399 from './assets/cs399.jpg'
import cs335 from './assets/cs335.jpg'
import transcript_p1 from './assets/transcript_p1.jpg'
import transcript_p2 from './assets/transcript_p2.jpg'
import transcript_p3 from './assets/transcript_p3.jpg'
import project1 from './assets/project1.jpg'
import project2 from './assets/project2.jpg'

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
  Zoom,
  Menu,
  MenuItem,
  Modal,
  ImageList,
  ImageListItem,
  Backdrop,
  Fade,
  Divider,
  List,
  ListItem,
  Button,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { Instagram, GitHub, LinkedIn, Description, Launch } from '@mui/icons-material/'

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
            src={avatar}
            sx={{
              width: '10vw',
              height: '10vw',
            }}
          />
        </Grid>
        <Grid sx={fontSize}>
          <code>Hey, I'm Dylan.</code>
        </Grid>
        <Grid sx={fontSize}>
          <Typography>An aspiring Computer Science / Information Systems Student</Typography>
        </Grid>
      </Box>
    </>
  )
}

function Projects() {
  const projectData = [
    {
      img: project1,
      title: 'Markit-UOA',
      desc: 'A web platform for organising student markers',
      link: 'https://www.markituoa.xyz',
    },
    {
      img: project2,
      title: 'Calculator',
      desc: 'An online Calculator tool',
      link: 'https://calculator-lake-eight.vercel.app/',
    },
  ]

  const paperStyle = {
    p: 1,
    bgcolor: '#525765',
  }
  const imgDivStyle = {
    overflow: 'hidden',
    width: '20rem',
  }
  const textStyle = {
    color: 'white',
    fontSize: '0.8rem',
    pt: 1,
  }

  const [hover, setHover] = useState<number>(-1)

  return (
    <Grid
      container
      direction={'row'}
      spacing={5}
      sx={{
        mt: '8rem',
        mb: '2rem',
      }}
    >
      {projectData.map((item, index) => (
        <Grid>
          <Paper
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(-1)}
            square={false}
            elevation={20}
            sx={paperStyle}
          >
            <ImageListItem key={item.img} sx={imgDivStyle}>
              <img src={item.img} alt={item.title} loading="eager" />
            </ImageListItem>
            <Link href={item.link} target="_blank" color="inherit" underline="none">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="overline" textAlign={'left'} sx={textStyle}>
                  {item.title}
                </Typography>
                <Launch fontSize="small" htmlColor="white" />
              </Box>
              {hover === index && (
                <Box sx={{ display: hover === index ? 'block' : 'none' }}>
                  <Typography variant="body2" textAlign={'left'} sx={textStyle}>
                    {item.desc}
                  </Typography>
                </Box>
              )}
            </Link>
          </Paper>
        </Grid>
      ))}
    </Grid>
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
          vertical: 'bottom',
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
              <Box sx={{ ...modalStyle, width: '40rem' }}>
                <CV />
              </Box>
            ) : modal === 'transcript' ? (
              <Box sx={{ ...modalStyle }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  My Academic Transcript
                </Typography>
                <Transcript />
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
            <div></div>
            {/* <Link href="https://www.instagram.com/doodlyn_/" target="_blank" color="inherit">
              <Tooltip arrow title="Instagram" placement="top" TransitionComponent={Zoom}>
                <Instagram fontSize="large" />
              </Tooltip>
            </Link> */}
            <Link href="https://github.com/ghxstling" target="_blank" color="inherit">
              <Tooltip arrow title="GitHub" placement="top" TransitionComponent={Zoom}>
                <GitHub fontSize="large" />
              </Tooltip>
            </Link>
            <Link href="https://www.linkedin.com/in/dylan-choy/" target="_blank" color="inherit">
              <Tooltip arrow title="LinkedIn" placement="top" TransitionComponent={Zoom}>
                <LinkedIn fontSize="large" />
              </Tooltip>
            </Link>
            <MyDocuments />
          </Stack>
          <Grid>
            <Typography variant="body2" color="white">
              {'Copyright © '}
              {new Date().getFullYear()}
              {' Dylan Choy'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

function CV() {
  const alignLeft = {
    ml: 2,
    textAlign: 'left',
  }
  const divider = {
    mt: 1,
    mb: 1,
  }

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        {/* Name */}
        <Grid>
          <Typography id="cvName" sx={alignLeft}>
            Dylan Choy
          </Typography>
          <Box sx={divider}>
            <Divider variant="middle" />
          </Box>
        </Grid>
        {/* Summary and Contact */}
        <Grid container direction={'row'} spacing={1} sx={alignLeft}>
          <Grid xs={7}>
            <Typography id="cvHeading1">Summary</Typography>
            <Typography id="cvText">
              Highly motivated and dynamic person with a diligent attitude in a workspace environment and strive to
              learn new experiences and improve my excellent skills. I aspire to pursue a career in Software Development
              as a Software Engineer.
            </Typography>
          </Grid>
          <Grid xs={5}>
            <Typography id="cvHeading1">Contact</Typography>
            <Typography id="cvText">
              dylan.choy21@gmail.com
              <br />
              https://www.linkedin.com/in/dylan-choy/
              <br />
              022 439 2298
              <br />
              Mount Eden, Auckland
            </Typography>
          </Grid>
        </Grid>
        <Box sx={divider}>
          <Divider variant="middle" />
        </Box>
        {/* Body */}
        <Grid container direction={'row'} spacing={1} sx={alignLeft}>
          {/* Education */}
          <Grid xs={4}>
            <Typography id="cvHeading1">Education</Typography>
            <Typography id="cvHeading2">AUCKALND GRAMMAR SCHOOL</Typography>
            <Typography id="cvText">
              CIE NZ
              <br />
              2016 - 2020
              <br />
              Average Grade: A
            </Typography>
            <Box sx={{ pb: 1 }} />
            <Typography id="cvHeading2">UNIVERSITY OF AUCKLAND</Typography>
            <Typography id="cvText">
              BCom / BSci
              <br />
              Computer Science & Information Systems
              <br />
              2021 - 2025
              <br />
              Cumulative GPA: 6.5
            </Typography>
            <Box sx={{ ...divider, ml: -2 }}>
              <Divider variant="middle" />
            </Box>
            {/* Skills */}
            <Typography id="cvHeading1">Skills</Typography>
            <Typography id="cvHeading2">Programming Languages</Typography>
            <Typography id="cvText">Python, Java, C#, Typescript, NodeJS</Typography>
            <Box sx={{ pb: 1 }} />
            <Typography id="cvHeading2">Web Technologies</Typography>
            <Typography id="cvText">Next.JS, RESTful, HTML5, CSS, git</Typography>
            <Box sx={{ pb: 1 }} />
            <Typography id="cvHeading2">Tools & Technologies</Typography>
            <Typography id="cvText">Word, PowerPoint, Excel, AWS</Typography>
            <Box sx={{ pb: 1 }} />
            <Typography id="cvHeading2">Other Skills</Typography>
            <Typography id="cvText">
              Communication, Teamwork, Problem-solving, Adaptability, Working under Pressure
            </Typography>
            <Box sx={{ ...divider, ml: -2 }}>
              <Divider variant="middle" />
            </Box>
            {/* References */}
            <Typography id="cvHeading1">References</Typography>
            <Typography id="cvText">Available upon request.</Typography>
          </Grid>
          {/* Work Experience */}
          <Grid xs={8}>
            <Typography id="cvHeading1">Experience</Typography>
            <Typography id="cvHeading2">BACKEND DEVELOPER</Typography>
            <Typography id="cvText">
              UNIVERSITY OF AUCKLAND CAPSTONE PROJECT <br />
              Jul 2023 - Oct 2023
              <List disablePadding sx={{ ml: 1, listStyleType: 'disc' }}>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    Project URL: https://www.markituoa.xyz/
                  </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    Worked with a team of 6 people to develop a Next.js Web Application called Markit-UOA for organising
                    student markers to various courses
                  </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    Developed a feature-rich API specifically tailored to the project, with functions like personalised
                    email sender, CSV writer, and persistent file storing
                  </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    Learned & utilised new technologies quickly, like TypeScript, AWS, and NodeJS, during project
                    development
                  </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    Adopted good software development practices like Agile-driven development and Feature Branch
                    Workflow
                  </Typography>
                </ListItem>
              </List>
            </Typography>
            <Box sx={{ pb: 1 }} />
            <Typography id="cvHeading2">SHOP ASSISTANT</Typography>
            <Typography id="cvText">
              PB TECH ST LUKE'S
              <br />
              Apr 2022 - Present
              <List disablePadding sx={{ ml: 1, listStyleType: 'disc' }}>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    Delivered excellent customer service with a positive attitude
                  </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    Provided customers with product recommendations tailored to their requirements
                  </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    Maintained a high level of attention to detail with every task
                  </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    Worked in a fast-paced work environment
                  </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    As a Cashier:
                  </Typography>
                  <List disablePadding sx={{ ml: 2, listStyleType: 'disc' }}>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                      <Typography id="cvText" sx={{ ml: 1 }}>
                        Prepared daily cash/bank reconciliation reports
                      </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                      <Typography id="cvText" sx={{ ml: 1 }}>
                        Identified and fixed any accounting errors with credits/invoices
                      </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                      <Typography id="cvText" sx={{ ml: 1 }}>
                        Processed payments/credits at checkout for customers
                      </Typography>
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'list-item' }}>
                  <Typography id="cvText" sx={{ ml: 1 }}>
                    As a Service Technician:
                  </Typography>
                  <List disablePadding sx={{ ml: 2, listStyleType: 'disc' }}>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                      <Typography id="cvText" sx={{ ml: 1 }}>
                        Booked in service/repair jobs with participating service agents on behalf of customers
                      </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                      <Typography id="cvText" sx={{ ml: 1 }}>
                        Handled customer complaints calmly & professionally
                      </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                      <Typography id="cvText" sx={{ ml: 1 }}>
                        Performed diagnostics and on-site repairs for desktop PCs and laptops
                      </Typography>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'list-item' }}>
                      <Typography id="cvText" sx={{ ml: 1 }}>
                        Assisted customers in resolving issues regarding their purchases
                      </Typography>
                    </ListItem>
                  </List>
                </ListItem>
              </List>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

function Awards() {
  const imgData = [
    { img: cs101, title: 'COMPSCI 101' },
    { img: cs335, title: 'COMPSCI 335' },
    { img: cs399, title: 'COMPSCI 399' },
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

function Transcript() {
  const imgData = [
    { img: transcript_p1, title: 'Transcript Page 1' },
    { img: transcript_p2, title: 'Transcript Page 2' },
    { img: transcript_p3, title: 'Transcript Page 3' },
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

function App() {
  const [open, setOpen] = useState(true)

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
    <Container>
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
          <Box sx={modalStyle}>
            <Typography variant="overline" fontSize={'1.5rem'} id="modal-title">
              Hi there!
            </Typography>
            <Typography variant="body2" fontSize={'1.25rem'} id="modal-description">
              Thanks for dropping by my portfolio. Please keep in mind that it is currently a <b>work in progress</b>,
              so some features may either be missing or incomplete. In the meantime, feel free to have a look around! :)
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
        </Fade>
      </Modal>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Header />
        <Projects />
        <Footer />
      </Grid>
    </Container>
  )
}

export default App
