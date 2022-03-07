import jwtDecode from "jwt-decode"
import { AdminRoutes } from "../routes"

class Helper {

    static getTitleBar(pathname: string){
        if(pathname === "/dashboard") return "Dashboard"
        else return AdminRoutes.find(data => pathname==='/dashboard/' + data.url_var)?.name_var
    }

    static getRoleName(roleID: number){
        switch(roleID){
            case 1:
                return "Administrator"
            case 2:
                return "User"
            case 99:
                return "Super Admin"
            default:
                return "Administrator"
        }
    }

    static expiredSession(token: string){
		if(!token){
            return true
		}else{
            const decode = jwtDecode(token) as any
            const currentTime = Date.now() / 1000;
            
            if(decode.exp < currentTime){
                return true
            }else{
                return false
            }
		}
    }
}

export default Helper