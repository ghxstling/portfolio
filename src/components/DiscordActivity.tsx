import { useState, Suspense, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'
import { constructDiscordAuthUrl } from './helper/functions'

export function DiscordActivity() {
  const [loaded, setLoaded] = useState(false)
  const [activity, setActivity] = useState<string>('')

  useEffect(() => {
    async function triggerDiscordAuth() {
      const authUrl = constructDiscordAuthUrl()
      window.location.href = authUrl
    }

    async function fetchActivity() {
      try {
        triggerDiscordAuth()
        const response = await fetch('https://discord.com/api/v10/users/@me/activities', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer',
            'User-Agent': 'DiscordBot',
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        setActivity(data[0]?.name || 'No activity')
      } catch (error) {
        console.error('Error fetching Discord activity:', error)
        // TODO: UNDO THIS AFTER TESTING
        setActivity('ERROR')
        // setLoaded(false)
      }
    }

    // TODO: UNDO THIS AFTER TESTING
    setLoaded(true)
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
            {activity}
          </Typography>
        </Suspense>
      </Stack>
    </Paper>
  )
}
