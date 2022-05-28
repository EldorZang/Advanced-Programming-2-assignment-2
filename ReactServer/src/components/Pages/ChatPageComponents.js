import React, { useRef, useState, useContext, createContext, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import { AlertModal, AddContactModal } from './ChatPageModals.js'
import { serverApiPath, serverPath } from '../../App.js'

import backgroundImage from './images/chatPageBackground.jpg'
import sampleProfileImage from './images/sampleProfile.jpg'
import message_sent from "./images/sent_message.png";
import message_recv from "./images/recv_message.png";

import 'bootstrap/dist/css/bootstrap.min.css';
import './chatPage.css'


// Contexts for accessing global variables without passing each time as props
//export const ActiveUserContext = createContext("user2");
//export const LoggedUserContext = createContext("user1");
export const forceUpdateContext = createContext("");

// Landing page
export function Main({ loggedUsername }) {


    //  const [messagesData, setMessagesData] = useState(MessagesInfo);
    const [activeUser, setActiveUser] = useState("");
    const [loggedUser, setLoggedUser] = useState(loggedUsername);
    const [forceUpdate, setForceUpdate] = useState("temp");
    const [ContactsNames, setContactsNames] = useState([]);
    const [chatUsersSideBarInfo, setChatUsersSideBarInfo] = useState([]);
    const [newMessagesData, setNewMessagesData] = useState({});
    const [updateDataBase,setUpdateDataBase] = useState(true);


    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(serverPath +'/hubs/database',
 		{withCredentials: (false)}
		)
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                console.log('Connected!');
                connection.on('ReceiveUpdate', value => {
                 setUpdateDataBase(true);
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);











    // get contacts names
    useEffect( () => {
        async function fetchData(){
	if(updateDataBase == false) return;
        var newContactsNames = [];
        var res = await fetch(serverApiPath + 'contacts?loggedUserId=' + loggedUsername).then(function (response) {
            return response.json();
        })
            .then(function (parsedData) {
                for (var i = 0; i < parsedData.length; i++) {
                    newContactsNames = [...newContactsNames, parsedData[i]["id"]];
                }
                setContactsNames(newContactsNames);
            })
		setUpdateDataBase(false); 
        }
        fetchData();
    }, [updateDataBase])
    // Get sidebar data.
    useEffect( () => {
        async function fetchData(){
        var newChatUsersSideBarInfo = [];
        for (var j = 0; j < ContactsNames.length; j++) {
            var newEntry;
            var userName = ContactsNames[j];
            var picture = sampleProfileImage;
            var nickName = "";
            var msgsArr;
            var res = await fetch(serverApiPath + 'nickName/' + userName).then(function (response) {
                return response.json();
            })
                .then(function (parsedData) {
                    nickName = parsedData;
                })

            var msgs = await fetch(serverApiPath + 'contacts/' + userName + '/messages?loggedUserId=' + loggedUser).then(function (response) {
                return response.json();
            })
                .then(function (parsedData) {
                    msgsArr = parsedData;
                })
            var numMsgs = msgsArr.length;
            // Edge case in which there is an empty chat.
            if (numMsgs == 0) {
                newEntry = {
                    "timeStamp": "",
                    "message": "",
                    "picture": picture,
                    "nickName": nickName,
                    "userName": userName
                };
            } else {
                var recentMsg = msgsArr[numMsgs - 1];
                var lastdate = recentMsg.created;
                var last = recentMsg.content
                newEntry = {
                    "timeStamp": lastdate,
                    "message": last,
                    "picture": picture,
                    "nickName": nickName,
                    "userName": userName
                };
            }
            newChatUsersSideBarInfo = [...newChatUsersSideBarInfo, newEntry]
        }
        setChatUsersSideBarInfo(newChatUsersSideBarInfo);
    }
    fetchData();
    }, [ContactsNames])
    // get msgs data
    useEffect( () => {
        async function fetchData(){
        var msgData = {};
        for (var k = 0; k < ContactsNames.length; k++) {
            var currContact = ContactsNames[k];
            console.log(ContactsNames);
            var res = await fetch(serverApiPath + 'contacts/' + currContact + '/messages?loggedUserId=' + loggedUser).then(function (response) {
                return response.json();
            })
                .then(function (parsedData) {
                    msgData[currContact] = parsedData;
                })
        }
        setNewMessagesData(msgData);
    }
    fetchData();
    }, [ContactsNames])
    const [nickName, setNickName] = useState(" ");
    // get nickname of logged user
    useEffect( () => {
        async function fetchData(){
        var res = await fetch(serverApiPath + 'nickName/' + loggedUser).then(function (response) {
            return response.json();
        })
            .then(function (parsedData) {
                setNickName(parsedData);
            })
        }
        fetchData();
    }, [])


    const updateContactsInfo = (value) => {
        setChatUsersSideBarInfo(value);
    }
    const updateActiveUser = (value) => {
        setActiveUser(value);
    }
    return (
        <forceUpdateContext.Provider value={{ forceUpdate, setForceUpdate }}>
                    <div className="background" style={{ backgroundImage: `url(${backgroundImage}` }}>
                        <ChatPage contactsInfo={chatUsersSideBarInfo} updateContactsInfo={updateContactsInfo}
                        loggedUser={loggedUser} activeUser={activeUser} updateActiveUser={updateActiveUser}
                        nickName={nickName} messagesData={newMessagesData} />
                    </div>
        </forceUpdateContext.Provider>)
}


export function ChatPage(props) {
    const { forceUpdate, setForceUpdate } = useContext(forceUpdateContext);
    const [textInput, setTextInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [submit, setSubmit] = useState(false);
    var loggedUser = props.loggedUser;
    var activeUser = props.activeUser;
    useEffect( () => {
        async function fetchData(){
        if (submit == false) {
            return;
        }
        // Add the message in the sender server.
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: textInput })
        };
        var res = await fetch(serverApiPath + 'contacts/' + activeUser + '/messages?loggedUserId=' + loggedUser, requestOptions);

        // Add the message in the reciver server.
        var recvServer;
        var res1 = await fetch(serverApiPath + 'contacts/' + activeUser + '?loggedUserId=' + loggedUser).then(function (response) {
            return response.json();
        })
            .then(function (parsedData) {
                recvServer = parsedData.server;
            })
        const requestOptionsTransfer = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ from: loggedUser,
                to: activeUser,
                content: textInput })
        };
        var res = await fetch(recvServer + '/api/transfer', requestOptionsTransfer);
        setTextInput("");
        setSubmit(false);
    }
    fetchData();
    }, [submit])


    const handleMessageInputChange = (e) => {
        e.preventDefault();
        setTextInput(e.target.value);
    };
    const handleMessageInputSubmit = (e) => {
        e.preventDefault();
        if (activeUser === "") {
            setShowModal(true);
            return;
        }
        setSubmit(true);
    }
    return (
        <Container >
            <Row>
                <UserInfo nickName={props.nickName} loggedUser={loggedUser} />
            </Row>
            <Row className="row g-0">
                <Col ><ChatsNavigation contactsInfo={props.contactsInfo} messagesData={props.messagesData} 
                        activeUser={activeUser} updateActiveUser={props.updateActiveUser}/></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Form className="d-flex align-items-end noBackGround" onSubmit={handleMessageInputSubmit}>
                        <Form.Group>
                            <Form.Control
                                size="lg"
                                value={textInput}
                                type="text"
                                onChange={handleMessageInputChange}
                                placeholder="Enter a message">
                            </Form.Control>
                        </Form.Group>
                        <Button class="btn btn-outline-success" variant="success" type="submit" >
                            <img src={process.env.PUBLIC_URL + '/sendIcon.png'} height="35" width="35" alt="Record" />
                        </Button>
                    </Form>
                </Col>
            </Row>
            <AlertModal showModal={showModal} setShowModal={setShowModal} />
        </Container>
    )
}

function UserInfo(props) {
    return (
        <Container >
            <Row className="loggedUserInfo">
                <Col className="align-left "><img src={sampleProfileImage} alt="loggedUser's picture"
                    width="50" height="50" /></Col>
                <Col className="align-center d-flex align-items-center justify-content-center"><p>{props.nickName}</p></Col>
                <Col className="align-right"><AddContactButton className="addButton" loggedUser={props.loggedUser}/> </Col>
            </Row>
        </Container>
    );
}
function AddContactButton(props) {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <Button variant="success" onClick={() => setModalShow(true)}>
                Add Contact
            </Button>
            <AddContactModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                loggedUser={props.loggedUser}
            />
        </>);
}
export function ChatsNavigation(props) {
  //  const { activeUser, setActiveUser } = useContext(ActiveUserContext);
  //  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    var handleOnSelect = (e) => {
        props.updateActiveUser(e);
    }
    console.log(props);
    return (
        <Tab.Container id="left-tabs-example"
            activeKey={props.activeUser}
            onSelect={handleOnSelect}
            defaultActiveKey={props.activeUser}>
            <Row>
                <Col className="contactsBar">
                    <Nav variant="pills" className="flex-column nav nav-tabs">
                        {props.contactsInfo.map((chatsInfosData, index) => {
                            return (
                                <Nav.Item key={index}>
                                    <Nav.Link eventKey={chatsInfosData.userName}>
                                        <ChatInfo picture={sampleProfileImage} message={chatsInfosData.message} nickName={chatsInfosData.nickName} timeStamp={chatsInfosData.timeStamp} />
                                    </Nav.Link>
                                </Nav.Item>);
                        })}
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content>
                        {props.contactsInfo.map((chatsInfosData, index) => {
                            return (
                                <Tab.Pane key={index} eventKey={chatsInfosData.userName}>
                                    <MessageWindow data={props.messagesData[chatsInfosData.userName]} />
                                </Tab.Pane>);
                        })}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
export function ChatInfo(props) {
    console.log(props);
    // Splitting to more than one line if message is too long.
    if (props.message.length > 25) {
        // recentMsg = recentMsg.replace(/(.{25})/g,"$1\n")
    }
    return (
        <Container fluid='true'>
            <Row>
                <Col ><img src={props.picture} alt="profile2" width="100" height="100" /></Col>
                <Col>{props.nickName}<br />{props.message}</Col>
                <Col >{props.timeStamp}</Col>
            </Row>
        </Container>
    )
}
export function MessageWindow(props) {
    var msgs = props.data;
    const msgsBottomRef = useRef(null)
    const scrollToLastMsg = () => {
        msgsBottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToLastMsg()
    }, [msgs]);
    return (
        <div className="messageWindow">
            <Container fluid='true'>
                {msgs.map((messageData, index) => {
                    return (
                        <Row key={index}>
                            <Message data={messageData.content} recieved={!messageData.sent} timeStamp={messageData.created} />
                        </Row>
                    );
                })}
            </Container>
            <div ref={msgsBottomRef} />
        </div>
    )
}
export function Message(props) {
    let image;
    var bubbleClass;
    var dataClass;
    var messageClass;
    var bubbleWidth;
    var bubbleHeight;
    if (props.recieved) {
        image = message_recv;
        bubbleClass = "recv_message_bubble";
        dataClass = "recv_message_data";
        messageClass = "recv_message";
    }
    else {
        image = message_sent;
        bubbleClass = "sent_message_bubble";
        dataClass = "sent_message_data";
        messageClass = "sent_message";
    }

    dataClass = dataClass + "_text"
    // Adjusting text balloon height.
    var numberOfLines = Math.floor(props.data.length / 35) + 1;
    if (props.data.length % 35 > 0) {
        numberOfLines = numberOfLines + 1;
    }
    if (numberOfLines == 1) {
        bubbleHeight = 50;
    }
    else {
        bubbleHeight = 30 * numberOfLines;
    }
    var msgText = props.data + " \n " + props.timeStamp.slice(-25);
    // Adjusting text balloon width.

    if (numberOfLines > 2) {
        bubbleWidth = 10 * 35 + 15
    }
    else {
        // 25 chars is the timeStamp, and 11 is the number of pixels per char.
        bubbleWidth = Math.max(11 * props.data.length, 11 * 25);
    }
    return (
        <div className={messageClass}>
            <div className={bubbleClass}>
                <p className={[dataClass, "wraplines"].join(' ')}>{msgText}</p>
                <img src={image} alt="Info" width={bubbleWidth} height={bubbleHeight} />
            </div>
        </div>
    )
}




function getRandomNum() {
    var fromRang = 1;
    var toRange = 1000;
    var rand = fromRang + Math.random() * (toRange - fromRang);
    return rand;
}
