import React, {useState,useEffect,useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../App.css';
import userdef from '../../userdef.png';
import bg from './background.png';
import { serverApiPath, serverPath } from '../../App.js'

export default function RegisterPage({setCurrent}) {
    const isMounted1 = useRef(false);
    const isMounted2 = useRef(false);
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
    const [isUserExists,setIsUserExists] = useState(false);
    const [submit,setSubmit] = useState(false);
    useEffect( () =>{
        async function fetchData(){
        if (!isMounted1.current){
            isMounted1.current = true;
            return;
        }
        var res = await fetch(serverApiPath+'register/' + registerData.username);
        var output = res.ok;
        console.log(!output);
        setIsUserExists(!output)
    }
    fetchData();
    },[registerData.username])

    
    useEffect( () =>{
        async function fetchData(){
        if (!isMounted2.current){
            isMounted2.current = true;
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: registerData.username,
                    nickName: registerData.nickname,
                    password: registerData.password})
        };
        var res = await fetch(serverApiPath+'register', requestOptions)
        setCurrent(registerData.username);
        navigate('/home');}
        fetchData();
    },[submit])



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
        if (isUserExists) {
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
        setSubmit(true);
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