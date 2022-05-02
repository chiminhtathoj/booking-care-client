import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import HomeHeader from '../../HomePage/HomeHeader';
import "./BookingModal.scss"
import { getDetailDoctorByIdAPI } from "../../../services/doctorService"
import * as action from "../../../store/actions/"
import { LANGUAGES } from "../../../utils/"

function BookingModal(props) {

    return (
        <div className="booking-modal-container">
            chiminhtathoj
        </div>
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