import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Rodal from 'rodal'

import './style.css'



class TreeModal extends Component {
  getCamelCaseArray = (camel) => {
    const result = camel.replace(/([A-Z])/g, " $1")
    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  render() {
    const { show, proceed, dismiss, cancel, confirmation, options } = this.props
    const popUpWidth = (window.innerWidth / 3) >= 400
      ? (window.innerWidth / 3)
      : 500
    
      const popUpHeight = (window.innerHeight / 2) >= 300
      ? (window.innerHeight / 2.5)
      : 300

    return (
      <Rodal visible={show}
        onClose={() => cancel()}
        closeMaskOnClick={false}
        animation="zoom" duration={200}
        width= {popUpWidth}
        height= {popUpHeight}
      >
        <div className="header">
          <div>
            <img className="logo-small" src="./assets/images/logo.svg" alt="logo humanium" />
            <h5>Reprendre la lecture</h5>
          </div>
        </div>
        <div className="body body-tree">
          Vous êtes sur le point de vous rendre au moment suivant de l'histoire : <br></br>

          <div className ="picture-stats-container">
          <img className="thumbnail" src={"./assets/images/tree/" + options.node.video + ".jpg"} alt="thumbnail" />
              {options.percentage?<p><span className="percentage">{Math.round(options.percentage)}%</span> <br/>
              {options.node.type ==='QTE'&&' des joueurs ont obtenu le même résultat'}
              {options.node.type ==='Choice'&&' des joueurs ont fait le même choix que vous'}
          </p>:''}
          </div>
          <p>
            <span className="title-video">{this.getCamelCaseArray(options.node.video)} </span> <br></br>
            <span className="description-video">{options.node.name}</span>
          </p>
          <p>Confirmez-vous ce choix ?</p>
        </div>
        <button className="rodal-confirm-btn" onClick={() => proceed()}>Confirmer</button>
        <button className="rodal-cancel-btn" onClick={() => cancel()}>Annuler</button>
        <span className="rodal-close"></span>
      </Rodal>
    )
  }
}

TreeModal.propTypes = {
  show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
  cancel: PropTypes.func,          // from confirmable. call to close the dialog with promise rejected.
  dismiss: PropTypes.func,         // from confirmable. call to only close the dialog.
  confirmation: PropTypes.string,  // arguments of your confirm function
  options: PropTypes.object        // arguments of your confirm function
}

export default confirmable(TreeModal)