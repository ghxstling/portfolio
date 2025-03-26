import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: ['"Poppins"', 'sans-serif'].join(','),
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      paddingBottom: '1rem',
    },
    body1: {
      fontSize: '1.25rem',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
})
