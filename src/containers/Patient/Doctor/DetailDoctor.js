import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DetailDoctor.scss"
import { getDetailDoctorByIdAPI } from "../../../services/doctorService"
import * as action from "../../../store/actions/"
import { LANGUAGES } from "../../../utils/"
import DoctorSchedule from './DoctorSchedule';


function DetailDoctor(props) {

    const [detailDoctor, setDetailDoctor] = useState({})
    // const [nameVi, setNameVi] = useState("")
    // const [nameEn, setNameEn] = useState("")
    let nameVi = "", nameEn = ""

    useEffect(() => {
        const data = async () => {
            const doctor = await getDetailDoctorByIdAPI(props.match.params.id)
            if (doctor && doctor.errCode === 0) {
                setDetailDoctor(doctor.data)
            }
        }
        data()
    }, [props.match.params.id])


    useEffect(() => {
    }, [props.language])

    if (detailDoctor && detailDoctor.positionData) {
        nameVi = detailDoctor.positionData.valueVi + " " + detailDoctor.lastName + " " + detailDoctor.firstName
        nameEn = detailDoctor.positionData.valueEn + " " + detailDoctor.firstName + " " + detailDoctor.lastName
    }
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
                            <h2>{props.language === LANGUAGES.VI ? nameVi : nameEn}</h2>
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
                    <div className="content-left">
                        <DoctorSchedule />
                    </div>
                    <div className="content-right">

                    </div>
                </div>
                <div className="info-doctor">
                    {
                        detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                        (<div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                        </div>)
                    }
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
        changeLanguageAppReducer: (language) => dispatch(action.changeLanguageApp(language)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);