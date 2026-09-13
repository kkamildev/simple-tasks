import type { FC } from "react";


type Props = {
    message:string,
    buttonTitle?:string,
    style?:string,
    buttonStyle?:string,
    onClick:() => void;
}

const Notif : FC<Props> = ({message, onClick, buttonTitle = "OK", style = "", buttonStyle = ""}) => {
    return (
        <section className={`${style} pointer-events-auto bottom-4 left-4 bg-neutral-100 dark:bg-neutral-950 text-black dark:text-white px-4 py-3 rounded-lg shadow-lg flex z-10 items-center animate-slide-up`}>
            <span className="mr-2">{message}</span>
            <button onClick={() => onClick()} className={`${buttonStyle} bg-zinc-800 hover:bg-zinc-700 text-white px-3! py-1! rounded-md btn text-base!`}>
                {buttonTitle}
            </button>
        </section>

    )
}

export default Notif;