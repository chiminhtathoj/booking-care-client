import axios from "../axios";

const handleLoginAPI = (email, password) => {
    return axios.post("api/login", { email, password })
}

const getUsersAPI = (userId) => {
    return axios.get("/api/get-users", {
        params: {
            id: userId
        }
    })
}

const createNewUserAPI = (userData) => {
    return axios.put("/api/create-new-user", userData)
}

const deleteUserAPI = (userId) => {
    return axios.delete("/api/delete-user", {
        data: {
            id: userId
        }
    })
}

const editUserAPI = (userData) => {
    return axios.patch("/api/edit-user", userData)
}

export {
    handleLoginAPI,
    getUsersAPI,
    createNewUserAPI,
    deleteUserAPI,
    editUserAPI
}