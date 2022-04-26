import { getTopDoctorAPI } from "../../services/doctorService"
import actionTypes from './actionTypes';
import { toast } from "react-toastify";
export const getTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorAPI("10")
            console.log(res.data)
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