import { type FC, type ReactNode } from "react";
import { useScrollDirection } from "../../Scroll";

type Props = {
    children:ReactNode,
    style?:string,
    upStyle?:string,
    downStyle?:string
}

const ScrollResponsibleBlock : FC<Props> = ({children, style = "", upStyle = "", downStyle = ""}) => {

    const scrollDirection = useScrollDirection();

    return (
        <section className={`${style} ${scrollDirection == "up" ? upStyle : downStyle}`}>
            {children}
        </section>
    )
}

export default ScrollResponsibleBlock;