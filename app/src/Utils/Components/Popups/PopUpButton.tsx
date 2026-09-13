import { animate, JSAnimation } from "animejs";
import { useEffect, useRef, useState, type FC, type ReactNode } from "react";

type Props = {
    popUp:ReactNode,
    children:ReactNode,
    style?:string,
    onClick:(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const PopUpButton : FC<Props> = ({children, popUp, style = "", onClick}) => {

    const [display, setDisplay] = useState<boolean>(false);

    const boxRef = useRef(null);

    useEffect(() => {
        if (!boxRef.current) return;
        let animation : JSAnimation;
        if(display) {
            animation = animate(boxRef.current, {
                opacity:["0", "1"],
                duration: 400,
                ease: 'inOutQuad',
                loop: false,
                alternate: true
            });
        } else {
            animation = animate(boxRef.current, {
                opacity:["1", "0"],
                duration: 400,
                ease: 'inOutQuad',
                loop: false,
                alternate: true
            });
        }
        return () => {
            animation.revert();
        };
    }, [display])

    useEffect(() => {
        if (!boxRef.current) return;
        const animation = animate(boxRef.current, {
            opacity:["0", "0"],
            duration: 400,
            ease: 'inOutQuad',
            loop: false,
            alternate: true
        });
        return () => {
            animation.revert();
        };
    }, [])

    return (
        <>
            <button type="button" className={`${style} btn`} onMouseEnter={() => setDisplay(true)} onMouseOut={() => setDisplay(false)} onClick={onClick}>
                {children}
            </button>
            <section ref={boxRef} className={`absolute pointer-events-none`}>
                {popUp}
            </section>
        </>
    )
}

export default PopUpButton;