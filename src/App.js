import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/Pages/Landing';
import LoginPage from './Components/Pages/Login'
import RegisterPage from './Components/Pages/Register'
import HomePage from './Components/Pages/Home';

import bobProfilePic from './Components/Pages/sampleUsersProfiles/bob_profile.png'
import aliceProfilePic from './Components/Pages/sampleUsersProfiles/alice_profile.png'
import lindaProfilePic from './Components/Pages/sampleUsersProfiles/linda_profile.png'
import oliverProfilePic from './Components/Pages/sampleUsersProfiles/oliver_profile.png'
import oliviaProfilePic from './Components/Pages/sampleUsersProfiles/olivia_profile.png'
import frankProfilePic from './Components/Pages/sampleUsersProfiles/frank_profile.png'

function App() {
  const [users, setUsers] = useState(new Map([
    ["frank123", {
      userName: "frank123",
      nickName: "Frank",
      password: "frank_pass",
      profile: frankProfilePic,
      friends: ["bob123"]
}],
["linda123", {
  userName: "linda123",
  nickName: "Linda",
  password: "linda_pass",
  profile: lindaProfilePic,
  friends: ["bob123"]
}],
["oliver123", {
  userName: "oliver123",
  nickName: "Oliver",
  password: "oliver_pass",
  profile: oliverProfilePic,
  friends: ["bob123"]
}],
["olivia123", {
  userName: "olivia123",
  nickName: "Olivia",
  password: "olivia_pass",
  profile: oliviaProfilePic,
  friends: ["bob123"]
}],
["alice123",{
  userName: "alice123",
  nickName: "Alice",
  password: "alice_pass",
  profile: aliceProfilePic,
  friends: ["bob123"]
}],
["bob123",{
  userName: "bob123",
  nickName: "Bob",
  password: "bob_pass",
  profile: bobProfilePic,
  friends: ["alice123","oliver123","olivia123","linda123","frank123"]
}]
]));

  const [currentUser, setCurrentUser] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage usermap={users} setCurrent={setCurrentUser}/>} />
        <Route path="/register" element={<RegisterPage usermap={users} setUsermap={setUsers} setCurrent={setCurrentUser}/>} />
        <Route path="/home" element={<HomePage username={currentUser} usermap={users} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
