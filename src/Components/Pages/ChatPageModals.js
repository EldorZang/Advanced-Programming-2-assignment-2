import Modal from 'react-bootstrap/Modal'
import React, { useState, useContext, useEffect,useRef } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {ActiveUserContext, LoggedUserContext, forceUpdateContext} from './ChatPageComponents.js'
import { serverApiPath, serverPath } from '../../App.js'
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

export function AddContactModal(props) {
    const isMounted = useRef(false);
    const [formId, setFormId] = useState("");
    const [formNickName, setFormNickName] = useState("");
    const [formServer, setFormServer] = useState("");
    const [submit, setSubmit] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    var loggedUser = props.loggedUser;
    useEffect( () =>{
        async function fetchData(){
        if (!isMounted.current){
            isMounted.current = true;
            return;
        }
        if(submit == false){
            return;
        }
        // add to current server
        var requestOptionsCurrServer = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: formId,
                                    name: formNickName,
                                    server: formServer})
        };
        var addToCurrServer = await fetch(serverApiPath+'contacts?loggedUserId='+loggedUser, requestOptionsCurrServer);
        // add to contact's server (with invite)
        var requestOptionsInvite = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  from: loggedUser,
                                    to: formId,
                                    server: serverPath
                                    })
        };
        var inviteToContactServer = await fetch(formServer+'/api/invitations', requestOptionsInvite);
        setFormId("");
        setFormNickName("");
        setFormServer("");
        setSubmitted(true);
    }
    fetchData();
    },[submit])
    // call after submit complete
    useEffect(()=>{
        if(submitted == true){
            setSubmit(false);
            setSubmitted(false);
            props.onHide();
        }
    },[submitted])
    const handleFormIdChange = (e) => {
        e.preventDefault();
        setFormId(e.target.value);
    };
    const handleFormNickNameChange = (e) => {
        e.preventDefault();
        setFormNickName(e.target.value);
    };
    const handleFormServerChange = (e) => {
        e.preventDefault();
        setFormServer(e.target.value);
    };
    const handleFormInputSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
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
                            value={formId}
                            type="text"
                            onChange={handleFormIdChange}/>
                        <Form.Label>Contact's NickName</Form.Label>
                        <Form.Control
                            value={formNickName}
                            type="text"
                            onChange={handleFormNickNameChange}/>
                        <Form.Label>Contact's Server</Form.Label>
                        <Form.Control
                            value={formServer}
                            type="text"
                            onChange={handleFormServerChange}/>    
                    </Form.Group>
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
