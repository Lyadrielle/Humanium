import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'rodal/lib/rodal.css';
import { isMobile } from 'react-device-detect';

import Menu from './containers/Menu';
import Home from './containers/Home';
import MenuFilm from './containers/MenuFilm';
import Film from './containers/Film';
import Project from './containers/Project';
import Tuto from './containers/Tuto';
import Team from './containers/Team';
import PageQTE from './containers/pageQTE';
import PageChoice from './containers/pageChoice';
import TreeContainer from './containers/TreeContainer';
import MobileGuard from './containers/MobileGuard'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
      keepVisible: false,
      isLandscape: false
    };
  }

  orientationChangeHandler = () => {
    var isLandscape = window.screen.orientation.type.startsWith('landscape');
    this.setState({isLandscape: isLandscape})
  };

  initOrientation = () => {
    this.orientationChangeHandler()

    window.screen.orientation.addEventListener(
      'change',
      this.orientationChangeHandler
    );
  };

  componentDidMount() {
    this.initOrientation()
  }

  renderApp = () => {
    if (isMobile && !this.state.isLandscape) {
      return (
        <div className="app">
          <MobileGuard message={MobileGuard.messages.orientation}/>
        </div>
      )
    }
    return (
      <Router>
        <div className="app">
          <Menu />
          <Route path="/" exact component={Home} />
          <Route path="/intro" exact component={MenuFilm} />
          <Route path="/film" exact component={Film} />
          <Route path="/project" exact component={Project} />
          <Route path="/tuto" exact component={Tuto} />
          <Route path="/team" exact component={Team} />
          <Route path="/qte" exact component={PageQTE} />
          <Route path="/choice" exact component={PageChoice} />
          <Route path="/tree" exact component={TreeContainer} />
        </div>
      </Router>
    );
  };

  render() {
    return this.renderApp();
  }
}

export default App;
