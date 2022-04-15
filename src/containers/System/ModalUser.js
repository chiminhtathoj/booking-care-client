import { Button, Modal } from 'react-bootstrap';
import React, { Component, useState, useEffect } from 'react';
import "./ModalUser.scss"
function ModalUser(props) {
    console.log(typeof props.handleClose)

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
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">First Name</label>
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Last Name</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">Address</label>
                            <input type="text" />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='px-3' onClick={props.handleClose}>
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