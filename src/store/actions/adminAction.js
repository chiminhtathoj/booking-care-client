import actionTypes from './actionTypes';
import { getAllCodeAPI, createNewUserAPI, getUsersAPI, deleteUserAPI, editUserAPI } from "../../services/userService"
import { toast } from "react-toastify";

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


// create user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserAPI(data)
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess())
                dispatch(loadAllUser())
                toast.success("Create a new user success!");
            }
            else {
                toast.error("Create a new user failed!");

                dispatch(createUserFail())
            }

        } catch (error) {
            toast.error("Create a new user failed!");

            console.log("createNewUser error", error)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
});

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
});

//load all user

export const loadAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getUsersAPI("ALL")
            if (res && res.errCode === 0) {
                dispatch(loadAllUserSuccess(res.users.reverse()))
            }
            else {
                dispatch(loadAllUserFail())
            }

        } catch (error) {
            toast.error("Load all user fail");
            console.log("loadAllUser error", error)
        }
    }
}

export const loadAllUserSuccess = (usersData) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    usersData
});

export const loadAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
});

//delete user

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserAPI(userId)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                dispatch(loadAllUser())
                toast.success("Delete a user success!");
            }
            else {
                toast.error("Delete a user failed!");
                dispatch(deleteUserFail())
            }

        } catch (error) {
            toast.error("Delete a user failed!");

            console.log("deleteUser error", error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
});

// edit user

export const editUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserAPI(userData)
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess())
                dispatch(loadAllUser())
                toast.success("Update a user success!");
            }
            else {
                toast.error("Update a user failed!");
                dispatch(editUserFail())
            }

        } catch (error) {
            toast.error("Update a user failed!");
            console.log("Update user error", error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
});

//get all time from all code
export const fetchTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeAPI("TIME")
            if (res && res.errCode === 0) {
                dispatch(fetchTimeSuccess(res.data))
            }
            else {
                dispatch(fetchTimeFail())
            }

        } catch (error) {
            console.log("fetchTimeStart error", error)
        }
    }
}

export const fetchTimeSuccess = (timeData) => ({
    type: actionTypes.FETCH_TIME_SUCCESS,
    data: timeData
});

export const fetchTimeFail = () => ({
    type: actionTypes.FETCH_TIME_FAIL
});
