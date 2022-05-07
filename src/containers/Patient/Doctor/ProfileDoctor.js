import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import * as action from "../../../store/actions/"
import "./ProfileDoctor.scss"
import { getProfileDoctorByIdAPI } from "../../../services/doctorService"
import { LANGUAGES } from "../../../utils/"
import 'moment/locale/vi' // dùng để sử dụng tiếng việt
import NumberFormat from 'react-number-format'; // format tien
import _ from 'lodash';
import moment from 'moment';



function ProfileDoctor(props) {

    const [dataProfile, setDataProfile] = useState({})
    useEffect(() => {
        getProfileDoctor(props.idDoctor)
    }, [props.idDoctor])
    useEffect(() => {
        console.log(dataProfile)
        console.log("data type", props.dataScheduleDoctor)
    }, [dataProfile])

    const getProfileDoctor = async (id) => {
        let result = {}
        if (id) {
            const res = await getProfileDoctorByIdAPI(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        setDataProfile(result)
    }
    let nameVi = "", nameEn = ""
    if (dataProfile && dataProfile.positionData) {
        nameVi = dataProfile.positionData.valueVi + " " + dataProfile.lastName + " " + dataProfile.firstName
        nameEn = dataProfile.positionData.valueEn + " " + dataProfile.firstName + " " + dataProfile.lastName
    }

    const renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            const time = props.language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            const date = props.language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
                :
                moment.unix(+dataTime.date / 1000).locale("en").format("ddd - MM/DD/YYYY")
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.freeBooking" /></div>
                </>
            )
        }
    }


    return (
        <div className="profile-doctor-container">


            <div className="intro-doctor">
                <div
                    className="content-left"
                    style={dataProfile ? { backgroundImage: `url(${dataProfile.image})` } : {}}
                >
                </div>

                <div className="content-right">
                    <div className="up">
                        <h2>{props.language === LANGUAGES.VI ? nameVi : nameEn}</h2>
                    </div>
                    {
                        props.isShowDescription ?
                            <div className="down">
                                {
                                    dataProfile.Markdown && dataProfile.Markdown.description &&
                                    (<span>
                                        {dataProfile.Markdown.description}
                                    </span>)
                                }
                            </div>
                            :
                            <>
                                {renderTimeBooking(props.dataScheduleDoctor)}
                            </>
                    }

                </div>

            </div>

            <div className="price">
                <FormattedMessage id="patient.booking-modal.priceBooking" />
                {
                    dataProfile && dataProfile.Doctor_Info && dataProfile.Doctor_Info.priceData && props.language === LANGUAGES.VI &&

                    <NumberFormat
                        value={dataProfile.Doctor_Info.priceData.valueVi}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'VND'}
                    />
                }
                {
                    dataProfile && dataProfile.Doctor_Info && dataProfile.Doctor_Info.priceData && props.language === LANGUAGES.EN &&
                    <NumberFormat
                        value={dataProfile.Doctor_Info.priceData.valueEn}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'$'}
                    />
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);