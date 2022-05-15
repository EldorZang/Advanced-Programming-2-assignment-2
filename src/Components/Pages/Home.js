import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import bg from './background.png';
import {Main} from './ChatPageComponents'
export default function HomePage({username, usermap}) {
    return (
        <>
        <Main usersMap={usermap} loggedUsername={username}/>
        </>
    );
}
