import { useEffect, useState, type FC, type ReactNode } from "react";
import { isVisibleRef } from "../../Scroll";

type Props = {
    targetRef:React.RefObject<HTMLElement>
    children:ReactNode,
    style?:string,
    activeStyle?:string,
    unActiveStyle?:string

}

const RefResponsibleBlock : FC<Props> = ({targetRef, children, style = "", activeStyle = "", unActiveStyle = ""}) => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        const check = () => {
            setActive(isVisibleRef(targetRef));
        };

        check();
        window.addEventListener("scroll", check);

        return () => window.removeEventListener("scroll", check);
    }, [targetRef]);
    return (
        <section className={`${style} ${active ? activeStyle : unActiveStyle}`}>
            {children}
        </section>
    )
}

export default RefResponsibleBlock;