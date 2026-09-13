

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect, useRef, useState, type FC, type ReactNode } from "react"
import { faChevronDown, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { animate, JSAnimation } from "animejs";

type Props = {
    children:ReactNode,
    style?:string,
    iconStyle?:string,
    downStyle?:string
    options:SelectFieldOption[],
}

export type SelectFieldOption = {
    value:string
    onClick: () => void,
    icon?:IconDefinition
}

const Dropdown : FC<Props> = ({children, style = "", iconStyle = "", downStyle = "", options}) => {

    const [isOptionsShowed, setIsOptionsShowed] = useState<boolean>(false);

    const buttonRef = useRef(null);

    useEffect(() => {
        if (!buttonRef.current) return;
        
        let animation : JSAnimation;
        if(isOptionsShowed) {
            animation = animate(buttonRef.current, {
                rotateZ:["0deg", "180deg"],
                duration: 200,
                ease: 'inOutQuad',
                loop: false,
                alternate: true
            });
        } else {
            animation = animate(buttonRef.current, {
                rotateZ:["180deg", "0deg"],
                duration: 200,
                ease: 'inOutQuad',
                loop: false,
                alternate: true
            });
        }
        
        return () => {
            animation.revert();
        };
    }, [isOptionsShowed]);
    useEffect(() => {
        if (!buttonRef.current) return;
        const animation = animate(buttonRef.current, {
            rotateZ:["0deg", "0deg"],
            duration: 400,
            ease: 'inOutQuad',
            loop: false,
            alternate: true
        });
         return () => {
            animation.revert();
        };
    }, []);


    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
                setIsOptionsShowed(false)
            }
        }

        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, []);



    return (
        <section className="m-2 min-w-0">
            <section ref={boxRef} className={`flex gap-x-3 p-2 items-center border-3 rounded-md dark:border-white relative ${style}`}>
                <section onClick={() => setIsOptionsShowed((prev) => !prev)} className="flex items-center gap-x-3 cursor-pointer">
                    {
                        children
                    }
                    <FontAwesomeIcon className={`shrink-0 dark:text-white cursor-pointer ${iconStyle}`} icon={faChevronDown} ref={buttonRef}/>
                </section>
                {
                    isOptionsShowed &&
                    <section className="absolute top-full max-h-50 w-full dark:bg-zinc-950 bg-zinc-200 z-10 right-px rounded-b-lg overflow-y-auto">
                        {
                            options.map((option, index) => <p key={index} onMouseDown={() => {option.onClick(); setIsOptionsShowed(false)}}
                            className={` ${downStyle} dark:text-white text-zinc-900 p-2 font-bold dark:hover:bg-zinc-800 hover:bg-neutral-300 cursor-pointer transition-colors duration-100 ease-in-out`}>
                                {option.icon && <FontAwesomeIcon icon={option.icon}/>} {option.value}</p>)
                        }
                    </section>
                }
            </section>
        </section>
    )
}

export default Dropdown;