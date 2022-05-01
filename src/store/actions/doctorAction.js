import { getTopDoctorAPI, getAllDoctorAPI, createInfoDoctorAPI, getMarkdownDoctorByIdAPI } from "../../services/doctorService"
import { getAllCodeAPI } from "../../services/userService"
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
            toast.error("Load top doctor fail", {
                theme: "colored"
            });
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
            toast.error("Load top doctor fail", {
                theme: "colored"
            });
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
                toast.success("Save info doctor successed!", {
                    theme: "colored"
                });

            }
            else {
                toast.error("Save info doctor fail", {
                    theme: "colored"
                });
                dispatch(saveInfoDoctorFail())
            }

        } catch (error) {
            toast.error("Save info doctor fail", {
                theme: "colored"
            });
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
                toast.success("Load content doctor successed!", {
                    theme: "colored"
                });
            }
            else {
                toast.error("Load content doctor fail", {
                    theme: "colored"
                });
                dispatch(getMarkdownDoctorFail())
            }

        } catch (error) {
            toast.error("get markdown doctor fail", {
                theme: "colored"
            });
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

//get info detail doctor => price payment province
export const getMultiDetailInfoDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCodeAPI("price")
            let resPayment = await getAllCodeAPI("payment")
            let resProvince = await getAllCodeAPI("province")
            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0
            ) {
                dispatch(getMultiDetailInfoDoctorSuccess({
                    price: resPrice.data,
                    payment: resPayment.data,
                    province: resProvince.data
                }))
            }
            else {
                toast.error("Load detail doctor fail", {
                    theme: "colored"
                });
                dispatch(getMultiDetailInfoDoctorFail())
            }

        } catch (error) {
            toast.error("load detail doctor fail", {
                theme: "colored"
            });
            console.log("getMultiDetailInfoDoctorStart error", error)
        }
    }
}
export const getMultiDetailInfoDoctorSuccess = (dataDetailDoctor) => ({
    type: actionTypes.FETCH_MULTI_DETAIL_DOCTOR_SUCCESS,
    dataDetailDoctor
});

export const getMultiDetailInfoDoctorFail = () => ({
    type: actionTypes.FETCH_MULTI_DETAIL_DOCTOR_FAIL
});