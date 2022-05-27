import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import bg from './background.png';

export default function LandingPage() {
    return (
        <header style={background}>
            <h1 className="title center-text pad-top3">Welcome to our website!</h1>
            <h1 className="title center-text pad-top3">Please Login or Register Down Below.</h1>
            <div className="buttons center-text pad-top3">
                <Link to="/login">
                    <button className="primary-button">Login</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button"><span>Register</span></button>
                </Link>
            </div>
        </header>
    );
}

const background = {
    width: "100vw",
    height: "100vh",
    background: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}