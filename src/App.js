import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Menu from './containers/Menu'
import Home from './containers/Home'
import Film from './containers/Film'
import Project from './containers/Project'
import Team from './containers/Team'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Menu/>
          <Route path="/" exact component={Home} />
          <Route path="/film" exact component={Film} />
          <Route path="/project" exact component={Project} />
          <Route path="/team" exact component={Team} />

        </div>
      </Router>
    )}
}

export default App
