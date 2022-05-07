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
const getScheduleDoctorByIdAndDateAPI = (idDoctor, date) => {
    return axios.get("/api/get-schedule-doctor", {
        params: {
            idDoctor,
            date
        }
    })
}
const getExtraInfoDoctorById = (id) => {
    return axios.get("/api/get-extra-info-doctor-by-id", {
        params: {
            id
        }
    })
}
const getProfileDoctorByIdAPI = (id) => {
    return axios.get("/api/get-profile-doctor-by-id", {
        params: {
            id
        }
    })
}



export {
    getTopDoctorAPI,
    getAllDoctorAPI,
    createInfoDoctorAPI,
    getDetailDoctorByIdAPI,
    getMarkdownDoctorByIdAPI,
    createBulkScheduleAPI,
    getScheduleDoctorByIdAndDateAPI,
    getExtraInfoDoctorById,
    getProfileDoctorByIdAPI
}