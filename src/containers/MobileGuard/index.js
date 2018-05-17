import React, { Component } from 'react';
import './style.css'
import ImageButton from '../../components/ImageButton';

const messages = {
    mobile: "L'experience Humanium est concue pour être visionnée sur ordinateur !",
    orientation: "Veuillez passez votre appareil en mode paysage !"
}
class MobileGuard extends Component {
    render() {
        return (
            <div className="mobile">
                <div className="row">
                    <img
                        className="logo"
                        src="./assets/images/logo.svg"
                        alt="logo humanium"
                    />
                </div>
                <div className="row">
                    <p>{this.props.message}</p>
                </div>
            </div>
        );
    }
}

MobileGuard.messages = messages

export default MobileGuard;