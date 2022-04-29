import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    times: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            let stateUserCopy = { ...state }
            stateUserCopy.users = action.usersData
            return {
                ...stateUserCopy,
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.users = []
            return {
                ...state,
            }
        //get all time
        case actionTypes.FETCH_TIME_SUCCESS:
            let stateTime = { ...state }
            stateTime.times = action.data
            return {
                ...stateTime,
            }
        case actionTypes.FETCH_TIME_FAIL:
            let stateTimeClone = { ...state }
            stateTimeClone.times = []
            return {
                ...stateTimeClone,
            }
        default:
            return state

    }
}

export default adminReducer;