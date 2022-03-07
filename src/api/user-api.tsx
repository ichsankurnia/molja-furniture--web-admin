import axios from "axios"
import { baseURL } from "./common-api"

export interface UserPayload {
    id?: number
    username?: string,
    password?: string,
    fullname?: string,
    email?: string,
    role_id?: number
}


export const getOneUser = async (userID: number) => {
    try {
        const data = await axios.get(`${baseURL}/api/user-one?id=${userID}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error: any) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}


export const getAllUser = async () => {
    try {
        const data = await axios.get(baseURL + '/api/user-all', {
            headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error: any) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const createNewUser = async (payload: UserPayload) => {
    try {
        const data = await axios.post(baseURL + '/api/user-new', payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error: any) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const updateUser = async (userID: number, payload: UserPayload) => {
    try {
        const data = await axios.patch(baseURL + '/api/user-update/' + userID, payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error: any) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const deleteUser = async (userID: number) => {
    try {
        const data = await axios.delete(baseURL + '/api/user-delete/' + userID, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error: any) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error)) 
    }
}