import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import { CRUD_ACTION } from "../../../utils/constant"
import CommonUtils from "../../../utils/CommonUtils"
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
    const [action, setAction] = useState("")

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
                gender: props.genders[0].keyMap
            }))
        if (props.positions && props.positions.length > 0)
            setInputs(prevState => ({
                ...prevState,
                positionId: props.positions[0].keyMap
            }))
        if (props.roles && props.roles.length > 0)
            setInputs(prevState => ({
                ...prevState,
                roleId: props.roles[0].keyMap
            }))
    }, [props.genders, props.positions, props.roles])

    useEffect(() => {

        setAction(CRUD_ACTION.CREATE)

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

    const handleOnChangeImg = async (e) => {
        const data = e.target.files
        const file = data[0] // lay thang dau tien thoi
        if (file) {
            const base64 = await CommonUtils.getBase64(file)
            const objectUrl = URL.createObjectURL(file);
            setImg(objectUrl)
            setInputs(prevState => ({
                ...prevState,
                image: base64
            }))

        }

    }
    const handleOnChangePreview = (e) => {
        if (img) {
            setIsOpenImg(true)
        }
    }
    const handleOnChangeInput = (e) => {
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
        if (action === CRUD_ACTION.CREATE) {
            if (checkValidate()) {
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
                setImg("")
            }
        }
        if (action === CRUD_ACTION.EDIT) {
            if (checkValidate()) {
                props.editUser({ ...inputs })
                setImg("")

            }
        }
    }

    //lay du lieu tu` con xong load cho cha
    const handleButtonEditUser = (user) => {
        let imgBase64 = ""
        if (user.image) {
            imgBase64 = new Buffer.from(user.image, "base64").toString("binary");
        }
        if (user) {
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
                image: imgBase64,
                id: user.id

            })
            setImg(imgBase64)
            setAction(CRUD_ACTION.EDIT)
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
                                disabled={action && action === CRUD_ACTION.EDIT ? true : false}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.password" /></label>
                            <input type="password" className="form-control"
                                name="password"
                                value={inputs.password}
                                onChange={handleOnChangeInput}
                                disabled={action && action === CRUD_ACTION.EDIT ? true : false}
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
                                        return (<option key={index} value={gender.keyMap}>{gender.valueVi}</option>)
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
                                        return (<option key={index} value={position.keyMap}>{position.valueVi}</option>)
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
                                        return (<option key={index} value={role.keyMap}>{role.valueVi}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.image" /></label>
                            <div className="preview-img-container">
                                <input type="file" id="previewimg" hidden
                                    name="image"
                                    // value={inputs.image}
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
                                className={action === CRUD_ACTION.EDIT ? "btn btn-info px-3" : "btn btn-primary px-3"}
                                onClick={handleSaveUser}
                            >
                                {
                                    action === CRUD_ACTION.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.create" />
                                }
                            </button>
                        </div>
                        <div className="col-12 my-5">
                            <TableUserManage
                                handleEditUser={handleButtonEditUser}
                                action={action}
                            />
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
        editUser: (userData) => dispatch(action.editUser(userData))


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
