import React, { useRef, useState, useContext, createContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import { MessagesInfo, UsersInfo } from './databaseArrs'
import { AlertModal, RecordAudioModal, AddContactModal, AddFileModal } from './ChatPageModals.js'

import backgroundImage from './images/chatPageBackground.jpg'
import message_sent from "./images/sent_message.png";
import message_recv from "./images/recv_message.png";

import 'bootstrap/dist/css/bootstrap.min.css';
import './chatPage.css'

// Contexts for accessing global variables without passing each time as props
export const UsersContext = createContext(UsersInfo);
export const MessagesContext = createContext(MessagesInfo);
export const ContactsContext = createContext("");
export const ActiveUserContext = createContext("user2");
export const LoggedUserContext = createContext("user1");
export const forceUpdateContext = createContext("");

// Landing page
export function Main({ usersMap, loggedUsername }) {

    // Get a userBar info (name,picture and most recent message).
    const ResolveUserInfo = (userName) => {

        // Edge case in which there is an empty chat.
        if (messagesData[loggedUser][userName].length == 0) {
            return ({
                "timeStamp": "",
                "message": "",
                "picture": usersData[userName].profile,
                "nickName": usersData[userName].nickName,
                "userName": userName
            });
        }
        var recentMsgId = (messagesData[loggedUser])[userName].length - 1;
        var recentMsg = messagesData[loggedUser][userName][recentMsgId];
        var timeStamp = recentMsg.timeStamp;
        var recentMessage, picture, nickName;
        if (recentMsg.type === "text") {
            recentMessage = recentMsg.data
        }
        else {
            recentMessage = recentMsg.type
        }
        picture = usersData[userName].profile
        nickName = usersData[userName].nickName
        return ({
            "timeStamp": timeStamp,
            "message": recentMessage,
            "picture": picture,
            "nickName": nickName,
            "userName": userName
        });
    }

    // Convert a map to a JS object.
    const mapToObj = (inputMap) => {
        const obj = {};
        inputMap.forEach((value, key) => { obj[key] = value; });
        return obj;
    }
    const [usersData, setUsersData] = useState(mapToObj(usersMap));
    const [messagesData, setMessagesData] = useState(MessagesInfo);
    const [activeUser, setActiveUser] = useState("");
    const [loggedUser, setLoggedUser] = useState(loggedUsername);
    const [forceUpdate, setForceUpdate] = useState("temp");

    // Add a user to the messages database.
    const addNewUser = (newUser) => {
        var newMessagesData = messagesData;
        var newUserKeyEntry = {};
        Object.keys(messagesData).forEach((currUser) => {
            newUserKeyEntry[currUser] = [];
            newMessagesData[currUser][newUser] = [];
        });
        newMessagesData[newUser] = newUserKeyEntry;
        setMessagesData(newMessagesData);
    }

    // Add all new registered user to the messages database.
    const addNewUsers = () => {
        Object.keys(usersData).forEach((user) => {
            if (!messagesData.hasOwnProperty(user)) {
                addNewUser(user);
            }
        })
    }

    addNewUsers();

    // Get sidebar data.
    var chatUsersSideBarInfo = [];
    ((usersData[loggedUser])["friends"]).map((user) => {
        chatUsersSideBarInfo = [...chatUsersSideBarInfo, ResolveUserInfo(user)]
    })
    const [contacts, setContacts] = useState(chatUsersSideBarInfo);
    return (
        <forceUpdateContext.Provider value={{ forceUpdate, setForceUpdate }}>
            <UsersContext.Provider value={{ usersData, setUsersData }}>
                <MessagesContext.Provider value={{ messagesData, setMessagesData }}>
                    <ContactsContext.Provider value={{ contacts, setContacts }}>
                        <ActiveUserContext.Provider value={{ activeUser, setActiveUser }}>
                            <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
                                <div className="background" style={{ backgroundImage: `url(${backgroundImage}` }}>
                                    <ChatPage />
                                </div>
                            </LoggedUserContext.Provider>
                        </ActiveUserContext.Provider>
                    </ContactsContext.Provider>
                </MessagesContext.Provider>
            </UsersContext.Provider>
        </forceUpdateContext.Provider>)
}


export function ChatPage() {
    const { forceUpdate, setForceUpdate } = useContext(forceUpdateContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const [textInput, setTextInput] = useState("");
    const [showModal, setShowModal] = useState(false);
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
        var currTime = new Date().toLocaleString() + "";
        var newMessagesData = messagesData;
        // Add the message in the sender mesagges arr.
        newMessagesData[loggedUser][activeUser] = [...newMessagesData[loggedUser][activeUser], {
            recieved: false,
            type: "text",
            data: textInput,
            timeStamp: currTime
        }];

        // Add the message in the reciver mesagges arr.
        newMessagesData[activeUser][loggedUser] = [...newMessagesData[activeUser][loggedUser], {
            recieved: true,
            type: "text",
            data: textInput,
            timeStamp: currTime
        }];
        setMessagesData(newMessagesData);

        // Update the last message in the contacts info.
        var newContacts = contacts;
        newContacts.map((contact) => {
            if (contact.userName === activeUser) {
                contact.message = textInput;
                contact.timeStamp = currTime;
            }
        })
        setContacts(newContacts)
        setTextInput("");
        setForceUpdate(new Date().toLocaleString() + "" + getRandomNum());
    };
    return (
        <Container >
            <Row>
                <UserInfo />
            </Row>
            <Row className="row g-0">
                <Col ><ChatsNavigation /></Col>
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
                        <AddFileButton type="picture" />
                        <AddFileButton type="video" />
                        <RecordAudioButton />
                    </Form>
                </Col>
            </Row>
            <AlertModal showModal={showModal} setShowModal={setShowModal} />
        </Container>
    )
}

function UserInfo() {
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const { usersData, setUsersData } = useContext(UsersContext);
    return (
        <Container >
            <Row className="loggedUserInfo">
                <Col className="align-left "><img src={usersData[loggedUser]["profile"]} alt="loggedUser's picture"
                    width="50" height="50" /></Col>
                <Col className="align-center d-flex align-items-center justify-content-center"><p>{usersData[loggedUser]["nickName"]}</p></Col>
                <Col className="align-right"><AddContactButton className="addButton" /> </Col>
            </Row>
        </Container>
    );
}
function AddContactButton() {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <Button variant="success" onClick={() => setModalShow(true)}>
                Add Contact
            </Button>
            <AddContactModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>);
}
export function ChatsNavigation() {
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    var handleOnSelect = (e) => {
        setActiveUser(e);
    }
    return (
        <Tab.Container id="left-tabs-example"
            activeKey={activeUser}
            onSelect={handleOnSelect}
            defaultActiveKey={activeUser}>
            <Row>
                <Col className="contactsBar">
                    <Nav variant="pills" className="flex-column nav nav-tabs">
                        {contacts.map((chatsInfosData, index) => {
                            return (
                                <Nav.Item key={index}>
                                    <Nav.Link eventKey={chatsInfosData.userName}>
                                        <ChatInfo data={chatsInfosData} />
                                    </Nav.Link>
                                </Nav.Item>);
                        })}
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content>
                        {contacts.map((chatsInfosData, index) => {
                            return (
                                <Tab.Pane key={index} eventKey={chatsInfosData.userName}>
                                    <MessageWindow data={messagesData[loggedUser][chatsInfosData.userName]} />
                                </Tab.Pane>);
                        })}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
export function ChatInfo(props) {
    var info = props.data;
    var recentMsg = info.message;
    // Splitting to more than one line if message is too long.
    if (recentMsg.length > 25) {
        // recentMsg = recentMsg.replace(/(.{25})/g,"$1\n")
    }
    return (
        <Container fluid='true'>
            <Row>
                <Col ><img src={info.picture} alt="profile2" width="100" height="100" /></Col>
                <Col>{info.nickName}<br />{recentMsg}</Col>
                <Col >{info.timeStamp}</Col>
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
                            <Message data={messageData.data} recieved={messageData.recieved} type={messageData.type} file={messageData.file} timeStamp={messageData.timeStamp} />
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

    if (props.type === "text") {
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
        var msgText = props.data + " \n " + props.timeStamp.slice(-8);
        // Adjusting text balloon width.

        if (numberOfLines > 2) {
            bubbleWidth = 10 * 35 + 15
        }
        else {
            // 8 chars is the timeStamp, and 11 is the number of pixels per char.
            bubbleWidth = Math.max(11 * props.data.length, 11 * 8);
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
    else if (props.type === "picture") {
        dataClass = dataClass + "_file"
        bubbleClass = bubbleClass + "_file"
        return (
            <>
                <div className={messageClass}>

                    <div className={bubbleClass} >
                        <span className="timeStamp">{props.timeStamp.slice(-8)}</span>
                        <img width="180" height="120" src={props.file} className={dataClass} />
                        <img src={image} alt="Info" width="250" height="200" />
                    </div>
                </div>
            </>
        )
    }
    else if (props.type === "video") {
        dataClass = dataClass + "_file"
        bubbleClass = bubbleClass + "_file"
        return (
            <div className={messageClass}>
                <div className={bubbleClass} >
                    <span className="timeStamp">{props.timeStamp.slice(-8)}</span>
                    <video width="180" height="120" controls className={dataClass}>
                        <source src={props.file} type="video/mp4" />
                    </video>
                    <img src={image} alt="Info" width="250" height="200" />
                </div>
            </div>
        )
    }
    else if (props.type === "record") {
        dataClass = dataClass + "_file"
        bubbleClass = bubbleClass + "_file"
        return (
            <div className={messageClass}>
                <div className={bubbleClass} >
                    <span className="timeStamp">{props.timeStamp.slice(-8)}</span>
                    <audio id="audio" controls className={[dataClass, "record"].join(" ")} width="100" height="50">
                        <source src={props.file} type="audio/mp3" />
                    </audio>
                    <img src={image} alt="Info" width="310" height="100" />
                </div>
            </div>
        )
    }
}

function AddFileButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [alertModalShow, setAlertModalShow] = useState(false);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const handleClick = () => {
        // Edge case in which there isn't a selected contact.
        if (activeUser === "") {
            setAlertModalShow(true);
        }
        else {
            setModalShow(true)
        }
    }
    var icon = props.type + "Icon.png";
    return (
        <>
            <Button variant="success" onClick={handleClick}>
                <img src={process.env.PUBLIC_URL + '/' + icon} height="35" width="35" alt={props.type} />
            </Button>
            <AddFileModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                type={props.type} />
            <AlertModal showModal={alertModalShow} setShowModal={setAlertModalShow} />
        </>
    );
}

function RecordAudioButton() {
    const [modalShow, setModalShow] = useState(false);
    const [alertModalShow, setAlertModalShow] = useState(false);
    const { forceUpdate, setForceUpdate } = useContext(forceUpdateContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const handleClick = () => {
        // Edge case in which there isn't a selected contact.
        if (activeUser === "") {
            setAlertModalShow(true);
        }
        else {
            setModalShow(true)
        }
    }
    const update = (e) => {
        setForceUpdate(new Date().toLocaleString() + "" + getRandomNum());
    }
    return (
        <>
            <Button class="btn btn-outline-success" variant="success" onClick={handleClick}>
                <img src={process.env.PUBLIC_URL + '/audioIcon.png'} height="35" width="35" alt="Record" />
            </Button>
            <RecordAudioModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onExited={update}
            />
            <AlertModal showModal={alertModalShow} setShowModal={setAlertModalShow} />

        </>
    );
}
function getRandomNum() {
    var fromRang = 1;
    var toRange = 1000;
    var rand = fromRang + Math.random() * (toRange - fromRang);
    return rand;
}