import axios from "axios"
import { baseURL } from "./common-api"

export interface ArticlePayload {
    title?: string,
    body?: string
}

export interface ClientPayload {
    id?: number,
    client_name?: string,
    client_desc?: string,
    image?: any
}

class HomeAPI {

//#region ARTICLE
    static articleGet = async () => {
        try {
            const data = await axios.get(baseURL + '/api/article-get', {
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
        
    static articleUpdate = async (payload: ArticlePayload) => {
        try {
            const data = await axios.patch(baseURL + '/api/article-update/', payload, {
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
//#endregion ARTICLE


//#region CLIENT
    static clientGetOne = async (clientID: number) => {
        try {
            const data = await axios.get(`${baseURL}/api/client-one?id=${clientID}`, {
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
    
    
    static clientGetAll = async () => {
        try {
            const data = await axios.get(baseURL + '/api/client-all', {
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
    
    static clientNew = async (payload: ClientPayload) => {
        try {
            const data = await axios.post(baseURL + '/api/client-new', payload, {
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
    
    static clientUpdate = async (clientID: number, payload: ClientPayload) => {
        try {
            const data = await axios.patch(baseURL + '/api/client-update/' + clientID, payload, {
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
    
    static clientDelete = async (clientID: number) => {
        try {
            const data = await axios.delete(baseURL + '/api/client-delete/' + clientID, {
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
//#endregion CLIENT

}

export default HomeAPI