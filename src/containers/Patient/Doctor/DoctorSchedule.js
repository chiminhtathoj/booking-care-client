import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import "./DoctorSchedule.scss"
import { getScheduleDoctorByIdAndDateAPI } from "../../../services/doctorService"
import * as action from "../../../store/actions/"
import { LANGUAGES } from "../../../utils/"
import moment from 'moment'
import 'moment/locale/vi' // dùng để sử dụng tiếng việt
import BookingModal from './Modal/BookingModal';



function DoctorSchedule(props) {

    const [arrDate, setArrDate] = useState([]) //7 ngay tiep theo
    const [timeAvailable, setTimeAvailable] = useState([])
    const [isOpenModalBooking, setIsOpenModalBooking] = useState(false)
    const [dataScheduleDoctor, setDataScheduleDoctor] = useState("")
    useEffect(() => {
        loadArrDate()
    }, [])
    useEffect(() => {
        loadArrDate()
    }, [props.language])
    //goi ham nay de khi mới vào thì load luôn ngày đầu tiên,và đồng bộ từ data thằng cha
    useEffect(() => {
        const today = moment(new Date()).startOf("day").valueOf() // lay ngay hom nay
        getTimeAvailable(props.doctorIdFromParent, today)
    }, [props.doctorIdFromParent])
    const loadArrDate = () => {
        const arrDate = []
        for (let i = 0; i < 7; ++i) {
            let obj = {}
            if (props.language === LANGUAGES.VI)
                obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM") //tieng viet
            else
                obj.label = moment(new Date()).add(i, "days").locale("en").format("dddd - DD/MM") // tieng anh
            obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf(); // format de luu vao database
            arrDate.push(obj)
        }
        setArrDate(arrDate)
    }
    const getTimeAvailable = async (doctorId, date) => {
        const res = await getScheduleDoctorByIdAndDateAPI(doctorId, date)
        if (res && res.errCode === 0) {
            if (res.data && res.data.length > 0)
                setTimeAvailable(res.data)
            else
                setTimeAvailable([])
        }

    }
    const hanldeOnChangeSelect = (e) => {
        if (props.doctorIdFromParent && props.doctorIdFromParent !== -1) {
            const doctorId = props.doctorIdFromParent
            const date = e.target.value
            getTimeAvailable(doctorId, date)
        }
    }
    const handleClickBtnTime = (item) => {
        console.log(item)
        setDataScheduleDoctor(item)
        setIsOpenModalBooking(true)
    }
    const handleCloseModal = () => {
        setIsOpenModalBooking(false)
    }
    return (
        <>
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select
                        name=""
                        id=""
                        onChange={(e) => hanldeOnChangeSelect(e)}
                    >
                        {
                            arrDate && arrDate.length > 0 &&
                            arrDate.map((item, i) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={i}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="available-time">
                    <div className="text-calendar">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                    </div>
                    <div className="time-content">
                        {timeAvailable && timeAvailable.length > 0 ?
                            <>
                                <div className="time-content-btn">
                                    {timeAvailable.map((item, i) => (
                                        <button
                                            className="btn-time"
                                            key={i}
                                            onClick={() => handleClickBtnTime(item)}
                                        >
                                            {props.language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                        </button>
                                    ))}
                                </div>
                                <div className="book-free">
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                        <i className="far fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </div>
                            </>
                            :
                            <span><FormattedMessage id="patient.detail-doctor.non-schedule" /></span>

                        }
                    </div>

                </div>
            </div >
            <BookingModal
                isOpenModalBooking={isOpenModalBooking}
                handleCloseModal={handleCloseModal}
                dataScheduleDoctor={dataScheduleDoctor}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);