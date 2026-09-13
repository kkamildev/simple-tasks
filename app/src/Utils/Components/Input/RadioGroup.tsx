import type { FC } from "react";

type Props = {
    buttons:{value:string, title:string}[],
    buttonStyle?:string,
    style?:string,
    onChange:(value:string) => void;
    value:string
}

const RadioGroup : FC<Props> = ({buttons, buttonStyle, style, onChange, value}) => {

    const unChoosenStyles = "dark:text-white dark:bg-zinc-800 dark:hover:text-black dark:hover:bg-neutral-100 text-black bg-neutral-200 hover:text-white hover:bg-black";
    const choosenStyles = "dark:text-black dark:bg-neutral-100 text-white bg-black";

    return (
        <section className={`${style} flex items-center gap-x-3`}>
            {
                buttons.map((button) => <button key={button.value} type="button" onClick={() => onChange(button.value)}
                className={`${buttonStyle} rounded-lg px-3 py-1 cursor-pointer font-bold ${value === button.value ? choosenStyles : unChoosenStyles} transition-colors duration-150 ease-in-out`}>
                    {button.title}</button>)
            }
        </section>
    )
}

export default RadioGroup;