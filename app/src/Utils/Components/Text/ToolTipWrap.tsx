import { useState, type FC, type ReactNode } from "react";

type Props = {
    children:ReactNode,
    text:string,
    style?:string,
    containerStyle?:string
}

const ToolTipWrap : FC<Props> = ({children, text, style = "", containerStyle = ""}) => {
    const [hover, setHover] = useState(false);

    return (
        <div className={`relative inline-block ${containerStyle}`}>
            <div className="inline-block" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {children}
            </div>
            <div className={`${style} ${hover ? "animate-slide-up" : "animate-slide-down"} absolute select-none pointer-events-none left-1/2 -translate-x-1/2 -top-10 bg-black text-white text-sm px-2 py-1 rounded shadow-lg z-20`}>
                {text}
            </div>
        </div>
    );
}

export default ToolTipWrap;