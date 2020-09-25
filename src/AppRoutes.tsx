import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import Docs from './Pages/Docs'

const AppRoute: React.FC = () => {
  return (
    <Router>
      <Switch>
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
