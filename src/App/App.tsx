import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import Page from './Page'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:fileId">
          <Page />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
export default App
