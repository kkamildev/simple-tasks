import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {animate} from 'animejs'; 
import { useEffect, useRef, type FC } from "react";


type Props = {
    content:string,
    enableAnimation?:boolean,
    style?:string,
    iconStyle?:string
}

const ErrorNotification : FC<Props> = ({content, enableAnimation = true, iconStyle = "", style = ""}) => {

    const boxRef = useRef(null);
    useEffect(() => {
        if (!boxRef.current && enableAnimation) return;


        const animation = animate(boxRef.current, {
            translateX: ["-10", "0"],
            opacity:["0", "1"],
            duration: 700,
            ease: 'inOutQuad',
            loop: false,
            alternate: true
        });


        return () => {
            animation.revert();
        };
    }, []);

    return (
        <section className="flex items-center justify-start">
            <p ref={boxRef} className={`bg-red-500 border-3 border-red-800 m-2 p-1 pr-2 font-bold text-red-950 rounded-md flex items-center gap-x-3 ${style}`}>
                <FontAwesomeIcon icon={faCircleXmark} className={`text-2xl ${iconStyle}`}/> {content}
            </p>
        </section>
    )
}

export default ErrorNotification;