import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animate, JSAnimation } from "animejs";
import { useEffect, useRef, useState, type FC, type ReactNode } from "react";


type Props = {
    title:string,
    children:ReactNode,
    buttonStyle?:string
}

const Accordion : FC<Props> = ({title, children, buttonStyle = ""}) => {
    const [open, setOpen] = useState(false);

    const buttonRef = useRef(null);

    useEffect(() => {
        if (!buttonRef.current) return;
        
        let animation : JSAnimation;
        if(open) {
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
    }, [open]);

    return (
        <section className="py-3">
            <button type="button" onClick={() => setOpen(!open)} className={`${buttonStyle} mb-1 flex items-center justify-between w-full text-left gap-x-2 cursor-pointer`}>
                <span className="font-medium">{title}</span>
                <FontAwesomeIcon icon={faChevronDown} ref={buttonRef}/>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-max opacity-100" : "max-h-0 opacity-0"}`}>
                {children}
            </div>
        </section>
    );
}

export default Accordion;