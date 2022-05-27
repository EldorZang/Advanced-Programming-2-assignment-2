import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/Pages/Landing';
import LoginPage from './components/Pages/Login'
import RegisterPage from './components/Pages/Register'
import HomePage from './components/Pages/Home';

export const serverPath = "https://localhost:7127";
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
