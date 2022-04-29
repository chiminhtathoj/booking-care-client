import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { emitter } from "../../utils/emitter"
import "./ModalUser.scss"
function ModalUser(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const handleOnChangeInput = (e, setState) => {
        setState(e.target.value)
    }

    const listenEmitter = () => {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            //reset state after input
            setEmail("")
            setPassword("")
            setFirstName("")
            setLastName("")
            setAddress("")

        })
    }

    const validateInput = () => {
        let isValidate = true;
        const objInput = { email, password, firstName, lastName, address }
        for (const key in objInput) {
            if (Object.hasOwnProperty.call(objInput, key)) {
                if (!objInput[key]) {
                    isValidate = false
                    alert("missing input: " + key)
                    break;
                }
            }
        }
        return isValidate
    }

    const handleOnClickAdd = () => {
        if (validateInput()) {
            props.createNewUser({ email, password, firstName, lastName, address })
        }
    }

    useEffect(() => {
        listenEmitter()
        return () => emitter.removeListener("EVENT_CLEAR_MODAL_DATA", listenEmitter)
    }, [])
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                size="lg"
                dialogClassName="modal-user-container"
            >
                <Modal.Header >
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input
                                type="text"
                                onChange={(e) => handleOnChangeInput(e, setEmail)}
                                value={email}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input
                                type="text"
                                onChange={(e) => handleOnChangeInput(e, setPassword)}
                                value={password}
                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">First Name</label>
                            <input
                                type="text"
                                onChange={(e) => handleOnChangeInput(e, setFirstName)}
                                value={firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Last Name</label>
                            <input
                                type="text"
                                onChange={(e) => handleOnChangeInput(e, setLastName)}
                                value={lastName}

                            />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">Address</label>
                            <input
                                type="text"
                                onChange={(e) => handleOnChangeInput(e, setAddress)}
                                value={address}
                            />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='px-3' onClick={handleOnClickAdd}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" className='px-3' onClick={props.handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUser