import { useState, Suspense, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

export function DiscordActivity() {
  const [loaded, setLoaded] = useState(false)
  const [activity, setActivity] = useState<string>('')

  useEffect(() => {
    //TODO: create a function that fetches the activity from discord.js

    // TODO: remove setLoaded(true) when in production
    setLoaded(true)
  }, [])

  if (!loaded) return null

  return (
    <Paper
      component={Card}
      sx={{
        width: '100%',
        height: '7.5rem',
        p: 2,
        mt: 1.5,
      }}
    >
      <Stack>
        <Typography variant="body1" textAlign={'left'}>
          what am i doing rn?
        </Typography>
        <Suspense fallback={<CircularProgress />}>
          <Typography variant="body2" textAlign={'left'}>
            {activity}
          </Typography>
        </Suspense>
      </Stack>
    </Paper>
  )
}
