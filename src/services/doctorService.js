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

const getDetailDoctorByIdAPI = (idDoctor) => {
    return axios.get("/api/get-detail-doctor", {
        params: {
            id: idDoctor
        }
    })
}
const getMarkdownDoctorByIdAPI = (idDoctor) => {
    return axios.get("/api/get-markdown-doctor", {
        params: {
            id: idDoctor
        }
    })
}

const createBulkScheduleAPI = (data) => {
    return axios.post("/api/create-bulk-schedule", data)
}




export {
    getTopDoctorAPI,
    getAllDoctorAPI,
    createInfoDoctorAPI,
    getDetailDoctorByIdAPI,
    getMarkdownDoctorByIdAPI,
    createBulkScheduleAPI
}