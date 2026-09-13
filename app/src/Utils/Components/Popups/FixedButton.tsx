import type { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";

type Props = {
    icon:IconDefinition,
    style?:string,
    onClick:() => void;
}

const FixedButton : FC<Props> = ({icon, onClick, style = ""}) => {
    return (
        <button onClick={() => onClick()}
        className={`${style} cursor-pointer fixed bottom-6 right-6 bg-pink-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-20`}
        ><FontAwesomeIcon icon={icon}/></button>
    )
}

export default FixedButton;