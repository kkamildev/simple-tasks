

import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {animate} from 'animejs'; 
import { useEffect, useRef, type FC } from "react";


type Props = {
    content:string,
    enableAnimation?:boolean,
    style?:string,
    iconStyle?:string
}

const InputSuccess : FC<Props> = ({content, enableAnimation = true, iconStyle = "", style = ""}) => {

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
    }, [content]);

    return (
        <section className="flex items-center justify-start">
            <p ref={boxRef} className={`m-1 p-1 pr-2 font-bold text-green-700 rounded-md flex items-center gap-x-1 ${style}`}>
                <FontAwesomeIcon icon={faCircleCheck} className={`text-xl ${iconStyle}`}/> {content}
            </p>
        </section>
    )
}

export default InputSuccess;