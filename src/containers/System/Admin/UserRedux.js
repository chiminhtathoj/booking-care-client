import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import { fetchGenderStart, fetchPositionStart, fetchRoleStart } from "../../../store/actions/adminAction"

function UserRedux(props) {

    const [genders, setGenders] = useState([])
    const [positions, setPositions] = useState([])
    const [roles, setRoles] = useState([])

    const prevGenders = useRef()
    const prevPositions = useRef()
    const prevRoles = useRef()
    useEffect(() => {
        props.getGenderStart()
        props.getPositionStart()
        props.getRoleStart()
    }, [])
    useEffect(() => {
        prevGenders.current = genders
        prevPositions.current = positions
        prevRoles.current = roles
        if (prevGenders.current !== props.genders) {
            setGenders(props.genders)
            console.log("gender", props.genders)
        }

        if (prevRoles.current !== props.roles) {
            setRoles(props.roles)
            console.log("role", props.roles)
        }
        if (prevPositions.current !== props.positions) {
            console.log("chiminhtathoj")
            setPositions(props.positions)
            console.log("position", props.positions)
        }
    }, [props.genders, props.positions, props.roles])
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
                            <input type="email" className="form-control" />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.password" /></label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.first-name" /></label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.last-name" /></label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.phone-number" /></label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-6">
                            <label htmlFor=""><FormattedMessage id="manage-user.address" /></label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.gender" /></label>
                            <select name="" id="" className="form-control">
                                {
                                    genders && genders.length > 0 &&
                                    genders.map((gender, index) => {
                                        return (<option key={index} value="">{gender.valueVi}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.position" /></label>
                            <select name="" id="" className="form-control">
                                {
                                    positions && positions.length > 0 &&
                                    positions.map((position, index) => {
                                        return (<option key={index} value="">{position.valueVi}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor=""><FormattedMessage id="manage-user.role" /></label>
                            <select name="" id="" className="form-control">
                                {
                                    roles && roles.length > 0 &&
                                    roles.map((role, index) => {
                                        return (<option key={index} value="">{role.valueVi}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor=""><FormattedMessage id="manage-user.image" /></label>
                            <div>
                                <input type="file" id="previewimg" />
                                <label htmlFor="previewimg">Tải ảnh</label>
                                <div className="preview-img">
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-3 ">
                            <button className="btn btn-primary px-3"><FormattedMessage id="manage-user.save" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(fetchGenderStart()),
        getPositionStart: () => dispatch(fetchPositionStart()),
        getRoleStart: () => dispatch(fetchRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
