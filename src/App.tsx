import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import PageHeader from 'components/PageHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Home from './pages/Home'
import Docs from './pages/Doc'
import Questions from './pages/Questions'
import EditPage from './pages/EditPage'

const App: React.FC = () => {
  const theme = createMuiTheme({
    typography: {
      fontSize: 16,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
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
      },
      secondary: {
        main: '#455a64',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper>
        <Router>
          <PageHeader />
          <Container>
            <Switch>
              <Route path="/edit" exact>
                <EditPage />
              </Route>
              <Route path="/question" exact>
                <Questions />
              </Route>
              <Route path="/:fileId">
                <Docs />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}
export default App
