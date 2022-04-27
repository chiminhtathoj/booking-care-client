import actionTypes from '../actions/actionTypes';

const initialState = {
    topDoctors: [],
    allDoctors: []
}

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        //get top doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            let stateDoctorTop = { ...state }
            stateDoctorTop.topDoctors = action.doctorsData
            return {
                ...stateDoctorTop,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            let stateDoctorTopClone = { ...state }
            stateDoctorTopClone.topDoctors = []
            return {
                ...stateDoctorTopClone,
            }
        //get all doctor
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            let stateAllDoctor = { ...state }
            stateAllDoctor.allDoctors = action.allDoctorData
            return {
                ...stateAllDoctor,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            let stateAllDoctorClone = { ...state }
            stateAllDoctorClone.allDoctors = []
            return {
                ...stateAllDoctorClone,
            }
        default:
            return state

    }
}

export default doctorReducer;