import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import { isVisibleRef } from "../../Scroll";

type Props = {
    style?:string,
    children:ReactNode
}

const ScrollShowBlock : FC<Props> = ({children, style = ""}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (isVisibleRef(ref)) {
                setVisible(true);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={ref} className={`${style} ${visible ? "animate-slide-up" : "opacity-0"}`}>
            {children}
        </section>
    );
}

export default ScrollShowBlock;