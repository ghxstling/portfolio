import { useState, Suspense, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

import { getApiUrl } from './helper/functions'
import { PresenceData } from '../lib/types'

export function DiscordActivity() {
  // TODO: set this to false when in production
  const [loaded, setLoaded] = useState(true)
  const [activity, setActivity] = useState<PresenceData | string>('')

  useEffect(() => {
    async function fetchActivity() {
      try {
        const url = getApiUrl('/api/discord/my-activity')
        const res = await fetch(`${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        console.log(data)
        setActivity(data)
        setLoaded(true)
      } catch (error) {
        setActivity('Error fetching activity')
        setLoaded(false)
        console.error('fetchActivity() - Error fetching data:', error)
      }
    }

    fetchActivity()
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
            {typeof activity === 'string' ? activity : JSON.stringify(activity)}
          </Typography>
        </Suspense>
      </Stack>
    </Paper>
  )
}
