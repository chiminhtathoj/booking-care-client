import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import "./DoctorExtraInfo.scss"
import * as action from "../../../store/actions/"
import { getExtraInfoDoctorById } from "../../../services/doctorService"
import { LANGUAGES } from "../../../utils/"
import 'moment/locale/vi' // dùng để sử dụng tiếng việt
import NumberFormat from 'react-number-format'; // format tien




function DoctorExtraInfo(props) {

    const [isShowExamDetail, setIsShowExamDetail] = useState(false)
    const [extraInfoDoctor, setExtraInfoDoctor] = useState("")

    useEffect(() => {
        const data = async () => {
            const res = await getExtraInfoDoctorById(props.doctorIdFromParent)
            if (res && res.errCode === 0)
                setExtraInfoDoctor(res.data)
        }
        data()
    }, [props.doctorIdFromParent])

    return (
        <div className="doctor-extra-info-container">
            <div className="content-up">
                <div className="title-info">
                    <FormattedMessage id="patient.extra-info-doctor.address-clinic" />
                </div>
                <div className="name-clinic">
                    {
                        extraInfoDoctor && extraInfoDoctor.nameClinic
                    }
                </div>
                <div className="address-clinic">
                    {
                        extraInfoDoctor && extraInfoDoctor.addressClinic
                    }
                </div>
            </div>
            <div className="content-down">
                {
                    isShowExamDetail && isShowExamDetail === true ?
                        (<div className='wrapper-detail'>
                            <div className="price-exam-title">
                                <FormattedMessage id="patient.extra-info-doctor.address-clinic" />
                            </div>
                            <div className="price-exam-detail">
                                <div className="detail-info">
                                    <div className="left">  <FormattedMessage id="patient.extra-info-doctor.price-exam" /></div>
                                    <div className="right">
                                        {
                                            extraInfoDoctor && extraInfoDoctor.priceData && props.language === LANGUAGES.VI &&
                                            <NumberFormat
                                                value={extraInfoDoctor.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {
                                            extraInfoDoctor && extraInfoDoctor.priceData && props.language === LANGUAGES.EN &&
                                            <NumberFormat
                                                value={extraInfoDoctor.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="note">
                                    {extraInfoDoctor && extraInfoDoctor.note}
                                </div>
                            </div>
                            <div className="note-patient">
                                <FormattedMessage id="patient.extra-info-doctor.note-patient" /> {
                                    props.language === LANGUAGES.VI ?
                                        extraInfoDoctor && extraInfoDoctor.paymentData && extraInfoDoctor.paymentData.valueVi :
                                        extraInfoDoctor && extraInfoDoctor.paymentData && extraInfoDoctor.paymentData.valueEn
                                }
                            </div>

                            <div className="hide-price" >
                                <span onClick={() => setIsShowExamDetail(false)}>
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                                </span>

                            </div>
                        </div>)
                        :
                        (<div className="wrapper">
                            <div className="price-exam-title">
                                <FormattedMessage id="patient.extra-info-doctor.price-exam" />:
                            </div>
                            <span className="price-vnd">
                                {
                                    extraInfoDoctor && extraInfoDoctor.priceData && props.language === LANGUAGES.VI &&
                                    <NumberFormat
                                        value={extraInfoDoctor.priceData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                }
                                {
                                    extraInfoDoctor && extraInfoDoctor.priceData && props.language === LANGUAGES.EN &&
                                    <NumberFormat
                                        value={extraInfoDoctor.priceData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                }
                            </span>
                            <div className="show-price">
                                <div className="show-price" >
                                    <span onClick={() => setIsShowExamDetail(true)}>
                                        <FormattedMessage id="patient.extra-info-doctor.show-price" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        )

                }


            </div>

        </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);