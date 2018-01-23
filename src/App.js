import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Menu from './containers/Menu'
import Home from './containers/Home'
import Film from './containers/Film'
import Project from './containers/Project'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu/>
          <Route path="/" exact component={Home} />
          <Route path="/film" exact component={Film} />
          <Route path="/project" exact component={Project} />
        </div>
      </Router>
    )}
}

export default App
