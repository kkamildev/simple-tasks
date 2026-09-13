import { useRef, type FC, type ReactNode } from "react";
import { useScrollElement } from "../../Scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


type Props = {
    children:ReactNode,
    heightPerSegment?:number,
    buttonStyle?:string,
    style?:string
}

const ScrollTextWrap : FC<Props> = ({children, heightPerSegment = 50, buttonStyle = "", style = ""}) => {

    const ref = useRef(null);

    const {scrollBy} = useScrollElement(ref)

    return (
        <section className={`${style} m-2 flex gap-y-2 items-center`}>
            <section ref={ref} className="overflow-y-scroll scrollbar-none" style={{height:heightPerSegment}}>
                {children}
            </section>
            <section className="flex flex-col flex-1">
                <button type="button" className={`btn ${buttonStyle}`} onClick={() => scrollBy(-heightPerSegment)}><FontAwesomeIcon icon={faChevronUp}/></button>
                <button type="button" className={`btn ${buttonStyle}`} onClick={() => scrollBy(heightPerSegment)}><FontAwesomeIcon icon={faChevronDown}/></button>
            </section>
        </section>
    )
}

export default ScrollTextWrap;