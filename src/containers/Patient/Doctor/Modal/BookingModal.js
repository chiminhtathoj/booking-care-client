import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss"
import * as action from "../../../../store/actions/"
import { LANGUAGES } from "../../../../utils/"
import { Modal } from "reactstrap"

function BookingModal(props) {

    useEffect(() => {
        console.log(props.dataScheduleDoctor)
    }, [])
    return (
        <Modal
            isOpen={props.isOpenModalBooking}
            className={"booking-modal-container"}
            size="lg"
            centered
        >
            <div className="booking-modal-content">
                <div className="booking-modal-header">
                    <span className="left">Thông tin đặt lịch khám bênh:</span>
                    <span className="right" onClick={props.handleCloseModal}><i className="fa-solid fa-xmark"></i></span>
                </div>
                <div className="booking-modal-body">
                    <div className="doctor-info">

                    </div>
                    <div className="price">
                        Giá khám 500000 vnd
                    </div>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">Họ tên</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Số điện thoại</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Địa chỉ email</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Địa chỉ liên hệ</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Lý do khám</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Đặt cho ai</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Giới tính</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                </div>
                <div className="booking-modal-footer">
                    <button className="btn-cancel btn btn-danger" onClick={props.handleCloseModal}>Hủy</button>
                    <button className="btn-confirm btn btn-primary" onClick={props.handleCloseModal}>Xác Nhận</button>
                </div>
            </div>
        </Modal>
    );
}
const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppReducer: (language) => dispatch(action.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);