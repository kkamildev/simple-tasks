import { create } from "zustand";


type UserStoreType = {
    id?:string,
    setUser:(id : string) => void;
    clearUser:() => void;
}

const useUserStore = create<UserStoreType>((set) => ({
    id:undefined,
    setUser:(id) => set(() => ({id})),
    clearUser:() => set(() => ({id:undefined}))
}))

export {useUserStore}