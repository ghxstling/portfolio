import { useState, useEffect, Suspense, useMemo } from 'react'

import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import List from '@mui/material/List'

import CircularProgress from '@mui/material/CircularProgress'

import LinkIcon from '@mui/icons-material/Link'
import OpenInNew from '@mui/icons-material/OpenInNew'

import { ProjectData } from '../lib/types'
import { getApiUrl } from './helper/functions'

function Projects() {
  const [projects, setProjects] = useState<ProjectData[] | string>('')

  useEffect(() => {
    // TODO: create an endpoint to fetch projects from the server rather than the client
    async function fetchProjects() {
      try {
        const url = getApiUrl('/api/projects')
        const response = await fetch(url)

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

  const ProjectsList = useMemo(() => {
    const CARD_WIDTH = { lg: '45%', md: '95%', sm: '45rem' }

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
            key={project.id}
            variant="outlined"
            sx={{
              width: CARD_WIDTH,
              height: 'auto',
              borderRadius: '1rem',
              position: 'relative',
              p: '1.5rem',
              pb: {
                sm: '7rem',
                xs: '8.5rem',
              },
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'scale(1.025)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Suspense fallback={<CircularProgress />}>
              <Stack
                spacing={2}
                sx={{
                  textAlign: 'left',
                }}
              >
                {/* Project Display Title */}
                <Link href={project.homepage} target="_blank" underline="hover" color="inherit">
                  <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="h3">{projectData.displayName}</Typography>
                    <OpenInNew fontSize="medium" />
                  </Stack>
                </Link>
                {/* Project Image */}
                <Box
                  component={'img'}
                  src={`./assets/${project.name}.png`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '0.5rem',
                  }}
                />
                {/* Project Description */}
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
                {/* Project Footer */}
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
                      xs: '90%',
                    },
                  }}
                >
                  {/* Project Last Updated */}
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
                  {/* Project View Project Button */}
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
            </Suspense>
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
      <Grid
        container
        spacing={{ md: 3, sm: 2, xs: 1 }}
        justifyContent={'center'}
        sx={{
          mx: {
            lg: '-1rem',
            md: '0.5rem',
            sm: '1rem',
            xs: '1rem',
          },
        }}
      >
        {ProjectsList}
      </Grid>
    </Paper>
  )
}

export default Projects
