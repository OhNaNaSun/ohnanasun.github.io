import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import PageHeader from 'components/PageHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Home from './pages/Home'
import QuestionPage from './pages/Question'
import EditPage from './pages/EditPage'
import './css/markdown-body.css'

const App: React.FC = () => {
  const theme = createMuiTheme({
    typography: {
      fontSize: 16,
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
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper>
        <Router>
          <PageHeader />
          <Switch>
            <Route path="/:category/:fileId">
              <EditPage />
            </Route>
            <Route path="/question" exact>
              <Container>
                <QuestionPage />
              </Container>
            </Route>
            <Route path="/" exact>
              <Container>
                <Home />
              </Container>
            </Route>
          </Switch>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}
export default App
