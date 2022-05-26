import React, {useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import bg from './background.png';
import { serverApiPath, serverPath } from '../../App.js'

import '../../App.css';

export default function LoginPage({setCurrent}) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [valid,setValid] = useState(false);

    const [error, setError] = useState({
        errorList: {}
    });
    const [inputChange,setInputChange] = useState(0);

    useEffect(() =>{
        async function fetchData(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: loginData.username,
                                    password: loginData.password})
        };
        var res = await fetch(serverApiPath+'login', requestOptions);
       setValid(res.ok);}
       fetchData();
    },[loginData.username,loginData.password])



    const navigate = useNavigate();

    const onUsernameChange = event => {
        setLoginData({
            username: event.target.value,
            password: loginData.password,
        });
    }

    const onPasswordChange = event => {
        setLoginData({
            username: loginData.username,
            password: event.target.value,
        });
    }


    const validateInfo = () => {
        let errors = {};
         if(!valid){
            errors["invalid"] = "Invalid Information.";
        }
        setError({
            errorList: errors
        });
    }

    const submitHandler = () => {
        setCurrent(loginData.username);
        navigate('/home');
    }

    return (

        <body style={background}>
            <div className="center-text font-white font-large">
                <h2>Login Page</h2>
                <form onSubmit={submitHandler}>
                    <p>
                        <label className="label-form font-white">Username</label><br/>
                        <input className="logreg-input" type="text" id="username" required onChange={onUsernameChange} onBlur={validateInfo}/>
                    </p>
                    <p>
                        <label className="label-form font-white">Password</label>
                        <br/>
                        <input className="logreg-input" type="password" id="password" required onChange={onPasswordChange} onBlur={validateInfo}/>
                    </p>
                    <p>
                    <Link to= '/home'>
                        <button id="submit-btn" type="submit"
                        disabled={!valid}
                        onClick={() => setCurrent(loginData.username)}>Login</button>
                        </Link>
                        <div className="text-danger">{error.errorList["invalid"]}</div>
                    </p>
                </form>
                <footer>
                    <p>Don't have an account? <Link to="/register">Click Here</Link> to create one!</p>
                    <p><Link to="/">Back to the Home Page</Link>.</p>
                </footer>
            </div>
        </body>
    )
    }


const background = {
    width: "100%",
    height: "100vh",
    background: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}