import { ReactNode } from 'react'

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Grid2'
import Box from '@mui/material/Box'

import DataObject from '@mui/icons-material/DataObject'
import VideogameAsset from '@mui/icons-material/VideogameAsset'
import School from '@mui/icons-material/School'

export function About() {
  const ICON_STYLE = { fontSize: '5rem', color: 'primary.main' }

  function Section({ children }: { children: ReactNode }) {
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
