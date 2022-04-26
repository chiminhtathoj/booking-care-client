import actionTypes from '../actions/actionTypes';

const initialState = {
    topDoctors: []
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
        default:
            return state

    }
}

export default doctorReducer;