import axios from "axios"
import { baseURL } from "./common-api"

export interface ProductPayload {
    id?: number,
    name?: string,
    description?: string,
    category_id?: number,
    images?: any,
    dimention?: string,
    button?: string
}

class ProductAPI {

    static getOne = async (productID: number) => {
        try {
            const data = await axios.get(`${baseURL}/api/catalog-one?id=${productID}`, {
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
            const data = await axios.get(baseURL + '/api/catalog-all', {
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
    
    static new = async (payload: ProductPayload) => {
        try {
            const data = await axios.post(baseURL + '/api/catalog-new', payload, {
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
    
    static update = async (productID: number, payload: ProductPayload) => {
        try {
            const data = await axios.patch(baseURL + '/api/catalog-update/' + productID, payload, {
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
    
    static delete = async (productID: number) => {
        try {
            const data = await axios.delete(baseURL + '/api/catalog-delete/' + productID, {
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


export default ProductAPI