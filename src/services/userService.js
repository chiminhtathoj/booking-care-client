import axios from "../axios";

const handleLoginAPI = (email, password) => {
    return axios.post("api/login", { email, password })
}

const getUsersAPI = (userId) => {
    return axios.get(`/api/get-users?id=${userId}`)
}

export {
    handleLoginAPI,
    getUsersAPI
}