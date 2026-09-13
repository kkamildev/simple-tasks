import { create } from "zustand";


type NotifState = {
    notifs:NotifData[],
    addNotif:(message : string, onClick : () => void, buttonTitle? : string) => void;
    deleteNotif:(id : number) => void;
    clear:() => void;
}

type NotifData = {
    id?:number
    message:string,
    buttonTitle:string,
    onClick:() => void
}

const useNotifStore = create<NotifState>((set) => ({
    notifs:[],
    addNotif: (message, onClick, buttonTitle = "OK", timeout = 6000) => set((store) => {
        const id = Date.now();
        setTimeout(() => {
            set((store) => ({
                notifs: store.notifs.filter((n) => n.id !== id)
            }));
        }, timeout);

        return {notifs:[...store.notifs, {id, message, onClick:() => {
            store.deleteNotif(id);
            onClick();
            }, buttonTitle}]}
    }),
    deleteNotif:(id) => set((store) => ({notifs:store.notifs.filter((obj) => obj.id !== id)})),
    clear:() => set(() => ({notifs:[]}))
}));

export {useNotifStore}