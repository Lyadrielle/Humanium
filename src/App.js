import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Menu from './containers/Menu'
import Home from './containers/Home'
import Film from './containers/Film'
import FilmTest from './containers/FilmTest'
import Project from './containers/Project'
import Team from './containers/Team'
import PageQTE from './containers/pageQTE'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Menu/>
          <Route path="/" exact component={Home} />
          <Route path="/film" exact component={Film} />
          <Route path="/filmtest" exact component={FilmTest} />
          <Route path="/project" exact component={Project} />
          <Route path="/team" exact component={Team} />
          <Route path="/qte" exact component={PageQTE} />
        </div>
      </Router>
    )}
}

export default App
