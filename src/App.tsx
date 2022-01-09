import React, { Suspense } from 'react'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import PageHeader from 'components/PageHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import './css/markdown-body.css'

const EditPage = React.lazy(() => import('./page/EditPage'))

const QuestionPage = React.lazy(() => import('./page/Question'))

const Home = React.lazy(() => import('./page/Home'))

const App: React.FC = () => {
  const theme = createTheme({
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
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper>
        <Router>
          <PageHeader />
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}
export default App
