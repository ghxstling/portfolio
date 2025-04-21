import { useState, useMemo } from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import { handleScrollTo } from './helper/functions'
import theme from '../css/theme'

export const HEADER_HEIGHT = 3.5
export const HEADER_MARGIN = 1.5

export function Header() {
  const [opened, setOpened] = useState(false)
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const handleMenuClick = () => {
    setOpened((prev: boolean) => !prev)
  }

  const handleMenuClickMobile = () => {
    setOpened(false)
  }

  const CARD_STYLE = useMemo(() => {
    return {
      bgcolor: '#212121',
      borderRadius: 2,
      py: 0,
      mx: '1rem',
      boxShadow: '0 0 1.5rem rgb(10, 10, 10)',
    }
  }, [])

  const buttons = useMemo(() => {
    return ['Home', 'About', 'Projects', 'Contact']
  }, [])

  const ButtonList = useMemo(() => {
    return buttons.map((button) => (
      <Button
        key={button}
        onClick={() => handleScrollTo(button.toLowerCase())}
        sx={{ height: '100%', px: '1rem', fontSize: '1.25rem', color: 'primary.light' }}
      >
        {button}
      </Button>
    ))
  }, [buttons])

  const ButtonListMobile = useMemo(() => {
    const handleScrollToMobile = (id: string) => {
      handleScrollTo(id)
      handleMenuClickMobile()
    }

    return buttons.map((button, i) => (
      <Box key={button}>
        <Button
          onClick={() => handleScrollToMobile(button.toLowerCase())}
          sx={{
            color: 'primary.light',
            py: 1,
          }}
        >
          {button}
        </Button>
        {i != buttons.length - 1 && <Divider />}
      </Box>
    ))
  }, [buttons])

  const MobileView = useMemo(() => {
    return (
      <Collapse in={opened} collapsedSize={`${HEADER_HEIGHT}rem`} timeout={100}>
        <Card id="home" sx={{ ...CARD_STYLE, display: isSmall ? 'block' : 'none' }}>
          <Stack>
            <Button
              onClick={handleMenuClick}
              fullWidth
              sx={{
                color: 'primary.light',
                gap: '0.5rem',
                py: 1,
              }}
            >
              {!opened ? (
                <>
                  <MenuIcon />
                  Menu
                </>
              ) : (
                <>
                  <CloseIcon />
                  Close
                </>
              )}
            </Button>
            {opened && (
              <Card id="home" sx={{ py: 0, borderRadius: '0px 0px 8px 8px', boxShadow: 'none' }}>
                <Stack direction={'column'}>{ButtonListMobile}</Stack>
              </Card>
            )}
          </Stack>
        </Card>
      </Collapse>
    )
  }, [ButtonListMobile, CARD_STYLE, isSmall, opened])

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: HEADER_MARGIN + 'rem',
        zIndex: 100,
        width: '100%',
      }}
    >
      {/* Desktop (lg) View */}
      {!isSmall && (
        <Card id="home" sx={CARD_STYLE}>
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {ButtonList}
          </Grid>
        </Card>
      )}

      {/* Mobile (xs) View */}
      {isSmall && MobileView}
    </Box>
  )
}
