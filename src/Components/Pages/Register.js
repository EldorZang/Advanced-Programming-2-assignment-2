import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../App.css';
import userdef from '../../userdef.png';
import bg from './background.png';

export default function RegisterPage({usermap, setUsermap, setCurrent}) {
    const [registerData, setRegisterData] = useState({
        username: '',
        nickname: '',
        password: '', 
        validate: '',
        photo: null,
        valid: false
    });

    const [error, setError] = useState({
        errorList: {}
    });

    const navigate = useNavigate();

    const onUsernameChange = event => {
        setRegisterData({ 
            username: event.target.value,
            nickname: registerData.nickname,
            password: registerData.password,
            validate: registerData.validate,
            photo: registerData.photo,
            valid: registerData.valid
        });
    }

    const onNicknameChange = event => {
        setRegisterData({ 
            username: registerData.username,
            nickname: event.target.value,
            password: registerData.password,
            validate: registerData.validate,
            photo: registerData.photo,
            valid: registerData.valid
        });
    }

    const onPasswordChange = event => {
        setRegisterData({ 
            username: registerData.username,
            nickname: registerData.nickname,
            password: event.target.value,
            validate: registerData.validate,
            photo: registerData.photo,
            valid: registerData.valid
        });
    }

    const onValidateChange = event => {
        setRegisterData({ 
            username: registerData.username,
            nickname: registerData.nickname,
            password: registerData.password,
            validate: event.target.value,
            photo: registerData.photo,
            valid: registerData.valid
        });
    }

    const onPhotoChange = event => {
        event.preventDefault();
        var imgUrl = URL.createObjectURL(event.target.files[0]);
        var newRegisterData = registerData;
        newRegisterData["photo"] = imgUrl;
        setRegisterData(newRegisterData);
        validateInfo();
    }

    const validateInfo = () => {
        let errors = {};
        let invalid = false;
        // password may contain 8-16 characters: a-z, A-Z, digits and the characters !@#$%^&*-_=+
        var passwordRegex = new RegExp("^(?=.*[a-zA-Z0-9!@#$%^&*.-_=+]).{8,16}");
        if (usermap.has(registerData.username)) {
            invalid = true;
            errors["username"] = "Username Already Exists.";
        }
        if (registerData.password !== '' && !passwordRegex.test(registerData.password)) {
            invalid = true;
            errors["password"] = "Must be 8 to 16 characters."
        }
        if (registerData.validate !== '' && registerData.password !== registerData.validate) {
            invalid = true;
            errors["validate"] = "Passwords Must Match."
        }
        setRegisterData({ 
            username: registerData.username,
            nickname: registerData.nickname,
            password: registerData.password,
            validate: registerData.validate,
            photo: registerData.photo,
            valid: !invalid
        });
        setError({
            errorList: errors
        });
    }

    const submitUser = event => {
        event.preventDefault();
        let newUser = {};
        let chatRefs = {};
        newUser["userName"] = registerData.username;
        newUser["nickName"] = registerData.nickname;
        newUser["password"] = registerData.password;
        if (registerData.photo !== null) {
            newUser["profile"] = registerData.photo;
        } else {
            console.log(userdef)
            newUser["profile"] = userdef;
        }
       // newUser["chats"] = chatRefs;
        newUser["friends"] = [];
        let newMap = usermap;
        newMap.set(registerData.username, newUser);
        setUsermap(newMap);
        setCurrent(registerData.username);
        navigate('/home');
    }

    return (
        <div style={background}>
        <div className="center-text font-white font-large" >
            <h2>Register Page</h2>
            <form onSubmit={submitUser}>
                <p>
                    <label className="label-form font-white">Username</label><br/>
                    <input className="logreg-input" type="text" id="username" required onChange={onUsernameChange} onBlur={validateInfo}/>
                    <div className="text-danger">{error.errorList["username"]}</div>
                </p>
                <p>
                    <label className="label-form font-white">Nickname</label><br/>
                    <input className="logreg-input" type="text" id="nickname" required onChange={onNicknameChange} onBlur={validateInfo}/>
                </p>
                <p>
                    <label className="label-form font-white">Password</label><br/>
                    <input className="logreg-input" type="password" id="password" required onChange={onPasswordChange} onBlur={validateInfo}/>
                    <div className="text-danger">{error.errorList["password"]}</div>
                </p>
                <p>
                    <label className="label-form font-white">Validate Password</label><br/>
                    <input className="logreg-input" type="password" id="validate" required onChange={onValidateChange} onBlur={validateInfo}/>
                    <div className="text-danger">{error.errorList["validate"]}</div>
                </p>
                <p>
                    <label className="label-form font-white">Photo</label><br/>
                    <input className="logreg-input" type="file" id="photo" onChange={onPhotoChange} accept="image/*"/>
                </p>
                <p>
                    <button id="submit-btn" type="submit" disabled={!registerData.valid}>Register</button>
                </p>
            </form>
                <p>Already have an account? <Link to="/login">Click Here</Link> to login!</p>
                <p><Link to="/">Back to the Home Page</Link>.</p>
        </div>
        </div>
    );
}


const background = {
    width: "100%",
    height: "100%",
    background: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}