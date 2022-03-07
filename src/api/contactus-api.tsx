import axios from "axios"
import { baseURL } from "./common-api"

export interface ContactUsPayload {
    address?: String,
    telp?: String,
    whatsapp_number?: String,
    email?: String
}

class ContactUsAPI {

    static get = async () => {
        try {
            const data = await axios.get(baseURL + '/api/contactus-get', {
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
        
    static update = async (payload: ContactUsPayload) => {
        try {
            const data = await axios.patch(baseURL + '/api/contactus-update/', payload, {
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


export default ContactUsAPI