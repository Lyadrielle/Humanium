import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { confirmable } from 'react-confirm'
import Rodal from 'rodal'

import TutoBlock from '../../components/TutoBlock'

import './style.css'

class TutoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
  
  render() {
    const { show, proceed, dismiss, cancel, confirmation, options } = this.props
<<<<<<< 326fb7e60d29849925c216e138b5e8f04fcd6f47
<<<<<<< ee14808230cdbaca4199c6b117b5c17588624c43
=======
>>>>>>> essaie desespere de faire un tuto
    let {width: windowWidth, height: windowHeight} = this.state
    console.log(`------------------------------------`)
    console.log(`WIDTH: ${windowWidth / 2}\nHEIGHT: ${windowHeight / 2}`)
    console.log(`------------------------------------`)
    
<<<<<<< 326fb7e60d29849925c216e138b5e8f04fcd6f47
    return (
      <Rodal visible={ show }
        onClose={ () => cancel() }
        closeMaskOnClick={true}
        width={windowWidth / 1.3}
        height={windowHeight / 1.3}
      >
        <div className="header">
          <div>
            <img className="logo-small" src="./assets/images/logo.svg" alt="logo humanium" />
            <h5>Tutoriel</h5>
          </div>
          <div>
          <p>Lorsque vous entendez ce son, placez vos mains sur le clavier. Vous allez devoir intéragir soit en faisant un choix, soit en exécutant un QTE</p>
        </div>
        </div>
        <div className="body">
          <TutoBlock name='choice'/>
          <TutoBlock name='qte'/>
=======

=======
>>>>>>> essaie desespere de faire un tuto
    return (
      <Rodal visible={ show }
        onClose={ () => cancel() }
        closeMaskOnClick={true}
        width={windowWidth / 1.3}
        height={windowHeight / 1.3}
      >
        <div className="header">
          <div>
            <img className="logo-small" src="./assets/images/logo.svg" alt="logo humanium" />
            <h5>Tutoriel</h5>
          </div>
          <div>
          <p>Lorsque vous entendez ce son, placez vos mains sur le clavier. Vous allez devoir intéragir soit en faisant un choix, soit en exécutant un QTE</p>
        </div>
        </div>
        <div className="body">
<<<<<<< 326fb7e60d29849925c216e138b5e8f04fcd6f47
          
>>>>>>> showing Modal tutorial
=======
          <TutoBlock name='choice'/>
          <TutoBlock name='qte'/>
>>>>>>> essaie desespere de faire un tuto
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