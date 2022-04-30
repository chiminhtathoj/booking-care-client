import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as action from "../../../store/actions/"
import Select from 'react-select';
import { LANGUAGES, DATEFORMAT } from "../../../utils/"
import DatePicker from "../../../components/Input/DatePicker"
import "./ManageSchedule.scss"
import { toast } from "react-toastify";
import _ from 'lodash';
import moment from 'moment';
import { createBulkScheduleAPI } from "../../../services/doctorService"
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
        const data = props.times.map((time, i) => {
            return (
                {
                    ...time,
                    isSelected: false
                }
            )
        })
        setRangeTime(data)
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
    const handleClickBtnTime = (time) => {
        if (rangeTime && rangeTime.length > 0) {
            const newRangeTime = rangeTime.map((value, i) => {
                if (value.id === time.id)
                    return {
                        ...value,
                        isSelected: !value.isSelected
                    }
                else
                    return value
            })
            setRangeTime(newRangeTime)
        }

    }
    const handleClickBtnSave = async () => {
        const result = []
        const dateFormated = moment(currentDate).startOf("day").valueOf();
        if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
            toast.error(<FormattedMessage id="manage-schedule.error-selected-doctor" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }

        if (!currentDate || !dateFormated || dateFormated === "Invalid date") {
            toast.error(<FormattedMessage id="manage-schedule.error-selected-date" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
        if (rangeTime && rangeTime.length > 0) {
            const selectedTime = rangeTime.filter((item) => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((itemSelected) => {
                    let obj = {}
                    obj.doctorId = selectedDoctor.value
                    obj.date = dateFormated
                    obj.typeDate = itemSelected.keyMap
                    result.push(obj)
                })
                try {
                    await createBulkScheduleAPI({
                        arrSchedule: result,
                        doctorId: selectedDoctor.value,
                        date: dateFormated
                    })
                    toast.success(<FormattedMessage id="manage-schedule.create-success" />, {
                        theme: "colored"
                    })
                } catch (error) {
                    toast.error(<FormattedMessage id="manage-schedule.error-create-fail" />, {
                        position: "top-center",
                        theme: "colored"
                    })
                }

            }
            else {
                toast.error(<FormattedMessage id="manage-schedule.error-selected-time" />, {
                    position: "top-center",
                    theme: "colored"
                })
                return
            }
        }
        else {
            toast.error(<FormattedMessage id="manage-schedule.error-selected-time" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
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
                            minDate={new Date(new Date().setDate(new Date().getDate() - 1))} // tru 1 day de lay day hien tai
                        />
                    </div>
                    <div className="col-12 choose-hour-container">
                        {rangeTime.map((time, i) => (
                            <button
                                className={time && time.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                key={i}
                                onClick={() => handleClickBtnTime(time)}
                            >
                                {props.language === LANGUAGES.VI ? time.valueVi : time.valueEn}
                            </button>
                        ))}
                    </div>
                    <div className="col-12">
                        <button
                            className="btn btn-primary px-2"
                            onClick={handleClickBtnSave}
                        >
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
