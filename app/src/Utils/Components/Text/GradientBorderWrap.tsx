import type { FC, ReactNode } from "react";


type Props = {
    style?:string,
    children:ReactNode
}

const GradientBorderWrap : FC<Props> = ({style = "", children}) => {
    return (
        <div className={`bg-linear-to-r p-0.5 ${style}`}>
           {children}
        </div>
    )
}

export default GradientBorderWrap;