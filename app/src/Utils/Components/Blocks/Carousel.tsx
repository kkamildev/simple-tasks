import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, type FC, type ReactNode } from "react";

type Props = {
    widthPerComponent:number,
    children:ReactNode,
    style?:string
}

const Carousel : FC<Props> = ({widthPerComponent, children, style = ""}) => {

    const ref = useRef(null);

    const next = () => {
        ref.current?.scrollBy({ left: widthPerComponent, behavior: "smooth" });
    };

    const prev = () => {
        ref.current?.scrollBy({ left: -widthPerComponent, behavior: "smooth" });
    };

    const buttonStyle = "hover:bg-black/60 transition-colors duration-200 ease-in-out z-30 absolute top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded cursor-pointer";

    return (
        <section className={`${style} relative w-full`}>
            <button type="button" onClick={prev} className={buttonStyle + " left-2"}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>

            <button type="button" onClick={next} className={buttonStyle + " right-2"}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </button>

            <div ref={ref} className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 scroll-smooth scrollbar-none">
                <div className="h-40 shrink-0" style={{width:(widthPerComponent * 4) + "px"}}></div>
                {children}
                <div className="h-40 shrink-0" style={{width:(widthPerComponent * 4) + "px"}}></div>
            </div>
        </section>
  );
}

export default Carousel;