import { useEffect, type FC } from "react";
import { useImageVieverStore } from "../../Stores";
import FixedButton from "./FixedButton";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lockScroll, unlockScroll } from "../../Scroll";
import { useKeyboard } from "../../Hooks";

type Props = {

}

const ImageViever : FC<Props> = ({}) => {

    const imageVieverStore = useImageVieverStore();

    useKeyboard(
        {
            Escape:() => imageVieverStore.clear(),
            ArrowLeft:() => {
                if(imageVieverStore.imageIndex > 0) {
                    imageVieverStore.addIndex(-1)
                }
            },
            ArrowRight:() => {
                if(imageVieverStore.imageIndex < imageVieverStore.images.length - 1) {
                    imageVieverStore.addIndex(1)
                }
            }
        },
        true
    )

    useEffect(() => {
        if(imageVieverStore.active) {
            lockScroll();
        } else {
            unlockScroll();
        }
    }, [imageVieverStore.active])

    return(
        <section onClick={(e) => {
                if (e.target === e.currentTarget) {
                    imageVieverStore.clear()
                }
            }} className={`fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 z-40 bg-black ${imageVieverStore.active ? "bg-black/75 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-all duration-700 ease-in-out`}>
            <img className={`max-w-[80%] max-h-[80%] object-contain ${imageVieverStore.active ? "opacity-100" : "opacity-0"} transition-all duration-700 ease-in-out`}
            src={imageVieverStore.getCurrentImage()?.url || "empty"} alt={imageVieverStore.getCurrentImage()?.title || "empty"} />
            <FixedButton
                style="bottom-auto! top-6 text-3xl bg-transparent! hover:scale-105!"
                icon={faXmark}
                onClick={() => imageVieverStore.clear()}
            />
            {
                imageVieverStore.imageIndex > 0 &&
                <button
                    className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 text-3xl text-white cursor-pointer"
                    onClick={() => imageVieverStore.addIndex(-1)}
                    >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
            }
            {
                imageVieverStore.imageIndex < imageVieverStore.images.length - 1 &&
                <button
                    className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 text-3xl text-white cursor-pointer"
                    onClick={() => imageVieverStore.addIndex(1)}
                    >
                    <FontAwesomeIcon icon={faChevronRight} />
                    </button>
            }
        </section>
    )
}

export default ImageViever;