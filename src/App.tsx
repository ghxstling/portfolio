import * as React from 'react'

import {
  Avatar,
  Box,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Button,
  Grid2,
  Container,
  CssBaseline,
  Card,
  TextField,
  FormControl,
  FormHelperText,
  Modal,
  List,
  useMediaQuery,
} from '@mui/material'
import {
  GitHub,
  LinkedIn,
  Instagram,
  DataObject,
  VideogameAsset,
  School,
  Description,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  SkipNext,
  SkipPrevious,
  FileDownload,
  Link as LinkIcon,
  OpenInNew,
} from '@mui/icons-material'

import { ThemeProvider, useTheme } from '@mui/material/styles'
import { theme } from './css/theme'

import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

const HEADER_HEIGHT = 3.5
const HEADER_MARGIN = 1.5

const ICON_SIZE = 'large'

const GITHUB_USERNAME = 'ghxstling'

export default function App() {
  const [loaded, setLoaded] = React.useState(false)
  const IMG_LINEAR_GRADIENT = 'linear-gradient(to left, rgba(0, 0, 0, 0), rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0))'

  React.useEffect(() => {
    setLoaded(true)
  }, [setLoaded])

  const image = {
    position: 'fixed',
    inset: '0 50% 0 50%',
    zIndex: -1,
    height: '100vh',
    width: 'fit-content',
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
      {loaded && (
        <Container component={'main'}>
          <Header />
          <AvatarCard />
          <Stack spacing={{ md: 5, sm: 2.5 }}>
            <About />
            <Projects />
            <Contact />
            <Footer />
          </Stack>
        </Container>
      )}
    </ThemeProvider>
  )
}

const handleScrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const rect = element.getBoundingClientRect()
    let yPos
    if (element.id === 'home') {
      yPos = 0
    } else {
      yPos = rect.top + window.scrollY - (HEADER_HEIGHT + HEADER_MARGIN) * 16
    }
    window.scrollTo({ top: yPos, behavior: 'smooth' })
  }
}

function Header() {
  const buttons = ['Home', 'About', 'Projects', 'Contact']

  return (
    <Box
      sx={{
        position: 'sticky',
        top: HEADER_MARGIN + 'rem',
        zIndex: 100,
        width: '100%',
      }}
    >
      <Paper
        id="home"
        component="header"
        elevation={10}
        sx={{
          maxWidth: '80rem',
          height: HEADER_HEIGHT + 'rem',
          borderRadius: 2,
          py: 0,
          boxShadow: '0 0 1.5rem rgb(10, 10, 10)',
        }}
      >
        <Grid2
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {buttons.map((button) => (
            <Button
              key={button}
              onClick={() => handleScrollTo(button.toLowerCase())}
              sx={{ height: '100%', px: '1rem', fontSize: '1.25rem', color: 'primary.light' }}
            >
              {button}
            </Button>
          ))}
        </Grid2>
      </Paper>
    </Box>
  )
}

function AvatarCard() {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const AVATAR_SIZE = '20rem'
  const FONT_SIZE = '2.5rem'

  return (
    <Grid2
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
        <Grid2 container gap={2} mt={2}>
          <Button variant="contained" onClick={() => handleScrollTo('projects')}>
            Projects
          </Button>
          <Button variant="contained" onClick={() => handleScrollTo('contact')}>
            Get in Touch
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            <Description />
          </Button>
          <PDFModal open={open} onClose={handleClose} />
        </Grid2>
      </Stack>
    </Grid2>
  )
}

function PDFModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [file, setFile] = React.useState<string>('cv.pdf')
  const [numPages, setNumPages] = React.useState<number>()
  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')) // Matches screens smaller than 'sm'
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'xl')) // Matches 'sm' to 'md'
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl')) // Matches screens larger than 'lg'

  const files = ['cv.pdf', 'transcript.pdf']

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function changeFile() {
    const currentIndex = files.indexOf(file)
    const nextIndex = (currentIndex + 1) % files.length
    setFile(files[nextIndex])
    setPageNumber(1)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          px: 4,
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button disabled={files.indexOf(file) <= 0} onClick={() => changeFile()} sx={{ color: 'white' }}>
            <SkipPrevious fontSize="large" />
          </Button>
          <Typography variant="h2" mt={2}>
            {file === 'cv.pdf' ? 'Resume' : 'Academic Transcript'}
          </Typography>
          <Button
            disabled={files.indexOf(file) >= files.length - 1}
            onClick={() => changeFile()}
            sx={{ width: 'fit-content', color: 'white' }}
          >
            <SkipNext fontSize="large" />
          </Button>
        </Stack>
        <Box sx={{ mb: 2 }}>
          <Document
            file={`./assets/${file}`}
            error={<Typography color="primary.main">Failed to load PDF.</Typography>}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              scale={isSmallScreen ? 0.3 : isMediumScreen ? 0.6 : isLargeScreen ? 0.9 : 1}
            />
          </Document>
        </Box>
        <Stack direction={'row'} sx={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
          <Button disabled={pageNumber <= 1} onClick={() => changePage(-1)} sx={{ color: 'white' }}>
            <KeyboardArrowLeft fontSize="large" />
          </Button>
          <Typography variant="body1" width={'30%'} textAlign={'center'}>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </Typography>
          <Button disabled={pageNumber >= numPages!} onClick={() => changePage(1)} sx={{ color: 'white' }}>
            <KeyboardArrowRight fontSize="large" />
          </Button>
          <Button
            component="a"
            href={`./assets/${file}`}
            download
            variant="contained"
            sx={{
              position: 'absolute',
              bottom: '0',
              right: '0',
            }}
          >
            <FileDownload fontSize="large" />
          </Button>
        </Stack>
      </Paper>
    </Modal>
  )
}

function About() {
  const ICON_STYLE = { fontSize: '5rem', color: 'primary.main' }

  function Section({ children }: { children: React.ReactNode }) {
    return (
      <Stack direction={'row'} spacing={5} alignItems={'center'}>
        {children}
      </Stack>
    )
  }

  function Bold({ children }: { children: string }) {
    return (
      <Typography component="span" sx={{ color: 'primary.light', fontWeight: 'bold' }}>
        {children}
      </Typography>
    )
  }

  return (
    <Paper
      id="about"
      sx={{
        height: 'fit-content',
        px: '3rem',
      }}
    >
      <Stack spacing={5}>
        <Box>
          <Typography variant="h2">About</Typography>
          <Grid2 container spacing={3}>
            <Section>
              <DataObject sx={ICON_STYLE} />
              <Typography textAlign={'left'}>
                An aspiring Software Developer with a focus on <Bold>backend web development</Bold>. My passion in
                technology and programming began at a young age, building my first <Bold>Snake</Bold> game using Python
                in 2018. Since then, I am fueled by a <Bold>desire to understand</Bold> the intricacies of software and
                its potential to provide <Bold>effective solutions</Bold>. I am committed to placing people at the heart
                of every project, ensuring that my software makes a <Bold>real difference</Bold> in their lives.
              </Typography>
            </Section>
            <Section>
              <School sx={ICON_STYLE} />
              <Typography textAlign={'left'}>
                During my studies at the <Bold>University of Auckland</Bold>, I gained a strong foundation in web
                development, utilising technologies like <Bold>Python, TypeScript, and React</Bold>. I am a
                self-motivated learner with proven <Bold>problem-solving skills</Bold> in debugging and optimizing web
                applications, and I <Bold>quickly adapt</Bold> to new technologies (e.g., AWS, SendGrid). I also excel
                in <Bold>collaborative settings</Bold>, demonstrating strong communication and teamwork abilities.
              </Typography>
            </Section>
            <Section>
              <VideogameAsset sx={ICON_STYLE} />
              <Typography textAlign={'left'}>
                When I am not coding, I enjoy <Bold>playing video games</Bold> with my friends to unwind. I also have a
                keen interest in <Bold>all things technology</Bold>, particularly computer hardware and mobile phones. I
                am a <Bold>gym enthusiast</Bold>, regularly working out and focusing on fitness through cooking
                high-protein meals and experimenting with new recipes. I also love <Bold>looking at cars</Bold> I cannot
                afford online. I enjoy <Bold>exploring new technologies</Bold> and{' '}
                <Bold>experimenting with coding projects</Bold> in my free time.
              </Typography>
            </Section>
          </Grid2>
        </Box>
        {/* TODO: add Work and Skills section */}
        {/* <Box>
          <Typography variant="h2">Work</Typography>
          <Grid2 container spacing={2}>
            <Typography>(display work and experience as a timeline)</Typography>
          </Grid2>
        </Box>
        <Box>
          <Typography variant="h2">Skills</Typography>
          <Grid2 container spacing={2}>
            <Typography>(display skills icon as a sliding carousel)</Typography>
          </Grid2>
        </Box> */}
      </Stack>
    </Paper>
  )
}

function Projects() {
  type ProjectData = {
    id: number
    name: string
    html_url: string
    homepage: string
    pushed_at: string
  }

  const [projects, setProjects] = React.useState<ProjectData[] | string>('')

  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const repositories = await response.json()
        setProjects(repositories)
      } catch (error) {
        console.error('Error fetching repositories:', error)
        setProjects('GitHub API Error')
      }
    }

    fetchProjects()
  }, [])

  const ProjectsList = React.useMemo(() => {
    const CARD_WIDTH = { lg: '32.5rem', md: '55rem', sm: '45rem' }

    function Bold({ children }: { children: string }) {
      return (
        <Typography variant="body2" component="span" sx={{ color: 'primary.light', fontWeight: 'bold' }}>
          {children}
        </Typography>
      )
    }

    const projectsToDisplay = {
      'markit-uoa': {
        displayName: 'Markit-UOA',
        description:
          'A Next.js web application that simplifies the marker application process for students and coordinators. Developed in a team of 6 people for a client in UoA as part of CS399 Capstone.',
        features: [
          <>
            Developed a <Bold>RESTful API</Bold> with Next.js equipped with <Bold>role-based authentication</Bold>,
            authorisation using <Bold>OAuth2</Bold> and <Bold>Zod</Bold> for data validation{' '}
            <Link
              href="https://github.com/ghxstling/markit-uoa/blob/master/docs/API_DOCS.md"
              underline="hover"
              color="primary.main"
            >
              (full docs)
            </Link>
          </>,
          <>
            Utilised <Bold>Amazon S3</Bold> for storing and serving user-uploaded files, including CVs and transcripts
          </>,
          <>
            Implemented <Bold>SendGrid</Bold> for personalised email notifications to users
          </>,
          <>
            Created a <Bold>custom CSV generator</Bold> for offline access to marker applications
          </>,
        ],
      },
      learnquest: {
        displayName: 'LearnQuest',
        description:
          'A minimal LMS application built with Next.js that allows for easy online learning and classroom management. This project showcases my frontend skills and ability to create a user-friendly interface.',
        features: [
          <>
            Utilised <Bold>Tailwind CSS</Bold> and <Bold>ShadCN UI</Bold> to create a minimal and responsive UI
          </>,
          <>
            Integrated <Bold>Convex</Bold> with <Bold>Next.js</Bold> for real-time data fetching and state management
          </>,
          <>
            Applied <Bold>good software practices</Bold> by writing clean & maintainable code
          </>,
        ],
      },
      'pc-part-hunter': {
        displayName: 'PC Part Hunter (WIP)',
        description:
          'An e-commerce/web-scraping Next.js web platform that allows users to search for pricing and stock availability of popular PC parts among NZ retailers. This project demonstrates my full-stack development skills.',
        features: [
          <>
            Utilised <Bold>Playwright</Bold> for web scraping and <Bold>Next.js</Bold> for responsive server-side
            rendering
          </>,
          <>
            Leveraged <Bold>Tailwind CSS</Bold> and <Bold>ShadCN UI</Bold> for a responsive and modern UI
          </>,
          <>
            Implemented <Bold>dark theme toggling</Bold> with <Bold>Next Themes</Bold> for improved user experience
          </>,
        ],
      },
      'shortr-url': {
        displayName: 'Shortr URL (WIP)',
        description: (
          <>
            A simple URL shortener built with Vite and Material UI that utilises the{' '}
            <Link href="https://github.com/spoo-me/url-shortener" target="_blank" underline="hover">
              spoo.me
            </Link>{' '}
            API. This project showcases my understanding of RESTful APIs.
          </>
        ),
        features: [
          <>
            Built with <Bold>Vite</Bold> for fast development & deployment
          </>,
          <>
            Utilised <Bold>REST API</Bold> and <Bold>Fetch API</Bold> to shorten URLs and retrieve original URLs
          </>,
          <>
            (WIP) Implemented <Bold>URL options</Bold> such as custom aliases and password protection
          </>,
        ],
      },
    }

    return Array.isArray(projects) ? (
      projects.map((project: ProjectData) => {
        if (!Object.prototype.hasOwnProperty.call(projectsToDisplay, project.name)) return null
        const projectData = projectsToDisplay[project.name as keyof typeof projectsToDisplay]
        return (
          <Card
            variant="outlined"
            key={project.id}
            sx={{
              width: CARD_WIDTH,
              height: 'auto',
              borderRadius: '1rem',
              position: 'relative',
              p: '1.5rem',
              pb: '7rem',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'scale(1.025)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Stack
              spacing={2}
              sx={{
                textAlign: 'left',
              }}
            >
              <Link href={project.homepage} target="_blank" underline="hover" color="inherit">
                <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
                  <Typography variant="h3">{projectData.displayName}</Typography>
                  <OpenInNew fontSize="medium" />
                </Stack>
              </Link>
              <Box
                component={'img'}
                src={`./assets/${project.name}.png`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0.5rem',
                }}
              />
              <Typography variant="body1">{projectData.description}</Typography>
              <List disablePadding sx={{ listStyleType: 'disc', pl: 3 }}>
                {projectData.features.map((feature, i) => (
                  <li key={i}>
                    <Typography variant="body2" textAlign={'left'}>
                      {feature}
                    </Typography>
                  </li>
                ))}
              </List>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: {
                    lg: '90%',
                    md: '95%',
                    sm: '90%',
                  },
                }}
              >
                <Typography variant="body2" textAlign={'left'} pb={1}>
                  <Bold>Last Updated:</Bold>{' '}
                  {new Date(project.pushed_at).toLocaleDateString('en-NZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </Typography>
                <Link href={project.html_url} target="_blank">
                  <Button variant="contained" fullWidth>
                    <Stack direction={'row'} spacing={1}>
                      <LinkIcon fontSize="medium" />
                      <Typography>View Project</Typography>
                    </Stack>
                  </Button>
                </Link>
              </Box>
            </Stack>
          </Card>
        )
      })
    ) : (
      <Typography variant="body1" color="primary.main">
        {projects}
      </Typography>
    )
  }, [projects])

  return (
    <Paper id="projects">
      <Typography variant="h2">Projects</Typography>
      <Grid2 container spacing={3} justifyContent={'center'} sx={{ mx: '1rem' }}>
        {ProjectsList}
      </Grid2>
    </Paper>
  )
}

function Contact() {
  type Field = string | undefined

  const [fullName, setFullName] = React.useState<Field>(undefined)
  const [email, setEmail] = React.useState<Field>(undefined)
  const [phone, setPhone] = React.useState<Field>(undefined)
  const [body, setBody] = React.useState<Field>(undefined)
  const [message, setMessage] = React.useState<Field>(undefined)
  const [touched, setTouched] = React.useState({
    fullName: false,
    email: false,
    phone: false,
    body: false,
  })

  const TEXTFIELD_WIDTH = 'calc(50% - 0.5rem)'

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setMessage('Submitting...')
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      body: true,
    })

    if (!fullName || !email || !body) {
      setMessage('Please fill out all required fields.')
      return
    }

    const formData = {
      fullName,
      email,
      phone: phone ? phone : 'N/A',
      body,
    }
    const url = `${import.meta.env.VITE_EXPRESS_JS_API_URL}`

    try {
      await fetch(`${url}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json())
      setMessage("Email sent successfully! I'll get back to you as soon as possible.")
    } catch (error) {
      console.log('Error sending email:', error)
      setMessage('Failed to send email. Please try again later.')
    }
  }

  return (
    <Paper id="contact">
      <Box maxWidth={'95%'} sx={{ mx: '1rem', textAlign: 'center' }}>
        <Typography variant="h2">Let's Work Together</Typography>
        <Typography variant="body1">
          Got ideas for your website or interested in working with me? Get in touch!
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} method="POST" autoComplete="off" noValidate>
        <Grid2
          component={Card}
          container
          spacing={2}
          sx={{
            mt: '1rem',
            maxWidth: '50rem',
            p: '1.5rem',
            mx: '1rem',
            justifySelf: 'center',
          }}
        >
          <FormControl error={!fullName} fullWidth>
            <TextField
              id="form-fullname"
              label="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur('fullName')}
            />
            {touched.fullName && !fullName && <FormHelperText>Full Name is required.</FormHelperText>}
          </FormControl>
          <Grid2 container spacing={2} sx={{ width: '100%' }}>
            <FormControl error={!email || !/\S+@\S+\.\S+/.test(email)} sx={{ width: TEXTFIELD_WIDTH }}>
              <TextField
                id="form-email"
                type="email"
                label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {touched.email && (!email || !/\S+@\S+\.\S+/.test(email)) && (
                <FormHelperText>Invalid Email address.</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!phone || !/^[0-9]{9,10}$/.test(phone)} sx={{ width: TEXTFIELD_WIDTH }}>
              <TextField
                id="form-phone"
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur('phone')}
              />
              {touched.phone && phone != '' && phone != null && !/^[0-9]{9,10}$/.test(phone) && (
                <FormHelperText>Please enter a valid phone number (9-10 digits).</FormHelperText>
              )}
            </FormControl>
          </Grid2>
          <FormControl error={!body} fullWidth>
            <TextField
              id="form-content"
              label="Body"
              required
              multiline
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onBlur={() => handleBlur('body')}
            />
            {touched.body && !body && <FormHelperText>Message body is required.</FormHelperText>}
          </FormControl>
          <Button type="submit" variant="contained" sx={{ py: '1rem', mt: '0.5rem', width: '100%' }}>
            Contact Me
          </Button>
          {message && (
            <Typography
              variant="body2"
              color="primary.main"
              sx={{
                maxWidth: '100%',
                wordWrap: 'break-word',
              }}
            >
              {message}
            </Typography>
          )}
        </Grid2>
      </Box>
    </Paper>
  )
}

function Footer() {
  const offset = {
    popper: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, -10],
          },
        },
      ],
    },
  }

  return (
    <Box component="footer" pb={5}>
      <Stack direction="row" spacing={1.5} justifyContent={'center'}>
        <Link href="https://github.com/ghxstling" target="_blank">
          <Tooltip title="GitHub" placement="top" slotProps={offset}>
            <GitHub fontSize={ICON_SIZE} />
          </Tooltip>
        </Link>
        <Link href="https://www.linkedin.com/in/dylan-choy/" target="_blank">
          <Tooltip title="LinkedIn" placement="top" slotProps={offset}>
            <LinkedIn fontSize={ICON_SIZE} />
          </Tooltip>
        </Link>
        <Link href="https://www.instagram.com/doodlyn_" target="_blank">
          <Tooltip title="Instagram" placement="top" slotProps={offset}>
            <Instagram fontSize={ICON_SIZE} />
          </Tooltip>
        </Link>
      </Stack>
      <Typography variant="body2" textAlign={'center'}>
        {'Copyright © '}
        {new Date().getFullYear()}
        {' Dylan Choy'}
      </Typography>
    </Box>
  )
}
