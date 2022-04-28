import { getTopDoctorAPI, getAllDoctorAPI, createInfoDoctorAPI, getMarkdownDoctorByIdAPI } from "../../services/doctorService"
import actionTypes from './actionTypes';
import { toast } from "react-toastify";
//get top doctor
export const getTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorAPI("10")
            if (res && res.errCode === 0) {
                dispatch(getTopDoctorSuccess(res.data))
            }
            else {
                dispatch(getTopDoctorFail())
            }

        } catch (error) {
            toast.error("Load top doctor fail");
            console.log("getTopDoctorStart error", error)
        }
    }
}
export const getTopDoctorSuccess = (doctorsData) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    doctorsData
});

export const getTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL
});
//get all doctor
export const getAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorAPI()
            if (res && res.errCode === 0) {
                dispatch(getAllDoctorSuccess(res.data))
            }
            else {
                dispatch(getAllDoctorFail())
            }

        } catch (error) {
            toast.error("Load top doctor fail");
            console.log("getTopDoctorStart error", error)
        }
    }
}
export const getAllDoctorSuccess = (allDoctorData) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    allDoctorData
});

export const getAllDoctorFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAIL
});

//SAVE INFO DOCTOR
export const saveInfoDoctorStart = (infoDoctor) => {
    return async (dispatch, getState) => {
        try {
            let res = await createInfoDoctorAPI(infoDoctor)
            if (res && res.errCode === 0) {
                dispatch(saveInfoDoctorSuccess())
                toast.success("Save info doctor successed!");

            }
            else {
                toast.error("Save info doctor fail");
                dispatch(saveInfoDoctorFail())
            }

        } catch (error) {
            toast.error("Save info doctor fail");
            console.log("getTopDoctorStart error", error)
        }
    }
}
export const saveInfoDoctorSuccess = () => ({
    type: actionTypes.CREATE_INFO_DOCTOR_SUCCESS
});

export const saveInfoDoctorFail = () => ({
    type: actionTypes.CREATE_INFO_DOCTOR_FAIL
});
//GET CURRENT INFO DOCOTR
export const getMarkdownDoctorStart = (idDoctor) => {
    return async (dispatch, getState) => {
        try {
            let res = await getMarkdownDoctorByIdAPI(idDoctor)
            if (res && res.errCode === 0) {
                dispatch(getMarkdownDoctorSuccess(res.data))
                toast.success("Load content doctor successed!");
            }
            else {
                toast.error("Load content doctor fail");
                dispatch(getMarkdownDoctorFail())
            }

        } catch (error) {
            toast.error("get markdown doctor fail");
            console.log("getCurrentInfoDoctorStart error", error)
        }
    }
}
export const getMarkdownDoctorSuccess = (doctorData) => ({
    type: actionTypes.FETCH_MARKDOWN_DOCTOR_SUCCESS,
    doctorData
});

export const getMarkdownDoctorFail = () => ({
    type: actionTypes.FETCH_MARKDOWN_DOCTOR_FAIL
});