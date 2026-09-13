

import {create} from "zustand"
import type { ErrorBody } from "../Hooks"

type ErrorState = {
    errors: {id:string, body: ErrorBody}[]
    addError:(id : string, body : ErrorBody) => void,
    deleteError:(id : string) => void
}

const useErrorStore = create<ErrorState>((set) => ({
    errors:[],
    addError:(id : string, body : ErrorBody) => set((store) => {
        if(!store.errors.some((obj) => obj.id === id)){
            return {errors:[...store.errors, {id, body}]}
        }
        return store;
    }),
    deleteError:(id : string) => set((store) => {
        if(store.errors.some((obj) => obj.id === id)){
            return {errors:store.errors.filter((obj) => obj.id !== id)}
        }
        return store;
    })
}))

export {useErrorStore}