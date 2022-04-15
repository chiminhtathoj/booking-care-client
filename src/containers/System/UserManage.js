import { get } from 'lodash';
import React, { Component, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getUsersAPI } from "../../services/userService"
import "./UserManage.scss"
import ModalUser from './ModalUser';

function UserManage() {
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getUsersAPI("ALL")
                if (data && data.errCode === 0) {
                    setUsers(data.users)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }

    return (
        <div className="users-container">
            <ModalUser show={show} handleClose={handleClose} handleShow={handleShow} />
            <div className="title text-center">Manage users</div>
            <div className="users-table mx-5 mt-5">
                <div className="btn btn-primary px-3" onClick={handleShow}>Add new user</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
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
                                        <td className='td-icon'>
                                            <div className="btn-edit-user" >
                                                <i className="fa-solid fa-pen" style={{ color: "rgb(255, 102, 0)" }}></i>
                                            </div>
                                            <div className="btn-delete-user" >
                                                <i className="fa-solid fa-trash" style={{ color: "red" }}></i>
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
