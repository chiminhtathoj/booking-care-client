import axios from "../axios";
const getTopDoctorAPI = (limit) => {
    return axios.get("/api/get-top-doctor", {
        params: {
            limit: limit
        }
    })
}
export {
    getTopDoctorAPI
}