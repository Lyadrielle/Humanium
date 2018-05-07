import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Rodal from 'rodal'

import './style.css'

class TreeModal extends Component {
    render() {
        const { show, proceed, dismiss, cancel, confirmation, options } = this.props
        return (
            <Rodal visible={show} onClose={() => cancel()} closeMaskOnClick={false} animation="zoom" duration={200}>
                <div className="header">Reprendre la lecture</div>
                <div className="body">
                Vous êtes sur le point de vous rendre au point suivant de l'histoire : <br></br>
                Nom : {options.id} <br></br>
                Description : {options.name}
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

export default confirmable(TreeModal);