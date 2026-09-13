import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animate, JSAnimation } from "animejs";
import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import { useKeyboard } from "../../Hooks";
import { lockScroll, unlockScroll } from "../../Scroll";

type Props = {
    children:ReactNode,
    button:ReactNode,
    buttonStyle?:string,
    style?:string,
    scrollLock?:boolean
}

const LeftSlider : FC<Props> = ({children, button, buttonStyle = "", style = "", scrollLock = false}) => {

    const [display, setDisplay] = useState<boolean>(false);

    useKeyboard(
        {
            Escape:() => setDisplay(false)
        },
        true
    )
    
    const sliderRef = useRef(null);
    
    useEffect(() => {
        if(scrollLock) {
            if(display) {
                lockScroll();   
            } else {
                unlockScroll()
            }
        }
        if (!sliderRef.current) return;
        
        let animation : JSAnimation;
        if(display) {
            animation = animate(sliderRef.current, {
                left:["-300px", "0px"],
                duration: 700,
                ease: 'inOutQuad',
                loop: false,
                alternate: true
            });
        } else {
            animation = animate(sliderRef.current, {
                left:["0px", "-300px"],
                duration: 700,
                ease: 'inOutQuad',
                loop: false,
                alternate: true
            });
        }
        
        return () => {
            animation.revert();
        };
    }, [display]);
    useEffect(() => {
        if (!sliderRef.current) return;
        const animation = animate(sliderRef.current, {
            left:["-300px", "-300px"],
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
        <>
            <div onClick={() => setDisplay(false)} className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-black ${display ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-all duration-700 ease-in-out`}>

            </div>
            <aside ref={sliderRef} className={`${style} top-0 bottom-0 fixed z-40`}>
                <section className="flex justify-end">
                    <FontAwesomeIcon icon={faXmark}
                    className="text-2xl m-4 dark:text-white text-zinc-950 cursor-pointer"
                    onClick={() => setDisplay(false)}/>
                </section>
                {children}
            </aside>
            <button type="button" className={`${buttonStyle} btn`} onClick={() => setDisplay((prev) => !prev)}>
                {button}
            </button>
        </>
    )
}

export default LeftSlider;