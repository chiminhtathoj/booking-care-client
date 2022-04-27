import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DetailDoctor.scss"
import { getDetailDoctorByIdAPI } from "../../../services/doctorService"
import * as action from "../../../store/actions/"
import { LANGUAGES } from "../../../utils/"


function DetailDoctor(props) {

    const [detailDoctor, setDetailDoctor] = useState({})
    const [nameVi, setNameVi] = useState("")
    const [nameEn, setNameEn] = useState("")

    console.log("2")
    useEffect(() => {
        const data = async () => {
            console.log("1")

            const doctor = await getDetailDoctorByIdAPI(props.match.params.id)
            if (doctor && doctor.errCode === 0) {
                setDetailDoctor(doctor.data)
            }
        }
        data()

    }, [props.match.params.id])

    useEffect(() => {
        console.log("first tiem", props.language)
        if (detailDoctor && detailDoctor.positionData) {
            setNameVi(detailDoctor.positionData.valueVi + " " + detailDoctor.lastName + " " + detailDoctor.firstName)
            setNameEn(detailDoctor.positionData.valueEn + " " + detailDoctor.firstName + " " + detailDoctor.lastName)
            console.log(nameEn)
        }
    }, [props.language])
    return (
        <>
            <HomeHeader isShowBanner={false} />

            <div className="detail-doctor-banner">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={detailDoctor ? { backgroundImage: `url(${detailDoctor.image})` } : {}}
                    >

                    </div>
                    <div className="content-right">
                        <div className="up">
                            <h4>{props.language === LANGUAGES.VI ? nameVi : nameEn}</h4>
                        </div>
                        <div className="down">
                            {
                                detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                (<span>
                                    {detailDoctor.Markdown.description}
                                </span>)
                            }
                        </div>
                    </div>
                </div>
                <div className="book-doctor">

                </div>
                <div className="info-doctor">

                </div>
                <div className="comment-doctor">

                </div>
            </div>
        </>
    );
}
const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppReducer: (language) => dispatch(action.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);