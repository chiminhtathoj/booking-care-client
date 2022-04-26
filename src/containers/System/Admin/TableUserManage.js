import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import "./TableUserManage.scss"
import * as action from "../../../store/actions/adminAction"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
function TableUserManage(props) {
    const [users, setUsers] = useState([])
    useEffect(() => {
        props.loadAllUser()
    }, [])
    useEffect(() => {
        setUsers(props.users)
    }, [props.users])

    const handleDeleteUser = (userId) => {
        props.deleteUser(userId)
    }

    const handleEditUserFromParent = (user) => {
        props.handleEditUser(user)
    }


    const mdParser = new MarkdownIt();

    // Finish!
    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
    }
    return (
        <table class="table table-user-manage">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Position</th>
                    <th scope="col">Role</th>
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
                                <td>{user.phoneNumber}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.address}</td>
                                <td>{user.gender}</td>
                                <td>{user.positionId}</td>
                                <td>{user.roleId}</td>
                                <td className='td-icon'>
                                    <div className="btn-edit-user" >
                                        <i className="fa-solid fa-pen" style={{ color: "rgb(255, 102, 0)" }}
                                            onClick={() => handleEditUserFromParent(user)}
                                        ></i>
                                    </div>
                                    <div className="btn-delete-user" >
                                        <i className="fa-solid fa-trash" style={{ color: "red" }}
                                            onClick={() => handleDeleteUser(user.id)}
                                        ></i>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

    )

}
const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllUser: () => dispatch(action.loadAllUser()),
        deleteUser: (userId) => dispatch(action.deleteUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);