import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { handleScrollTo } from './helper/functions'

export const HEADER_HEIGHT = 3.5
export const HEADER_MARGIN = 1.5

export function Header() {
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
      <Card
        id="home"
        component="header"
        sx={{
          maxWidth: '80rem',
          height: HEADER_HEIGHT + 'rem',
          bgcolor: '#212121',
          borderRadius: 2,
          py: 0,
          boxShadow: '0 0 1.5rem rgb(10, 10, 10)',
        }}
      >
        <Grid
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
        </Grid>
      </Card>
    </Box>
  )
}
