import type { AxiosResponse } from "axios";
import { useRequest } from "../Utils/Hooks";

export type SortByType = "deadline" | "priority";

export type TaskToInsert = {
    title:string,
    content:string,
    priority:number,
    deadline:Date,
}

export type TaskToUpdate = {
    id:string,
    title:string,
    content:string,
    priority:number,
    deadline:Date,
}

export type Task = {
    id:string,
    title:string,
    content:string,
    priority:number,
    deadline:Date,
    createdAt:Date
}


export const useTaskApi = () => {


    
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

    const request = useRequest();
    return{
        get:async(sortBy : SortByType, reqId : string) => {
            return await request.send("GET", "/api/tasks?sortBy=" + sortBy, genBaseConfig(), {}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        insert:async(taskData : TaskToInsert, reqId : string) => {
            return await request.send("POST", "/api/tasks", genBaseConfig(), {...taskData, deadline:taskData.deadline.toISOString()}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        update:async(taskData : TaskToUpdate, reqId : string) => {
            return await request.send("PUT", "/api/tasks", genBaseConfig(), {...taskData}, reqId, (res) => {
                saveAccessToken(res)
            })
        },
        delete:async(id : string, reqId : string) => {
            return await request.send("DELETE", "/api/tasks", {...genBaseConfig(), data:{id}}, {}, reqId, (res) => {
                saveAccessToken(res)
            })
        }
    }
}