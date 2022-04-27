import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import * as action from "../../../store/actions/"
import { useHistory } from "react-router-dom";
import { LANGUAGES } from "../../../utils/"


function OutstandingDoctor(props) {
    let history = useHistory()
    const [arrDoctor, setArrDoctor] = useState([])
    useEffect(() => {
        props.getTopDoctorStart()
    }, [])
    useEffect(() => {
        setArrDoctor(props.topDoctors)
    }, [props.topDoctors])
    const handleOnClickOutstandingDoctor = (doctor) => {
        history.push(`/detail-doctor/${doctor.id}`)
        console.log(doctor)
    }

    return (
        <div className="section-share section-outstanding-doctor">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section"><FormattedMessage id="home-page.outstanding-doctor" /></span>
                    <button className="btn-section"><FormattedMessage id="home-page.more-info" /></button>
                </div>
                <div className="section-body">
                    <Slider {...props.settings}>

                        {arrDoctor && arrDoctor.length > 0 &&
                            arrDoctor.map((doctor, index) => {
                                let imgBase64 = ""
                                if (doctor.image) {
                                    imgBase64 = new Buffer.from(doctor.image, "base64").toString("binary");
                                }
                                const nameVi = doctor.positionData.valueVi + " " + doctor.lastName + " " + doctor.firstName
                                const nameEn = doctor.positionData.valueEn + " " + doctor.firstName + " " + doctor.lastName
                                return (
                                    < div className="section-customize " onClick={() => handleOnClickOutstandingDoctor(doctor)}>
                                        <div className="outer-border">
                                            <div className="outer-bg">
                                                <div className="section-img section-outstanding-doctor"
                                                    style={{
                                                        backgroundImage: `url(${imgBase64})`
                                                    }}
                                                />
                                            </div>
                                            <div className="outer-text text-center">
                                                <div>Cơ xương khớp</div>
                                                <div style={{
                                                    textTransform: "capitalize"
                                                }}>{props.language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                    </Slider>
                </div>

            </div >
        </div >
    )
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.doctor.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctorStart: () => dispatch(action.getTopDoctorStart()),
        changeLanguageAppReducer: (language) => dispatch(action.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);