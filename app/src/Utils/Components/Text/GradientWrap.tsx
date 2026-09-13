import type { FC, ReactNode } from "react";

type Props = {
    style?:string,
    children:ReactNode
}

const GradientWrap : FC<Props> = ({style = "", children}) => {
    return (
        <span className={`bg-clip-text text-transparent ${style}`}>
            {children}
        </span>
    )
}

export default GradientWrap;