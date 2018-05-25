import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Rodal from 'rodal'

import TutoBlock from '../../components/TutoBlock'

import './style.css'

class TutoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }
  }

  render() {
    const { show, proceed, dismiss, cancel, confirmation, options } = this.props
    const { windowWidth, windowHeight } = this.state
    return (
      <Rodal visible={show}
        onClose={() => cancel()}
        closeMaskOnClick={true}
        width={windowWidth / 2}
        height={windowHeight / 2}
      >
        <div className="header">
          <div>
            <img className="logo-small" src="./assets/images/logo.svg" alt="logo humanium" />
            <h5>Tutoriel</h5>
          </div>
          <div>
            <p>Lorsque vous entendez le son de basse, placez vos mains sur le clavier. Vous allez devoir intéragir soit en faisant un choix, soit en exécutant un QTE</p>
          </div>
        </div>
        <div className="body body-tuto">
          <TutoBlock name='choix' />
          <TutoBlock name='qte' />
        </div>
      </Rodal>
    )
  }
}

TutoModal.propTypes = {
  show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
  cancel: PropTypes.func,          // from confirmable. call to close the dialog with promise rejected.
  dismiss: PropTypes.func,         // from confirmable. call to only close the dialog.
  confirmation: PropTypes.string,  // arguments of your confirm function
  options: PropTypes.object        // arguments of your confirm function
}

export default confirmable(TutoModal);