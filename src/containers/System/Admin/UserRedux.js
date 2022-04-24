import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import * as action from "../../../store/actions/adminAction"
import "./UserRedux.scss"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUserManage from './TableUserManage';

function UserRedux(props) {

    const [genders, setGenders] = useState([])
    const [positions, setPositions] = useState([])
    const [roles, setRoles] = useState([])
    const [img, setImg] = useState("")
    const [isOpenImg, setIsOpenImg] = useState(false)
    const [inputs, setInputs] = useState({})

    useEffect(() => {
        props.getGenderStart()
        props.getPositionStart()
        props.getRoleStart()

    }, [])
    // load du lieu tu redux len xong gan vao state,cai dat mat dinh cho select down
    useEffect(() => {
        setGenders(props.genders)
        setRoles(props.roles)
        setPositions(props.positions)
        if (props.genders && props.genders.length > 0)
            setInputs(prevState => ({
                ...prevState,
                gender: props.genders[0].key
            }))
        if (props.positions && props.positions.length > 0)
            setInputs(prevState => ({
                ...prevState,
                positionId: props.positions[0].key
            }))
        if (props.roles && props.roles.length > 0)
            setInputs(prevState => ({
                ...prevState,
                roleId: props.roles[0].key
            }))
    }, [props.genders, props.positions, props.roles])

    useEffect(() => {
        const arrInput = ["email", "password", "phoneNumber", "firstName", "lastName", "address", "image", "positionId", "roleId"]
        for (let i = 0; i < arrInput.length; i++) {
            if (arrInput[i] === "positionId")
                setInputs(prevState => ({
                    ...prevState,
                    [arrInput[i]]: "P0"
                }))
            else if (arrInput[i] === "roleId")
                setInputs(prevState => ({
                    ...prevState,
                    [arrInput[i]]: "R1"
                }))
            else
                setInputs(prevState => ({
                    ...prevState,
                    [arrInput[i]]: ""
                }))
        }
    }, [props.users])

    const handleOnChangeImg = (e) => {
        const data = e.target.files
        const img = data[0] // lay thang dau tien thoi
        if (img) {
            const objectUrl = URL.createObjectURL(img);
            setImg(objectUrl)
        }
        console.log("onchangeimg", inputs)

    }
    const handleOnChangePreview = (e) => {
        if (img) {
            setIsOpenImg(true)
        }
    }
    const handleOnChangeInput = (e) => {
        console.log(e.target)
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const checkValidate = () => {
        let isValid = true;
        const arrInput = ["email", "password", "phoneNumber", "firstName", "lastName", "address"]
        for (let i = 0; i < arrInput.length; i++) {
            if (!inputs[arrInput[i]]) {
                alert(arrInput[i] + " must be not empty")
                isValid = false
                break;
            }
        }
        return isValid
    }
    const handleSaveUser = () => {
        if (checkValidate()) {
            console.log("handle save", inputs)
            props.createNewUser({
                email: inputs.email,
                phoneNumber: inputs.phoneNumber,
                password: inputs.password,
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                address: inputs.address,
                gender: inputs.gender,
                roleId: inputs.roleId,
                positionId: inputs.positionId,
                image: inputs.image
            })
        }
    }

    //lay du lieu tu` con xong load cho cha
    const handleEditUser = (user) => {
        if (user) {
            console.log(user)
            setInputs({
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: "dont try to see",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                gender: user.gender,
                roleId: user.roleId,
                positionId: user.positionId,
                image: user.image
            })
        }
    }

    return (
        <div className="user-redux-container">
            <div className="title user-redux-title">
                <FormattedMessage id="manage-user.title" />
            </div>
            <div className="user-redux-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12 my-3"><FormattedMessage id="manage-user.add" /> </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.email" /></label>
                            <input type="email" className="form-control"
                                name="email"
                                value={inputs.email}
                                onChange={handleOnChangeInput}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.password" /></label>
                            <input type="password" className="form-control"
                                name="password"
                                value={inputs.password}
                                onChange={handleOnChangeInput}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.first-name" /></label>
                            <input type="text" className="form-control"
                                name="firstName"
                                value={inputs.firstName}
                                onChange={handleOnChangeInput}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.last-name" /></label>
                            <input type="text" className="form-control"
                                name="lastName"
                                value={inputs.lastName}
                                onChange={handleOnChangeInput}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.phone-number" /></label>
                            <input type="text" className="form-control"
                                name="phoneNumber"
                                value={inputs.phoneNumber}
                                onChange={handleOnChangeInput}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor=""><FormattedMessage id="manage-user.address" /></label>
                            <input type="text" className="form-control"
                                name="address"
                                value={inputs.address}
                                onChange={handleOnChangeInput}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.gender" /></label>
                            <select id="" className="form-control"
                                name="gender"
                                value={inputs.gender}
                                onChange={handleOnChangeInput}
                            >
                                {
                                    genders && genders.length > 0 &&
                                    genders.map((gender, index) => {
                                        return (<option key={index} value={gender.key}>{gender.valueVi}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.position" /></label>
                            <select id="" className="form-control"
                                name="positionId"
                                value={inputs.positionId}

                                onChange={handleOnChangeInput}
                            >
                                {
                                    positions && positions.length > 0 &&
                                    positions.map((position, index) => {
                                        return (<option key={index} value={position.key}>{position.valueVi}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.role" /></label>
                            <select id="" className="form-control"
                                name="roleId"
                                value={inputs.roleId}
                                onChange={handleOnChangeInput}
                            >
                                {
                                    roles && roles.length > 0 &&
                                    roles.map((role, index) => {
                                        return (<option key={index} value={role.key}>{role.valueVi}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.image" /></label>
                            <div className="preview-img-container">
                                <input type="file" id="previewimg" hidden
                                    name="avatar"
                                    value={inputs.avatar}
                                    onChange={(e) => {
                                        handleOnChangeImg(e)
                                        handleOnChangeInput(e)
                                    }
                                    }
                                />
                                <label htmlFor="previewimg" className="label-img">Tải ảnh <i class="fa-solid fa-upload"></i></label>

                            </div>
                        </div>
                        <div className="col-3">
                            <div className="preview-img"
                                style={{ backgroundImage: `url(${img})` }}
                                onClick={(e) => handleOnChangePreview(e)}
                            >

                            </div>
                        </div>
                        <div className="col-12 mt-3 ">
                            <button
                                className="btn btn-primary px-3"
                                onClick={handleSaveUser}

                            ><FormattedMessage id="manage-user.save" /></button>
                        </div>
                        <div className="col-12 my-5">
                            <TableUserManage handleEditUser={handleEditUser} />
                        </div>
                    </div>

                </div>

            </div>



            {isOpenImg && (
                <Lightbox
                    mainSrc={img}
                    onCloseRequest={() => setIsOpenImg(false)}
                />
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        users: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(action.fetchGenderStart()),
        getPositionStart: () => dispatch(action.fetchPositionStart()),
        getRoleStart: () => dispatch(action.fetchRoleStart()),
        createNewUser: (data) => dispatch(action.createNewUser(data)),
        loadAllUser: () => dispatch(action.loadAllUser()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
