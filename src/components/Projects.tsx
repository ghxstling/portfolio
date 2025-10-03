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

import { getApiUrl } from './helper/functions'

type RepoData = {
  id: number
  name: string
  html_url: string
  homepage: string
  pushed_at: string
}

type Project = {
  name: string
  title: string
  description: string | React.ReactNode
  features: React.ReactNode[]
  showUrl: boolean
}

export function Projects() {
  const [repos, setRepos] = useState<RepoData[] | React.ReactNode>('')

  useEffect(() => {
    async function fetchProjects() {
      try {
        const url = getApiUrl('/api/projects')
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const repositories = await response.json()
        setRepos(repositories.data)
      } catch (error) {
        console.error(`Error fetching repositories: ${error}. Defaulting to fallback text...`)
        setRepos(
          <>
            Something went wrong with fetching projects from GitHub. You may view my projects{' '}
            <Link href="https://github.com/ghxstling">
              <strong>here</strong>
            </Link>
            .
          </>
        )
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

    const projects: Project[] = [
      {
        name: 'house-of-berry',
        title: 'House of Berry',
        description:
          "The official website for House of Berry, an Auckland-based matcha business. Currently leading the project as the Project Manager and Technical Lead for a team of 4 developers to bring the client's vision to life.",
        features: [
          <>
            Developed using <Bold>Next.js</Bold> and <Bold>Tailwind CSS</Bold> for a fast and responsive user experience
          </>,
          <>
            Facilitated <Bold>weekly meetings</Bold> with the development team to <Bold>assign tasks</Bold>, provide{' '}
            <Bold>technical knowledge on tools</Bold>, and address any <Bold>challenges</Bold>
          </>,
          <>
            Coordinated with the <Bold>client</Bold> to <Bold>gather requirements</Bold>, provide updates, and ensure
            the project meets their <Bold>expectations</Bold>
          </>,
          <>
            Reviewed <Bold>code submissions</Bold> via pull requests for <Bold>quality assurance</Bold> and{' '}
            <Bold>best practices</Bold>
          </>,
        ],
        showUrl: true,
      },
      {
        name: 'dolce-vita-weddings',
        title: 'Dolce Vita Weddings',
        description:
          'The official website for Dolce Vita Weddings, an Auckland-based wedding content creation business. Currently the sole developer for this project. Collaborating closely with the client to ensure their vision is realised.',
        features: [
          <>
            Developed using <Bold>Next.js</Bold> and <Bold>Tailwind CSS</Bold> for a fast and responsive user experience
          </>,
          <>
            Integrated <Bold>PayloadCMS</Bold> for simplified content management and updates for the client
          </>,
          <>
            Leveraged <Bold>Vercel Blob</Bold> for efficient image storage and delivery in conjunction with PayloadCMS
          </>,
          <>
            Engaged in <Bold>regular communication</Bold> with the client for <Bold>feedback</Bold> and{' '}
            <Bold>requirements</Bold>
          </>,
        ],
        showUrl: true,
      },
      {
        name: 'markit-uoa',
        title: 'Markit-UOA',
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
        showUrl: false,
      },
      {
        name: 'learnquest',
        title: 'LearnQuest',
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
        showUrl: false,
      },
      // !!! OLD PROJECTS !!!
      // 'pc-part-hunter': {
      //   displayName: 'PC Part Hunter (WIP)',
      //   description:
      //     'An e-commerce/web-scraping Next.js web platform that allows users to search for pricing and stock availability of popular PC parts among NZ retailers. This project demonstrates my full-stack development skills.',
      //   features: [
      //     <>
      //       Utilised <Bold>Playwright</Bold> for web scraping and <Bold>Next.js</Bold> for responsive server-side
      //       rendering
      //     </>,
      //     <>
      //       Leveraged <Bold>Tailwind CSS</Bold> and <Bold>ShadCN UI</Bold> for a responsive and modern UI
      //     </>,
      //     <>
      //       Implemented <Bold>dark theme toggling</Bold> with <Bold>Next Themes</Bold> for improved user experience
      //     </>,
      //   ],
      // },
      // 'shortr-url': {
      //   displayName: 'Shortr URL (WIP)',
      //   description: (
      //     <>
      //       A simple URL shortener built with Vite and Material UI that utilises the{' '}
      //       <Link href="https://github.com/spoo-me/url-shortener" target="_blank" underline="hover">
      //         spoo.me
      //       </Link>{' '}
      //       API. This project showcases my understanding of RESTful APIs.
      //     </>
      //   ),
      //   features: [
      //     <>
      //       Built with <Bold>Vite</Bold> for fast development & deployment
      //     </>,
      //     <>
      //       Utilised <Bold>REST API</Bold> and <Bold>Fetch API</Bold> to shorten URLs and retrieve original URLs
      //     </>,
      //     <>
      //       (WIP) Implemented <Bold>URL options</Bold> such as custom aliases and password protection
      //     </>,
      //   ],
      // },
    ]

    return Array.isArray(repos) ? (
      projects.map((proj) => {
        const repo = repos.find((p) => p.name === proj.name)
        if (!repo) return null

        return (
          <Card
            key={repo.id}
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
                {proj.showUrl ? (
                  <Link href={repo.homepage} target="_blank" underline="hover" color="inherit">
                    <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
                      <Typography variant="h3">{proj.title}</Typography>
                      <OpenInNew fontSize="medium" />
                    </Stack>
                  </Link>
                ) : (
                  <Typography variant="h3" textAlign={'center'}>
                    {proj.title}
                  </Typography>
                )}
                {/* Project Image */}
                <Box
                  component={'img'}
                  src={`./assets/${repo.name}.png`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '0.5rem',
                  }}
                />
                {/* Project Description */}
                <Typography variant="body1">{proj.description}</Typography>
                <List disablePadding sx={{ listStyleType: 'disc', pl: 3 }}>
                  {proj.features.map((feature, i) => (
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
                    {new Date(repo.pushed_at).toLocaleDateString('en-NZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Typography>
                  {/* Project View Project Button */}
                  <Link href={repo.html_url} target="_blank">
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
        {repos}
      </Typography>
    )
  }, [repos])

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
