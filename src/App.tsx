import React from 'react'
import avatar from './avatar.jpg'
import './App.css'
import './documents/cv.pdf'

import {
  Avatar,
  Box,
  Container,
  IconButton,
  Link,
  Paper,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
  Zoom,
  Menu,
  MenuItem,
  Modal,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Item from '@mui/material/ListItem'

import { Instagram, GitHub, LinkedIn, Description } from '@mui/icons-material/'
import { Document, Page } from 'react-pdf'
import { pdfjs } from 'react-pdf'

const theme = createTheme()
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

function Header() {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: '2.5%',
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
        <Grid
          sx={{
            fontSize: '24px',
          }}
        >
          <code>Hey, I'm Dylan.</code>
        </Grid>
        <Grid>
          <Typography>An aspiring Computer Science / Information Systems student</Typography>
        </Grid>
      </Box>
    </>
  )
}

function Carousel() {
  return <></>
}

function PDFViewer(props: { link: string }) {
  const [modal, setModal] = React.useState<boolean>(true)
  const [numPages, setNumPages] = React.useState<number>()
  const [pageNumber, setPageNumber] = React.useState<number>(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#373a42',
    boxShadow: 24,
    p: 4,
  }

  return (
    <div>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          {/* {props.link === 'cv' ? (
            <>
              <Document
                file="https://drive.google.com/file/d/1Eqr4QVlWIOahHmvNEYBblm-EgR5ufup6/view?usp=sharing"
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </>
          ) : props.link === 'transcript' ? (
            <>
              <iframe src="https://docs.google.com/gview?url=https://ghxstling-cv.tiiny.site/&embedded=true"></iframe>
              <Document file="./documents/transcript.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </>
          ) : props.link === 'awards' ? (
            <>
              <Document file="./documents/cs101.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </>
          ) : (
            <></>
          )} */}
        </Box>
      </Modal>
    </div>
  )
}

function MyDocuments() {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null)
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const [modal, setModal] = React.useState<string>('')
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
        onClick={handleMenuClick}
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
        <MenuItem onClick={() => setModal('cv')}>CV</MenuItem>
        <MenuItem onClick={() => setModal('transcript')}>Academic Transcript</MenuItem>
        <MenuItem onClick={() => setModal('awards')}>Awards</MenuItem>
      </Menu>
      {modal === 'cv' ? (
        <PDFViewer link="cv" />
      ) : modal === 'transcript' ? (
        <PDFViewer link="transcript" />
      ) : modal === 'awards' ? (
        <PDFViewer link="awards" />
      ) : (
        <></>
      )}
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
          <Header />
          <Grid>
            {/* showcase projects here */}
            <Box>
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
            </Box>
          </Grid>
          <Footer />
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default App
