import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import PageHeader from 'components/PageHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Home from './pages/Home'
import Docs from './pages/Doc'
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
          <Switch>
            <Route path="/:category/:fileId">
              <EditPage />
            </Route>
            <Route path="/question" exact>
              <PageHeader />
              <Container>
                <QuestionPage />
              </Container>
            </Route>
            <Route path="/:fileId">
              <PageHeader />
              <Container>
                <Docs />
              </Container>
            </Route>
            <Route path="/">
              <PageHeader />
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
