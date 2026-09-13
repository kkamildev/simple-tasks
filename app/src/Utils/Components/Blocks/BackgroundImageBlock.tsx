import type { FC, ReactNode } from "react";

type Props = {
    children?:ReactNode,
    style?:string
    imageUrl:string
}

const BackgroundImageBlock : FC<Props> = ({children, imageUrl, style = ""}) => {
    return (
        <div className={`bg-cover bg-center w-full ${style}`} style={
            {backgroundImage: `url('${imageUrl}')`}
        }>
            {children && children}
        </div>
    )
}

export default BackgroundImageBlock;