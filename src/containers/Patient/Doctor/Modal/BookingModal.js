import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss"
import * as action from "../../../../store/actions/"
import { LANGUAGES } from "../../../../utils/"
import { Modal } from "reactstrap"
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import _ from 'lodash';
import Select from 'react-select';
import { postPatientBookingAppointment } from "../../../../services/userService"
import { toast } from "react-toastify";
function BookingModal(props) {

    const [idDoctor, setIdDoctor] = useState("")
    const [objInfo, setObjInfo] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        reason: "",
        birthday: "",
        selectedGender: "",
        genders: "",
        doctorId: "",
        timeType: ""
    })

    useEffect(() => {
        props.getGenderStart()
    }, [])
    useEffect(() => {
        setObjInfo({
            ...objInfo,
            genders: buildDataGender(props.genders)
        })
    }, [props.genders, props.language])
    useEffect(() => {
        setIdDoctor(props.dataScheduleDoctor.doctorId)
        setObjInfo({
            ...objInfo,
            doctorId: idDoctor,
            timeType: props.dataScheduleDoctor.typeDate
        })
    }, [props.dataScheduleDoctor])
    //setIdDoctor(props.dataScheduleDoctor.idDoctor)

    const handleChangeInput = (e, id) => {
        const valueInput = e.target.value
        setObjInfo({
            ...objInfo,
            [id]: valueInput
        })

    }
    const handleOnChangeDatePicker = (date) => {
        setObjInfo({
            ...objInfo,
            birthday: date[0]
        })
    }
    const buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let obj = {}
                obj.label = props.language === LANGUAGES.VI ? item.valueVi : item.valueEn
                obj.value = item.keyMap
                result.push(obj)
            })
        }
        return result
    }
    const handleChangeSelect = (selectedOption) => {
        setObjInfo({
            ...objInfo,
            selectedGender: selectedOption
        })
    }
    const handleConfirmBooking = async () => {
        const date = new Date(objInfo.birthday).getTime()
        const res = await postPatientBookingAppointment({
            fullName: objInfo.fullName,
            phoneNumber: objInfo.phoneNumber,
            email: objInfo.email,
            address: objInfo.address,
            reason: objInfo.reason,
            date: date,
            selectedGender: objInfo.selectedGender.value,
            doctorId: idDoctor,
            timeType: objInfo.timeType,
        })
        if (res && res.errCode === 0) {
            toast.success("Booking successed!", {
                theme: "colored"
            });
            props.handleCloseModal()
        }
        else {
            toast.error("Booking failed!", {
                theme: "colored"
            });
        }
    }
    return (
        <Modal
            isOpen={props.isOpenModalBooking}
            className={"booking-modal-container"}
            size="lg"
            centered
        >
            <div className="booking-modal-content">
                <div className="booking-modal-header">
                    <span className="left"><FormattedMessage id="patient.booking-modal.title" /></span>
                    <span className="right" onClick={props.handleCloseModal}><i className="fa-solid fa-xmark"></i></span>
                </div>
                <div className="booking-modal-body">
                    <div className="doctor-info">
                        <ProfileDoctor
                            idDoctor={idDoctor}
                            isShowDescription={false}
                            dataScheduleDoctor={props.dataScheduleDoctor}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id="patient.booking-modal.fullName" /></label>
                            <input
                                type="text"
                                className="form-control"
                                value={objInfo.fullName}
                                onChange={(e) => handleChangeInput(e, "fullName")}

                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                            <input
                                type="text"
                                className="form-control"
                                value={objInfo.phoneNumber}
                                onChange={(e) => handleChangeInput(e, "phoneNumber")}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id="patient.booking-modal.email" /></label>
                            <input
                                type="text"
                                className="form-control"
                                value={objInfo.email}
                                onChange={(e) => handleChangeInput(e, "email")}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id="patient.booking-modal.address" /></label>
                            <input
                                type="text"
                                className="form-control"
                                value={objInfo.address}
                                onChange={(e) => handleChangeInput(e, "address")}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id="patient.booking-modal.reason" /></label>
                            <input
                                type="text"
                                className="form-control"
                                value={objInfo.reason}
                                onChange={(e) => handleChangeInput(e, "reason")}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id="patient.booking-modal.birthday" /></label>
                            <DatePicker
                                onChange={handleOnChangeDatePicker}
                                className="form-control"
                                value={objInfo.birthday}
                                minDate={new Date(new Date().setDate(new Date().getDate() - 1))} // tru 1 day de lay day hien tai
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id="patient.booking-modal.gender" /></label>
                            <Select
                                value={objInfo.selectedGender}
                                onChange={handleChangeSelect}
                                options={objInfo.genders}
                            />
                        </div>
                    </div>

                </div>
                <div className="booking-modal-footer">
                    <button className="btn-cancel btn btn-danger" onClick={props.handleCloseModal}><FormattedMessage id="patient.booking-modal.btnCancel" /></button>
                    <button className="btn-confirm btn btn-primary" onClick={handleConfirmBooking}><FormattedMessage id="patient.booking-modal.btnConfirm" /></button>
                </div>
            </div>
        </Modal>
    );
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppReducer: (language) => dispatch(action.changeLanguageApp(language)),
        getGenderStart: () => dispatch(action.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);