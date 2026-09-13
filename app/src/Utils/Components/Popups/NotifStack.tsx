import type { FC } from "react";
import Notif from "./Notif";
import { useNotifStore } from "../../Stores";


type Props = {
    style?:string,
    buttonStyle?:string,
}

const NotifStack : FC<Props> = ({style = "", buttonStyle = ""}) => {

    const notifStore = useNotifStore();

    return (
        <div className="fixed bottom-4 left-4 flex flex-col justify-end gap-3 pointer-events-none">
            {notifStore.notifs.map((nofif) => (
                <Notif
                    key={nofif.id}
                    message={nofif.message}
                    buttonTitle={nofif.buttonTitle}
                    style={style}
                    buttonStyle={buttonStyle}
                    onClick={nofif.onClick}
                />
            ))}
        </div>
    )
}

export default NotifStack;