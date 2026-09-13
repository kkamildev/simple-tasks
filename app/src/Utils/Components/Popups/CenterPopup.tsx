import type { FC, ReactNode } from "react";

type Props = {
    children:ReactNode,
    onNonFocusClick?:() => void
}

const CenterPopup : FC<Props> = ({children, onNonFocusClick = () => {}}) => {
    return (
        <section 
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onNonFocusClick();
                }
            }}
        className="top-0 left-0 bottom-0 right-0 fixed bg-black/50 z-30 flex justify-center items-center">
            {children}
        </section>
    )
}

export default CenterPopup;