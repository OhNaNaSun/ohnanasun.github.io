import { ThemeProvider, createTheme } from '@material-ui/core/styles';
export const theme = createTheme({
  typography: {
    fontSize: 17,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#272c34',
        },
        '*': {
          fontFamily:
            '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
        },
        a: {
          color: 'rgb(83, 155, 245)',
          fontWeight: 600,
          lineHeight: '21px',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: '1.3rem',
      },
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#212121',
      // main: '#272c34',
    },
    text: { primary: '#adbac7' },
    secondary: {
      main: '#90caf9',
    },
    background: {
      paper: '#272c34',
    },
  },
});
