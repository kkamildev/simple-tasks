import { create } from "zustand";


type UserStoreType = {
    id?:string
}

const useUserStore = create<UserStoreType>((set) => ({
    id:undefined
}))

export {useUserStore}