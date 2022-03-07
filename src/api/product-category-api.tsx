import axios from "axios"
import { baseURL } from "./common-api"

export interface CategoryPayload {
    id?: number
    category_name?: string,
    category_desc?: string,
}

class CategoryAPI {

    static getOne = async (categoryID: number) => {
        try {
            const data = await axios.get(`${baseURL}/api/catalog-category-one?id=${categoryID}`, {
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
    
    
    static getAll = async () => {
        try {
            const data = await axios.get(baseURL + '/api/catalog-category-all', {
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
    
    static new = async (payload: CategoryPayload) => {
        try {
            const data = await axios.post(baseURL + '/api/catalog-category-new', payload, {
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
    
    static update = async (categoryID: number, payload: CategoryPayload) => {
        try {
            const data = await axios.patch(baseURL + '/api/catalog-category-update/' + categoryID, payload, {
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
    
    static delete = async (categoryID: number) => {
        try {
            const data = await axios.delete(baseURL + '/api/catalog-category-delete/' + categoryID, {
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
}


export default CategoryAPI