import React, { Component } from 'react';
import './style.css'
import ImageButton from '../../components/ImageButton';

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
                    <p>L'experience Humanium est concue pour être visionnée sur ordinateur !</p>
                </div>
            </div>
        );
    }
}

export default MobileGuard;