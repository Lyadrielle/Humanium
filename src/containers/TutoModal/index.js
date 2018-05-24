import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Rodal from 'rodal'

import './style.css'

class TutoModal extends Component {
  render() {
    const { show } = this.props
    return (
      <Rodal visible={show}
        onClose={() => cancel()}
        closeMaskOnClick={true}
      >
        <div className="popup">
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