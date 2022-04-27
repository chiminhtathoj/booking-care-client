import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import "./ModalUser"
function ModalEditUser(props) {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [id, setId] = useState()

    useEffect(() => {
        setEmail(props.userEdit.email)
        setFirstName(props.userEdit.firstName)
        setLastName(props.userEdit.lastName)
        setAddress(props.userEdit.address)
        setId(props.userEdit.id)
    }, [])


    const handleOnChangeInput = (e, setState) => {
        setState(e.target.value)
    }

    const validateInput = () => {
        let isValidate = true;
        const objInput = { email, firstName, lastName, address }
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
    const handleOnClickEdit = () => {
        if (validateInput()) {
            props.handleEditUser({ id, email, firstName, lastName, address })
        }
    }
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
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Address</label>
                            <input
                                type="text"
                                onChange={(e) => handleOnChangeInput(e, setAddress)}
                                value={address}
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

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='px-3' onClick={handleOnClickEdit}>
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
export default ModalEditUser