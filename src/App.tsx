import React, { useState, useEffect } from 'react'
// import './App.css'

import avatar from './assets/avatar.jpg'
import cv from './assets/cv.jpg'
import cs101 from './assets/cs101.jpg'
import cs399 from './assets/cs399.jpg'
import cs335 from './assets/cs335.jpg'

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
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Item from '@mui/material/ListItem'

import { Instagram, GitHub, LinkedIn, Description } from '@mui/icons-material/'

import { createTheme, ThemeProvider } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    cvName: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    cvName?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    cvName: true
  }
}

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

function Carousel() {
  return <></>
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
    // width: '30vw',
    bgcolor: '#373a42',
    boxShadow: 24,
    p: 4,
  }

  const imgData = [{}, {}]

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
            <Box sx={modalStyle}>
              {modal === 'cv' ? (
                <>
                  <CV />
                </>
              ) : modal === 'transcript' ? (
                <>
                  <ImageList>
                    <ImageListItem key={cv}>
                      <img src={cv} width="50vw" alt={"Dylan Choy's CV"} loading="lazy" />
                    </ImageListItem>
                  </ImageList>
                </>
              ) : modal === 'awards' ? (
                <>
                  <ImageList>
                    <ImageListItem key={cv} sx={{}}>
                      <img src={cv} width="50vw" alt={"Dylan Choy's CV"} loading="lazy" />
                    </ImageListItem>
                  </ImageList>
                </>
              ) : (
                <></>
              )}
            </Box>
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
            <Link href="https://www.instagram.com/doodlyn_/" target="_blank" color="inherit">
              <Tooltip arrow title="Instagram" placement="top" TransitionComponent={Zoom}>
                <Instagram fontSize="large" />
              </Tooltip>
            </Link>
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
  const font = createTheme({
    typography: {
      cvName: {
        fontFamily: 'sans-serif',
        font: 'Merriweather',
        fontSize: '1vw',
        fontWeight: 'bold',
      },
    },
  })

  return (
    <ThemeProvider theme={font}>
      <Container>
        <Paper sx={{ p: 2 }}>
          {/* Name */}
          <Grid>
            <Typography
              className="cvName"
              sx={{
                ml: 2,
                textAlign: 'left',
              }}
            >
              Dylan Choy
            </Typography>
            <Divider variant="middle" />
          </Grid>
          {/* Summary and Contact */}
          <Grid
            container
            direction={'row'}
            spacing={1}
            sx={{
              mt: 1,
              mb: 1,
            }}
          >
            <Grid xs={7}>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                Summary
              </Typography>

              <Typography
                sx={{
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '1rem',
                }}
              >
                Highly motivated and dynamic person with a diligent attitude in a workspace environment and strive to
                learn new experiences and improve my excellent skills. I aspire to pursue a career in Software
                Development as a Software Engineer.
              </Typography>
            </Grid>
            <Grid xs={5}>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '1vw',
                  fontWeight: 'bold',
                }}
              >
                Contact
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <Typography
                    sx={{
                      ml: 2,
                      textAlign: 'left',
                      fontFamily: ['Montserrat', 'sans-serif'],
                      fontSize: '0.8vw',
                    }}
                  >
                    dylan.choy21@gmail.com
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography
                    sx={{
                      ml: 2,
                      textAlign: 'left',
                      fontFamily: ['Montserrat', 'sans-serif'],
                      fontSize: '0.8vw',
                    }}
                  >
                    https://www.linkedin.com/in/dylan-choy/
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography
                    sx={{
                      ml: 2,
                      textAlign: 'left',
                      fontFamily: ['Montserrat', 'sans-serif'],
                      fontSize: '0.8vw',
                    }}
                  >
                    022 439 2298
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography
                    sx={{
                      ml: 2,
                      textAlign: 'left',
                      fontFamily: ['Montserrat', 'sans-serif'],
                      fontSize: '0.8vw',
                    }}
                  >
                    Mount Eden, Auckland
                  </Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          {/* Body */}
          <Grid
            container
            direction={'row'}
            spacing={1}
            sx={{
              mt: 1,
              mb: 1,
            }}
          >
            {/* Education */}
            <Grid xs={4}>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '1vw',
                  fontWeight: 'bold',
                }}
              >
                Education
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  fontWeight: 'bold',
                }}
              >
                AUCKALND GRAMMAR SCHOOL
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  pb: 2,
                }}
              >
                CIE NZ
                <br />
                2016 - 2020
                <br />
                Average Grade: A
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  fontWeight: 'bold',
                }}
              >
                UNIVERSITY OF AUCKLAND
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                }}
              >
                BCom / BSci
                <br />
                Computer Science & Information Systems
                <br />
                2021 - 2025
                <br />
                Cumulative GPA: 6.5
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  mb: 1,
                }}
              >
                <Divider variant="middle" />
              </Box>
              {/* Skills */}
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '1vw',
                  fontWeight: 'bold',
                }}
              >
                Skills
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  fontWeight: 'bold',
                }}
              >
                Programming Languages
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  pb: 2,
                }}
              >
                Python, Java, C#, Typescript, NodeJS
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  fontWeight: 'bold',
                }}
              >
                Web Technologies
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  pb: 2,
                }}
              >
                Next.JS, RESTful, HTML5, CSS, git
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  fontWeight: 'bold',
                }}
              >
                Tools & Technologies
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  pb: 2,
                }}
              >
                Word, PowerPoint, Excel, AWS
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  fontWeight: 'bold',
                }}
              >
                Other Skills
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                }}
              >
                Communication, Teamwork, Problem-solving, Adaptability, Working under Pressure
              </Typography>
            </Grid>
            {/* Work Experience
            <Grid xs={8}>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '1vw',
                  fontWeight: 'bold',
                }}
              >
                Experience
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  fontWeight: 'bold',
                }}
              >
                BACKEND DEVELOPER
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  pb: 2,
                }}
              >
                UNIVERSITY OF AUCKLAND CAPSTONE PROJECT <br />
                Jul 2023 - Oct 2023
                <List disablePadding sx={{ listStyleType: 'disc' }}>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      Project URL: https://www.markituoa.xyz/
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      Worked with a team of 6 people to develop a Next.js Web Application called Markit-UOA for
                      organising student markers to various courses
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      Developed a feature-rich API specifically tailored to the project, with functions like
                      personalised email sender, CSV writer, and persistent file storing
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      Learned & utilised new technologies quickly, like TypeScript, AWS, and NodeJS, during project
                      development
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      Adopted good software development practices like Agile-driven development and Feature Branch
                      Workflow
                    </Typography>
                  </ListItem>
                </List>
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  fontWeight: 'bold',
                }}
              >
                SHOP ASSISTANT
              </Typography>
              <Typography
                sx={{
                  p: 'auto',
                  ml: 2,
                  textAlign: 'left',
                  fontFamily: ['Montserrat', 'sans-serif'],
                  fontSize: '0.8vw',
                  pb: 2,
                }}
              >
                PB TECH ST LUKE'S
                <br />
                Apr 2022 - Present
                <List disablePadding sx={{ listStyleType: 'disc' }}>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      Delivered excellent customer service with a positive attitude
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      Provided customers with product recommendations tailored to their requirements
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      Maintained a high level of attention to detail with every task
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      Worked in a fast-paced work environment
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      As a Cashier:
                    </Typography>
                    <List disablePadding sx={{ listStyleType: 'disc' }}>
                      <ListItem disablePadding sx={{ ml: 4, display: 'list-item' }}>
                        <Typography
                          sx={{
                            ml: 2,
                            textAlign: 'left',
                            fontFamily: ['Montserrat', 'sans-serif'],
                            fontSize: '0.8vw',
                          }}
                        >
                          Prepared daily cash/bank reconciliation reports
                        </Typography>
                      </ListItem>
                      <ListItem disablePadding sx={{ ml: 4, display: 'list-item' }}>
                        <Typography
                          sx={{
                            ml: 2,
                            textAlign: 'left',
                            fontFamily: ['Montserrat', 'sans-serif'],
                            fontSize: '0.8vw',
                          }}
                        >
                          Identified and fixed any accounting errors with credits/invoices
                        </Typography>
                      </ListItem>
                      <ListItem disablePadding sx={{ ml: 4, display: 'list-item' }}>
                        <Typography
                          sx={{
                            ml: 2,
                            textAlign: 'left',
                            fontFamily: ['Montserrat', 'sans-serif'],
                            fontSize: '0.8vw',
                          }}
                        >
                          Processed payments/credits at checkout for customers
                        </Typography>
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem disablePadding sx={{ ml: 2, display: 'list-item' }}>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    >
                      As a Service Technician:
                    </Typography>
                    <List disablePadding sx={{ listStyleType: 'disc' }}>
                      <ListItem disablePadding sx={{ ml: 4, display: 'list-item' }}>
                        <Typography
                          sx={{
                            ml: 2,
                            textAlign: 'left',
                            fontFamily: ['Montserrat', 'sans-serif'],
                            fontSize: '0.8vw',
                          }}
                        >
                          Booked in service/repair jobs with participating service agents on behalf of customers
                        </Typography>
                      </ListItem>
                      <ListItem disablePadding sx={{ ml: 4, display: 'list-item' }}>
                        <Typography
                          sx={{
                            ml: 2,
                            textAlign: 'left',
                            fontFamily: ['Montserrat', 'sans-serif'],
                            fontSize: '0.8vw',
                          }}
                        >
                          Handled customer complaints calmly & professionally
                        </Typography>
                      </ListItem>
                      <ListItem disablePadding sx={{ ml: 4, display: 'list-item' }}>
                        <Typography
                          sx={{
                            ml: 2,
                            textAlign: 'left',
                            fontFamily: ['Montserrat', 'sans-serif'],
                            fontSize: '0.8vw',
                          }}
                        >
                          Performed diagnostics and on-site repairs for desktop PCs and laptops
                        </Typography>
                      </ListItem>
                      <ListItem disablePadding sx={{ ml: 4, display: 'list-item' }}>
                        <Typography
                          sx={{
                            ml: 2,
                            textAlign: 'left',
                            fontFamily: ['Montserrat', 'sans-serif'],
                            fontSize: '0.7vw',
                          }}
                        >
                          Assisted customers in resolving issues regarding their purchases
                        </Typography>
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    ></Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    ></Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    ></Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography
                      sx={{
                        ml: 2,
                        textAlign: 'left',
                        fontFamily: ['Montserrat', 'sans-serif'],
                        fontSize: '0.8vw',
                      }}
                    ></Typography>
                  </ListItem>
                </List>
              </Typography>
            </Grid> */}
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

function App() {
  return (
    <Container>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Header />
        <Grid>
          {/* showcase projects here */}
          <Stack direction="row" spacing={1}>
            <Item>
              <Paper sx={{ padding: 5 }}>1</Paper>
            </Item>
            <Item>
              <Paper sx={{ padding: 5 }}>2</Paper>
            </Item>
            <Item>
              <Paper sx={{ padding: 5 }}>3</Paper>
            </Item>
          </Stack>
          <Box></Box>
        </Grid>
        <Footer />
      </Grid>
    </Container>
  )
}

export default App
