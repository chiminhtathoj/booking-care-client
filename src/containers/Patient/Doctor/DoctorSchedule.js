import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss"
import { getScheduleDoctorByIdAndDateAPI } from "../../../services/doctorService"
import * as action from "../../../store/actions/"
import { LANGUAGES } from "../../../utils/"
import Select from 'react-select';
import moment from 'moment'
import 'moment/locale/vi' // dùng để sử dụng tiếng việt



function DoctorSchedule(props) {

    const [arrDate, setArrDate] = useState([])
    const [timeAvailble, setTimeAvailble] = useState([])
    useEffect(() => {
        loadArrDate()
    }, [])
    useEffect(() => {
        loadArrDate()
    }, [props.language])
    const loadArrDate = () => {
        const arrDate = []
        for (let i = 0; i < 7; ++i) {
            let obj = {}
            if (props.language === LANGUAGES.VI)
                obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM")
            else
                obj.label = moment(new Date()).add(i, "days").locale("en").format("dddd - DD/MM")
            obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
            arrDate.push(obj)
        }
        setArrDate(arrDate)
    }
    const hanldeOnChangeSelect = async (e) => {
        if (props.doctorIdFromParent && props.doctorIdFromParent !== -1) {
            const doctorId = props.doctorIdFromParent
            const date = e.target.value
            const res = await getScheduleDoctorByIdAndDateAPI(doctorId, date)
            console.log(res)
            if (res && res.errCode === 0) {
                if (res.data && res.data.length > 0)
                    setTimeAvailble(res.data)
                else
                    setTimeAvailble([])
            }
        }
    }
    return (
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
                    <span> Lịch khám</span>
                </div>
                <div className="time-content">
                    {timeAvailble && timeAvailble.length > 0 ?
                        timeAvailble.map((item, i) => (
                            <button className="btn-time" key={i}>
                                {props.language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                            </button>
                        ))
                        :
                        <span>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác.</span>
                    }
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);