

import {create} from "zustand"

type GlobalErrorState = {
    errorAppeared:boolean,
    errorTitle:string,
    errorMessage?:string,
    errorType?:string,
    networkError:boolean,
    setError:(errorTitle : string, errorMessage : string, errorType : string, networkError? : boolean) => void,
    dismissError:() => void
}

const useGlobalErrorStore = create<GlobalErrorState>((set) => ({
    errorAppeared:false,
    networkError:false,
    errorTitle:null,
    errorMessage:null,
    errorType:null,
    setError:(errorTitle, errorMessage, errorType, networkError = false) => set(() => ({
        errorAppeared:true,
        errorTitle,
        networkError,
        errorMessage,
        errorType,
    })),
    dismissError:() => set(() => ({
        errorAppeared:false,
        networkError:false,
        errorMessage:null,
        errorTitle:null,
        errorType:null
    }))
}))

export {useGlobalErrorStore}