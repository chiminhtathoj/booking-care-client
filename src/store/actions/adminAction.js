import actionTypes from './actionTypes';
import { getAllCodeAPI } from "../../services/userService"

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// });

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeAPI("gender")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFail())
            }

        } catch (error) {
            console.log("fetchGenderStart error", error)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
});

//// POSTION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeAPI("position")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFail())
            }

        } catch (error) {
            console.log("fetchpositionStart error", error)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
});



//ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeAPI("role")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFail())
            }

        } catch (error) {
            console.log("fetchroleStart error", error)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
});
