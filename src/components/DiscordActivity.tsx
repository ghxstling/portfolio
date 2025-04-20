import { useState, Suspense, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CircularProgress } from '@mui/material'

export function DiscordActivity() {
  const [loaded, setLoaded] = useState(false)
  const [activity, setActivity] = useState<string>('')

  const fetchActivity = async () => {
    const response = await fetch('https://discord.com/api/v10/users/@me/activities', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_DISCORD_TOKEN}`,
      },
    })
    const data = await response.json()
    setActivity(data[0]?.name || 'No activity')
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true)
    }, 1000)

    return () => clearTimeout(timeout)
  })

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
            (doing something other than assignments){' '}
          </Typography>
        </Suspense>
      </Stack>
    </Paper>
  )
}
