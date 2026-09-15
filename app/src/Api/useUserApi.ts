import type { AxiosResponse } from "axios";
import { useRequest } from "../Utils/Hooks"


export const useUserApi = () => {


    const saveAccessToken = (res : AxiosResponse) => {
        if(res.headers["x-new-access-token"]) {
            localStorage.setItem("ACCESS_TOKEN", res.headers["x-new-access-token"]);
        }
    }

    const injectAccessToken = () => {
        return "Bearer " + localStorage.getItem("ACCESS_TOKEN") || "";
    }

    const genBaseConfig = () => {
        return {timeout:5000, withCredentials:true, headers:{"x-new-access-token":injectAccessToken()}}
    }
    const genConfigWithoutAuth = () => {
        return {timeout:5000, withCredentials:true}
    }


    const request = useRequest();
    return {
        emailAvailable:async(email : string, reqId : string) => {
            return await request.send("GET", "/api/users/email?email=" + email, genConfigWithoutAuth(), {}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        register:async(email : string, password : string, reqId : string) => {
            return await request.send("POST", "/api/users/register", genConfigWithoutAuth(), {email, password}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        verify:async(email : string, code : string, reqId : string) => {
            return await request.send("POST", "/api/users/verify", genConfigWithoutAuth(), {email, code}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        login:async(email : string, password : string, reqId : string) => {
            return await request.send("POST", "/api/users/login", genConfigWithoutAuth(), {email, password}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        auth:async (reqId : string) => {
            return await request.send("GET", "/api/users/auth", genConfigWithoutAuth(), {}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        logout:async(reqId : string) => {
            return await request.send("GET", "/api/users/logout", genBaseConfig(), {}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        updateEmail:async(email : string, reqId : string) => {
            return await request.send("PATCH", "/api/users/email", genBaseConfig(), {email}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        updatePassword:async(password : string, reqId : string) => {
            return await request.send("PATCH", "/api/users/password", genBaseConfig(), {password}, reqId, (res) => {
                saveAccessToken(res)
            })
        }
    }
}