import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as action from "../../../store/actions/"
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTION } from "../../../utils/"
import DatePicker from "../../../components/Input/DatePicker"
import "./ManageSchedule.scss"


function ManageSchedule(props) {
    const [selectedDoctor, setSelectedDoctor] = useState({})
    const [allDoctors, setallDoctors] = useState([])
    const [rangeTime, setRangeTime] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    useEffect(() => {
        props.getAllDoctorStart()
        props.fetchTimeStart()
    }, [])
    useEffect(() => {
        setallDoctors(props.allDoctors)
    }, [props.allDoctors])
    useEffect(() => {
        setRangeTime(props.times)
    }, [props.times])
    const handleOptionSelect = (inputData) => {
        let result = []
        if (inputData && inputData.length > 0) {
            inputData.map((input, index) => {
                let obj = {}
                let labelVi = `${input.lastName} ${input.firstName}`
                let labelEn = `${input.firstName} ${input.lastName}`
                obj.label = props.language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = input.id
                result.push(obj)
            })

        }

        return result
    }
    const handleOnChangeSelect = (selected) => {
        setSelectedDoctor(selected)
    }
    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date[0])
    }

    return (
        <div className="manage-schedule-container">
            <div className="manage-schedule-title title">
                <FormattedMessage id="manage-schedule.title" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="manage-schedule.choose-doctor" />
                        </label>
                        <Select
                            defaultValue={selectedDoctor}
                            onChange={handleOnChangeSelect}
                            options={handleOptionSelect(allDoctors)}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="">
                            <FormattedMessage id="manage-schedule.choose-date" />
                        </label>
                        <DatePicker
                            onChange={handleOnChangeDatePicker}
                            className="form-control"
                            value={currentDate}
                            minDate={new Date()}
                        />
                    </div>
                    <div className="col-12 choose-hour-container">
                        {rangeTime.map((time, i) => (
                            <button className="btn" key={i}>
                                {props.language === LANGUAGES.VI ? time.valueVi : time.valueEn}
                            </button>
                        ))}
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary px-2">
                            <FormattedMessage id="manage-schedule.save" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.doctor.allDoctors,
        times: state.admin.times,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorStart: () => dispatch(action.getAllDoctorStart()),
        fetchTimeStart: () => dispatch(action.fetchTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
