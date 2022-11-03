import { createTheme, Theme } from '@mui/material/styles'
import { createBreakpoints } from '@mui/system'
import palette from './palette'

const breakpoints = createBreakpoints({})

const {
  spacing,
  breakpoints: { up, down, values },
} = createTheme()

export const theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1300,
      xl: 1920,
    },
  },
  palette,
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          minHeight: 50,
          height: 50,
          '&:hover': {
            backgroundColor: palette.primary.contrastText,
          },
          '&.Mui-focused': {
            backgroundColor: palette.primary.contrastText,
          },
          '&.Mui-disabled': {
            backgroundColor: palette.primary.contrastText,
          },
        },
        input: {
          fontSize: 16,
          '&:-internal-autofill-selected': {
            background: 'transparent',
            '-webkit-box-shadow': 'inset 0 0 0 50px #ffffff!important',
            '-webkit-text-fill-color': '#000000!important',
          },
          '&:-webkit-autofill': {
            background: 'transparent',
            '-webkit-box-shadow': 'inset 0 0 0 50px #ffffff!important',
            '-webkit-text-fill-color': '#000000!important',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
        shrink: {
          fontSize: 11,
          transform: 'translate(13px, 0)',
        },
        filled: {
          fontWeight: 400,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          fontSize: 16,
          minHeight: 45,
          fontWeight: 400,
          borderRadius: 4,
          transition: '.2s',
          '&:hover': {
            backgroundColor: `${palette.primary.main}!important`,
          },
          '&.Mui-disabled': {
            opacity: '.8',
            color: `${palette.text.disabled}!important`,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: 11,
          marginLeft: 5,
          marginTop: 0,
          color: palette.error.main,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          flexWrap: 'nowrap',
          fontSize: 14,
          fontWeight: 400,
          borderRadius: 4,
          alignItems: 'center',
          lineHeight: 1.25,
          textAlign: 'center',
          boxShadow: 'none',
          backgroundColor: '#E6E6FA',
        },
        message: {
          flex: '0 0 100%',
          fontWeight: 400,
        },
      },
    },
  },
})
