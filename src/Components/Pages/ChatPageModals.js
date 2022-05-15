import Modal from 'react-bootstrap/Modal'
import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { UsersContext, MessagesContext, ContactsContext, ActiveUserContext, LoggedUserContext, forceUpdateContext } from './ChatPageComponents.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import './chatPage.css'

export function AlertModal(props) {
    return (
        <>
            <Modal
                size="sm"
                show={props.showModal}
                onHide={() => props.setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Error
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Please choose a contact first.</Modal.Body>
            </Modal>
        </>
    );
}
export function RecordAudioModal(props) {
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const { forceUpdate, setForceUpdate } = useContext(forceUpdateContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [ recvUser, setRecvUser ] = useState("");

    async function requestRecorder() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return new MediaRecorder(stream);
    }
    useEffect(() => {
        if (recorder === null) {
            if (isRecording) {
                requestRecorder().then(setRecorder, console.error);
            }
            return;
        }
        if (isRecording) {
            recorder.start();
        } else {
            recorder.stop();
        }
        const saveRecording = (e) => {
            var url = URL.createObjectURL(e.data);
            var newMessagesData = messagesData;
            var currTime = new Date().toLocaleString() + "";
            newMessagesData[loggedUser][recvUser] = [...newMessagesData[loggedUser][recvUser], {
                recieved: false,
                type: "record",
                data: "",
                timeStamp: currTime,
                file: url
            }];
            newMessagesData[recvUser][loggedUser] = [...newMessagesData[recvUser][loggedUser], {
                recieved: true,
                type: "record",
                data: "",
                timeStamp: currTime,
                file: url
            }];
            setMessagesData(newMessagesData);

            // Update contacts database.
            var newContacts = contacts;
            newContacts.map((chatsInfosData) => {
                if (recvUser === chatsInfosData.userName) {
                    chatsInfosData["message"] = "recording";
                    chatsInfosData["timeStamp"] = currTime;
                }
            });
            setContacts(newContacts);
        };
        recorder.addEventListener("dataavailable", saveRecording);
        return () => recorder.removeEventListener("dataavailable", saveRecording);
    }, [recorder, isRecording]);
    const handleRecording = (e) => {
        if (!isRecording) {
            setRecvUser(activeUser);
            setIsRecording(true);
        }
        else {
            setIsRecording(false);
            var currTime = new Date().toLocaleString() + "";
            setForceUpdate(currTime + getRandomNum());
            props.onHide()
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className="recordingModal">
                <Button variant="success" onClick={(e) => {
                    handleRecording(e);
                }}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
            </Modal.Body>
        </Modal>
    );
}
export function AddFileModal(props) {
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { activeUser, setActiveUser } = useContext(ActiveUserContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const { forceUpdate, setForceUpdate } = useContext(forceUpdateContext);
    const [fileUploaded, setFileUploaded] = useState();
    function handleFileInputChange(e) {
        e.preventDefault();
        var url = URL.createObjectURL(e.target.files[0]);
        setFileUploaded(url)
        var newMessagesData = messagesData;
        var currTime = new Date().toLocaleString() + "";
        var fileType = props.type;

        // Update messages database.
        newMessagesData[loggedUser][activeUser] = [...newMessagesData[loggedUser][activeUser], {
            recieved: false,
            type: fileType,
            data: "",
            timeStamp: currTime,
            file: url
        }];
        newMessagesData[activeUser][loggedUser] = [...newMessagesData[activeUser][loggedUser], {
            recieved: true,
            type: fileType,
            data: "",
            timeStamp: currTime,
            file: url
        }];
        setMessagesData(newMessagesData);

        // Update contacts database.
        var newContacts = contacts;
        newContacts.map((chatsInfosData) => {
            if (activeUser === chatsInfosData.userName) {
                chatsInfosData["message"] = fileType;
                chatsInfosData["timeStamp"] = currTime;
            }
        });
        setContacts(newContacts);

        setForceUpdate(currTime + " " + getRandomNum());
        props.onHide();
    };
    var fileType;
    if(props.type === "picture"){
        fileType = "image/*"
    }
    else{
        fileType = props.type + "/*";
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <input type="file" accept={fileType} onChange={handleFileInputChange} />
            </Modal.Body>
        </Modal>
    );
}
export function AddContactModal(props) {
    const { usersData, setUsersData } = useContext(UsersContext);
    const { messagesData, setMessagesData } = useContext(MessagesContext);
    const { contacts, setContacts } = useContext(ContactsContext);
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const [formText, setFormText] = useState("");
    const [errorText, setErrorText] = useState("");
    const ResolveUserInfo = (userName) => {
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
    const doesExistContact = (user) => {
        var exist = false;
        contacts.map((currContact) => {
            if (currContact.userName === user) {
                exist = true;
            }
        })
        return exist;
    }
    const handleFormInputChange = (e) => {
        e.preventDefault();
        setFormText(e.target.value);
    };
    const handleFormInputSubmit = (e) => {
        e.preventDefault();
        if (formText === loggedUser) {
            setErrorText("Can't add the currently logged user as a new contact.");
        }
        else if (!usersData.hasOwnProperty(formText)) {
            setErrorText("User doesn't exist.");
        }
        else if (doesExistContact(formText)) {
            setErrorText("User already added to contact's list.");
        }
        else {
            setErrorText("");
            var newUsersData = usersData;
            newUsersData[loggedUser]["friends"] = [...newUsersData[loggedUser]["friends"], formText];
            setUsersData(newUsersData);
            setContacts([...contacts, ResolveUserInfo(formText)])
            setFormText("");
            props.onHide();
        }
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Form className="whiteBackGround noBorder">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Contact
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Contact's Identfier</Form.Label>
                        <Form.Control
                            value={formText}
                            type="text"
                            onChange={handleFormInputChange}/>
                    </Form.Group>
                    <div className="text-danger">{errorText}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleFormInputSubmit}>Add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
function getRandomNum() {
    var fromRang = 1;
    var toRange = 1000;
    var rand = fromRang + Math.random() * (toRange - fromRang);
    return rand;
}
