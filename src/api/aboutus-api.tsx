import axios from "axios"
import { baseURL } from "./common-api"


export interface AboutUsPayload {
    company_name?: string,
    company_desc?: string,
    images?: any
}


class AboutUsAPI {

    static get = async () => {
        try {
            const data = await axios.get(baseURL + '/api/aboutus-get', {
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
        
    static update = async (payload: AboutUsPayload) => {
        try {
            const data = await axios.patch(baseURL + '/api/aboutus-update/', payload, {
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

export default AboutUsAPI