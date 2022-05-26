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
import sampleProfileImage from './images/sampleProfile.jpg'
import message_sent from "./images/sent_message.png";
import message_recv from "./images/recv_message.png";

import 'bootstrap/dist/css/bootstrap.min.css';
import './chatPage.css'

// Contexts for accessing global variables without passing each time as props
export const MessagesContext = createContext(MessagesInfo);
export const ContactsContext = createContext("");
export const ContactsInfoContext = createContext("");
export const ActiveUserContext = createContext("user2");
export const LoggedUserContext = createContext("user1");
export const ServerContext = createContext("https://localhost:7024");
export const forceUpdateContext = createContext("");

// Landing page
export function Main({ usersMap, loggedUsername }) {
    
    // Get a userBar info (name,picture and most recent message).
    const ResolveUserInfo = async (userName) => {
        var timeStamp = "";
        var message = "";
        var picture = sampleProfileImage;
        var nickName = "";
        var msgsArr;
        var res = await fetch('https://localhost:7024/Api/nickName/' + userName).then(function(response) {
            return response.json();
        })
        .then(function(parsedData) {
            nickName=parsedData;  
        })
        console.log(nickName);
        var msgs = await fetch('https://localhost:7024/Api/contacts/' +userName + '/messages?loggedUserId='+loggedUser).then(function(response) {
            return response.json();
        })
        .then(function(parsedData) {
            msgsArr=parsedData;  
        })
        console.log(msgsArr);
        var numMsgs = msgsArr.length;
        // Edge case in which there is an empty chat.
        if (numMsgs == 0) {
            return ({
                "timeStamp": "",
                "message": "",
                "picture": picture,
                "nickName": nickName,
                "userName": userName
            });
        }
        
        var recentMsg = msgsArr[numMsgs-1];
        var lastdate = recentMsg.created;
        var last = recentMsg.content
        return ({
            "timeStamp": lastdate,
            "message": last,
            "picture": picture,
            "nickName": nickName,
            "userName": userName
        });
    }

    const [messagesData, setMessagesData] = useState(MessagesInfo);
    const [activeUser, setActiveUser] = useState("");
    const [loggedUser, setLoggedUser] = useState(loggedUsername);
    const [forceUpdate, setForceUpdate] = useState("temp");
    const [Server, setServer] = useState("https://localhost:7024");
    const [contacts,setContacts] = useState([]);
    const [ContactsNames,setContactsNames] = useState([]);
    const [updateContacts,setupdateContacts] = useState(false);
    const [contactsNumber,setContactsNumber] = useState(0);
    const [chatUsersSideBarInfo,setChatUsersSideBarInfo] = useState([]);
    useEffect( async ()=>{
        var newContactsNames = [];
        console.log(loggedUser);
        var res = await fetch('https://localhost:7024/Api/contacts?loggedUserId='+loggedUser).then(function(response) {
            return response.json();
        })
        .then(function(parsedData) {
            console.log(parsedData);
            console.log(parsedData.length);
            if(parsedData.length==contactsNumber){
                return;
            }
            for(var i=0;i<parsedData.length;i++){
                newContactsNames = [...newContactsNames,parsedData[i]["id"]];
            }
            setContactsNumber(parsedData.length);
            setContactsNames(newContactsNames);
        })
    },[ContactsNames])
    // Get sidebar data.
    console.log(ContactsNames);

  //  var chatUsersSideBarInfo = [];
  useEffect( async ()=>{
      console.log("123")
      var newChatUsersSideBarInfo = [];
    for(var j=0;j<ContactsNames.length;j++){
        var newEntry = ResolveUserInfo(ContactsNames[j]);
        newChatUsersSideBarInfo = [...newChatUsersSideBarInfo, newEntry]
    }
    setChatUsersSideBarInfo(newChatUsersSideBarInfo);
    console.log("1423")
    },[ContactsNames])


    console.log(chatUsersSideBarInfo);
    return (
        <forceUpdateContext.Provider value={{ forceUpdate, setForceUpdate }}>
            <ContactsInfoContext.Provider value={{chatUsersSideBarInfo,setChatUsersSideBarInfo}}>
            <ServerContext.Provider value={{Server,setServer}}>
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
                </ServerContext.Provider>
                </ContactsInfoContext.Provider>
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
    const [submit, setSubmit] = useState(false);

    useEffect(async ()=>{
        if(submit == false){
            return;
        }
        // Add the message in the sender server.
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: textInput})
        };
        var res = await fetch('https://localhost:7024/Api/contacts/'+activeUser+'/messages?loggedUserId='+loggedUser, requestOptions);

        // Add the message in the reciver server.
        // get reciver server
        var recvServer = await fetch('https://localhost:7024/Api/contacts/'+activeUser+'?loggedUserId='+loggedUser);
        recvServer = recvServer.json()["server"];
        const requestOptionsTransfer = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: textInput})
        };
        var res = await fetch(recvServer+'/Api/transfer', requestOptionsTransfer);
        setTextInput("");
        setSubmit(false);
    },[submit])


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
                    </Form>
                </Col>
            </Row>
            <AlertModal showModal={showModal} setShowModal={setShowModal} />
        </Container>
    )
}

function UserInfo() {
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const [nickName, setNickName] = useState(" ");
    useEffect(async () =>{
        var res = await fetch('https://localhost:7024/Api/nickName/' + loggedUser).then(function(response) {
            return response.json();
        })
        .then(function(parsedData) {
            setNickName(parsedData);
        })
    },[])
    return (
        <Container >
            <Row className="loggedUserInfo">
                <Col className="align-left "><img src={sampleProfileImage} alt="loggedUser's picture"
                    width="50" height="50" /></Col>
                <Col className="align-center d-flex align-items-center justify-content-center"><p>{nickName}</p></Col>
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
    const {chatUsersSideBarInfo,setChatUsersSideBarInfo} = useContext(ContactsInfoContext)
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    var handleOnSelect = (e) => {
        setActiveUser(e);
    }
    console.log(chatUsersSideBarInfo);
    return (
        <Tab.Container id="left-tabs-example"
            activeKey={activeUser}
            onSelect={handleOnSelect}
            defaultActiveKey={activeUser}>
            <Row>
                <Col className="contactsBar">
                    <Nav variant="pills" className="flex-column nav nav-tabs">
                        {chatUsersSideBarInfo.map((chatsInfosData, index) => {
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
                        {chatUsersSideBarInfo.map((chatsInfosData, index) => {
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
    console.log(props);
    var info =  props.data;
    var recentMsg =  info.message;
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
                            <Message data={messageData.data} recieved={messageData.recieved} timeStamp={messageData.timeStamp} />
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




function getRandomNum() {
    var fromRang = 1;
    var toRange = 1000;
    var rand = fromRang + Math.random() * (toRange - fromRang);
    return rand;
}