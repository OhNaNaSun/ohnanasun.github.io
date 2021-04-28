import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import PageHeader from 'components/PageHeader'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Questions from './pages/Questions'

const AppRoute: React.FC = () => {
  return (
    <Router>
      <PageHeader />
      <Switch>
        <Route path="/question">
          <Questions />
        </Route>
        <Route path="/:fileId">
          <Docs />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
export default AppRoute
