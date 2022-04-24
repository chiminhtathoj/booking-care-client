import { get } from 'lodash';
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getUsersAPI, createNewUserAPI, deleteUserAPI, editUserAPI } from "../../services/userService"
import "./UserManage.scss"
import { emitter } from "../../utils/emitter"
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

function UserManage() {
    const [users, setUsers] = useState([])
    const [showCreateUser, setShowCreateUser] = useState(false)
    const [showEditUser, setShowEditUser] = useState(false)
    const [userEdit, setUserEdit] = useState({})

    const getAllUsers = async () => {
        try {
            const data = await getUsersAPI("ALL")
            if (data && data.errCode === 0) {
                setUsers(data.users)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    const handleCloseNewUser = () => {
        setShowCreateUser(false)
    }
    const handleShowNewUser = () => {
        setShowCreateUser(true)
    }
    const handleCloseEditUser = () => {
        setShowEditUser(false)
    }
    const handleShowEditUser = (userEdit) => {
        setUserEdit(userEdit)
        setShowEditUser(true)
    }
    const createNewUser = async (dataUser) => {
        try {
            const newUser = await createNewUserAPI(dataUser)
            if (newUser && newUser.errCode === 0) {
                await getAllUsers()
                await setShowCreateUser(false) //setState bdb
                emitter.emit("EVENT_CLEAR_MODAL_DATA", { "id": "your id" })
            }
            else {
                alert(newUser.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteUser = async (userId) => {
        try {
            const userDeleted = await deleteUserAPI(userId)
            if (userDeleted && userDeleted.errCode === 0) {
                await getAllUsers()
            }
            else {
                alert(userDeleted.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleEditUser = async (userData) => {
        try {
            const userEdited = await editUserAPI(userData)
            if (userEdited && userEdited.errCode === 0) {
                await getAllUsers()
                await setShowEditUser(false)
            }
            else {
                alert(userEdited.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="users-container">
            <ModalUser
                show={showCreateUser}
                handleClose={handleCloseNewUser}
                handleShow={handleShowNewUser}
                createNewUser={createNewUser}

            />
            {showEditUser && <ModalEditUser
                show={showEditUser}
                handleClose={handleCloseEditUser}
                handleShow={handleShowEditUser}
                userEdit={userEdit}
                handleEditUser={handleEditUser}
            />}
            <div className="title text-center">Manage users</div>
            <div className="users-table mx-5 mt-5">
                <div className="btn btn-primary px-3" onClick={handleShowNewUser}>Add new user</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Address</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td className='td-icon'>
                                            <div className="btn-edit-user" >
                                                <i className="fa-solid fa-pen" style={{ color: "rgb(255, 102, 0)" }} onClick={() => handleShowEditUser(user)}></i>
                                            </div>
                                            <div className="btn-delete-user" >
                                                <i className="fa-solid fa-trash" style={{ color: "red" }} onClick={() => handleDeleteUser(user.id)}></i>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div >
    )
}
// class UserManage extends Component {

//     state = {

//     }

//     componentDidMount() {

//     }


//     render() {
//         return (
//             <div className="users-container">
//                 <div className="title text-center">Manage users</div>
//                 <div className="users-table">

//                 </div>
//             </div>
//         );
//     }

// }

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
