import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { isMobile } from 'react-device-detect';
import 'rodal/lib/rodal.css'

import Menu from './containers/Menu'
import Home from './containers/Home'
import Film from './containers/Film'
import Project from './containers/Project'
import Team from './containers/Team'
import PageQTE from './containers/pageQTE'
import PageChoice from './containers/pageChoice'
import TreeContainer from './containers/TreeContainer'
import MobileGuard from './containers/MobileGuard';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'showMenu': true,
      'keepVisible': false
    }
  }

  renderApp = () => {
    if (isMobile) {
      return (
        <div className="app">
          <MobileGuard/>
        </div>
      )
    }
    return (
      <Router>
        <div className="app">
          <Menu />
          <Route path="/" exact component={Home} />
          <Route path="/film" exact component={Film} />
          <Route path="/project" exact component={Project} />
          <Route path="/team" exact component={Team} />
          <Route path="/qte" exact component={PageQTE} />
          <Route path="/choice" exact component={PageChoice} />
          <Route path="/tree" exact component={TreeContainer} />

        </div>
      </Router>
    )
  }

  render() {
    return this.renderApp();
  }
}

export default App