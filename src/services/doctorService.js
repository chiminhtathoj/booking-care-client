import axios from "../axios";
const getTopDoctorAPI = (limit) => {
    return axios.get("/api/get-top-doctor", {
        params: {
            limit: limit
        }
    })
}
const getAllDoctorAPI = () => {
    return axios.get("/api/get-top-doctor")
}
const createInfoDoctorAPI = (infoDoctor) => {
    return axios.post("/api/create-info-doctor", infoDoctor)
}



export {
    getTopDoctorAPI,
    getAllDoctorAPI,
    createInfoDoctorAPI
}