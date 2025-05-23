import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { pink } from '@mui/material/colors'

const PAPER_PADDING_Y = '2rem'

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: pink,
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
      paddingBottom: '1.5rem',
      textDecoration: 'underline',
      textUnderlineOffset: '0.25rem',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.25rem',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 5,
      },
      styleOverrides: {
        root: {
          textAlign: 'center',
          paddingTop: PAPER_PADDING_Y,
          paddingBottom: PAPER_PADDING_Y,
          borderRadius: '1rem',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
})

theme = responsiveFontSizes(theme, {
  factor: 3,
  variants: ['h1', 'h2', 'h3', 'body1', 'body2'],
})

export default theme
