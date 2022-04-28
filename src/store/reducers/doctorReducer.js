import actionTypes from '../actions/actionTypes';

const initialState = {
    topDoctors: [],
    allDoctors: [],
    markdownDoctor: null
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
        //get markdown doctor
        case actionTypes.FETCH_MARKDOWN_DOCTOR_SUCCESS:
            let stateDoctorMarkdown = { ...state }
            stateDoctorMarkdown.markdownDoctor = action.doctorData
            return {
                ...stateDoctorMarkdown,
            }
        case actionTypes.FETCH_MARKDOWN_DOCTOR_FAIL:
            let stateDoctorMarkdownClone = { ...state }
            stateDoctorMarkdownClone.markdownDoctor = null
            return {
                ...stateDoctorMarkdownClone,
            }
        default:
            return state

    }
}

export default doctorReducer;