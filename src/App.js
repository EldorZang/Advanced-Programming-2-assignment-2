import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/Pages/Landing';
import LoginPage from './Components/Pages/Login'
import RegisterPage from './Components/Pages/Register'
import HomePage from './Components/Pages/Home';

export const serverPath = "https://localhost:7024";
export const serverApiPath = serverPath + '/api/';

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const updateCurrentUser = (value) =>{
    setCurrentUser(value);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage setCurrent={updateCurrentUser}/>} />
        <Route path="/register" element={<RegisterPage setCurrent={updateCurrentUser}/>} />
        <Route path="/home" element={<HomePage username={currentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
