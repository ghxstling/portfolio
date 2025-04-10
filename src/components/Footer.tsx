import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Instagram from '@mui/icons-material/Instagram'

export function Footer() {
  const ICON_SIZE = 'large'

  return (
    <Box component="footer" pb={5}>
      <Stack direction="row" spacing={1.5} justifyContent={'center'}>
        <Link href="https://github.com/ghxstling" target="_blank">
          <Tooltip title="GitHub" placement="top">
            <GitHub fontSize={ICON_SIZE} />
          </Tooltip>
        </Link>
        <Link href="https://www.linkedin.com/in/dylan-choy/" target="_blank">
          <Tooltip title="LinkedIn" placement="top">
            <LinkedIn fontSize={ICON_SIZE} />
          </Tooltip>
        </Link>
        <Link href="https://www.instagram.com/doodlyn_" target="_blank">
          <Tooltip title="Instagram" placement="top">
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
