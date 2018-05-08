import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router'
import ImageButton from "../../components/ImageButton";
import api from '../../common/api'
import "./style.css";

class MenuFilm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFirstTime: null
    }
  }

  async isFirstTime() {
    const context = localStorage.getItem('context')
    let firstTime = true
    if (context) {
      const { success, status, nodes } = await api.get({ path: 'tree/read-path', headers: { context } })
      if (success && nodes.length > 1) {
        firstTime = false
      }
    }
    this.setState({isFirstTime: firstTime})
  }

  componentDidMount() {
    this.isFirstTime()
  }

  render() {
    if (this.state && this.state.isFirstTime == true) {
      return <Redirect to="/film"/>
    } else if (this.state && this.state.isFirstTime == false) {
      return (
        <div className="menu-film">
          <div className="row-menu">
            <div className="play-button">
              <ImageButton
                className="play-image-button"
                onClick={() => this.props.history.push("/film")}
                src="./assets/images/logo.svg"
                alt="bouton logo"
              />
              <a
                className="play-button-text"
                onClick={() => this.props.history.push("/film")}
              >
                Démarrer / Reprendre
              </a>
            </div>
            <div className="tree-button">
              <ImageButton
                className="tree-image-button"
                onClick={() => this.props.history.push("/tree")}
                src="./assets/images/logo.svg"
                alt="bouton logo"
              />
              <a
                className="tree-button-text"
                onClick={() => this.props.history.push("/tree")}
              >
                Arbre de choix
              </a>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="menu-film"/>
    )
  }
}

export default withRouter(MenuFilm);
