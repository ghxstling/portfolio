import { useState, Suspense, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { getApiUrl, parseImageUrl } from './helper/functions'
import { PresenceData } from '../lib/types'

export function DiscordActivity() {
  const [activity, setActivity] = useState<PresenceData | null>(null)

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
        setActivity(data.presence)
      } catch (error) {
        console.error('fetchActivity() - Error fetching data:', error)
      }
    }

    fetchActivity()
  }, [])

  const myActivity = activity?.activity

  const typeMap: Record<number, string> = {
    0: 'Playing',
    2: 'Listening to',
    3: 'Watching',
  }

  const statusMap: Record<string, [string, string]> = {
    online: ['Online', '#6fbf73'],
    idle: ['Idle', '#ff9800'],
    dnd: ['Do Not Disturb', '#aa2e25'],
    offline: ['Offline', 'grey'],
  }

  const status = statusMap[activity?.status || 'offline']
  const type = typeMap[myActivity?.type ?? -1] || ''
  const largeImg = parseImageUrl(myActivity?.assets?.largeImage)
  const smallImg = parseImageUrl(myActivity?.assets?.smallImage)

  if (!activity) return null

  return (
    <Suspense>
      <Stack gap={1} width={'100%'}>
        <Typography
          variant="h4"
          fontWeight={600}
          fontSize={'1.1rem'}
          sx={{
            textDecoration: 'underline',
            textUnderlineOffset: '0.15rem',
          }}
        >
          My Current Discord Activity
        </Typography>
        <Paper
          component={Card}
          sx={{
            p: 1,
            borderRadius: 2,
            textAlign: 'left',
            pb: smallImg ? 1.5 : 1,
          }}
        >
          <Grid container gap={0.5} position={'relative'}>
            <Box width={'100%'}>
              <Box display={'flex'} gap={0.5} alignItems={'center'}>
                <Text listText="Status">{status[0]}</Text>
                <Box bgcolor={status[1]} width={'0.8rem'} height={'0.8rem'} borderRadius={'1rem'} />
              </Box>
              <Text listText={type}>{myActivity?.name}</Text>
            </Box>

            {largeImg && (
              <Box
                component={'img'}
                src={largeImg}
                width={'25%'}
                height={'100%'}
                borderRadius={1}
                alignSelf={'center'}
                boxShadow={5}
              />
            )}
            {smallImg && (
              <Box
                component={'img'}
                src={smallImg}
                width={'10%'}
                position={'absolute'}
                left={'17.5%'}
                bottom={-5}
                borderRadius={10}
                boxShadow={10}
              />
            )}
            <Box ml={smallImg ? 1 : 0.5} maxWidth={'70%'}>
              <Text
                listText={myActivity?.type === 2 ? 'Title' : undefined}
                sx={{
                  wordWrap: 'break-word',
                  whiteSpace: 'normal',
                }}
              >
                {myActivity?.details}
              </Text>
              <Text
                listText={myActivity?.type === 2 ? 'Artist' : undefined}
                sx={{
                  wordWrap: 'break-word',
                  whiteSpace: 'normal',
                }}
              >
                {myActivity?.state}
              </Text>
            </Box>
          </Grid>
        </Paper>
      </Stack>
    </Suspense>
  )
}

function Text({
  children,
  listText,
  sx,
  ...props
}: { children: React.ReactNode; listText?: string; sx?: object } & React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      variant="body2"
      sx={{
        fontSize: '0.9rem',
        ...sx,
      }}
      {...props}
    >
      {listText && <span style={{ fontWeight: 600 }}>{listText + ': '}</span>}
      {children}
    </Typography>
  )
}
