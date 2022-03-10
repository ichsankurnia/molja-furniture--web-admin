import axios from "axios";

// export const baseURL = "http://localhost:2323"                          // {Local}
// export const baseURL = "http://192.168.0.41:2323"                          // {Local}
// export const baseURL = "https://apitest.goes2nobel.com"                          // {Production}
export const baseURL = "https://api.moljafurniture.com"                          // {Production}


export interface LoginPayload {
    username: String,
    password: String
}

export const loginAPI = async (payload: LoginPayload) => {
    try {
        const data = await axios.post(`${baseURL}/api/sign-in`, payload)
        return data
    } catch (error: any) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}