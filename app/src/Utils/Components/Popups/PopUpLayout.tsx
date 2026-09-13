import { animate } from "animejs";
import { useEffect, useRef, type FC, type ReactNode } from "react";

type Props = {
    style?:string,
    children:ReactNode
}

const PopUpLayout : FC<Props> = ({style = "", children}) => {

    const boxRef = useRef(null);
    useEffect(() => {
        if (!boxRef.current) return;


        const animation = animate(boxRef.current, {
            translateY: ["-20", "0"],
            opacity:["0", "1"],
            duration: 400,
            ease: 'inOutQuad',
            loop: false,
            alternate: true
        });


        return () => {
            animation.revert();
        };
    }, []);

    return (
        <section ref={boxRef} className={`fixed top-0 left-0 ${style} z-30`}>
            {children}
        </section>
    )
}

export default PopUpLayout;