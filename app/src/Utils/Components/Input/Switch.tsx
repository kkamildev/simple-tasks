import { type FC } from "react"
import { InputError } from "../Notifications"


type Props = {
    title?:string,
    subtitle?:string,
    buttonOnStyle?:string
    id:string,
    value:string,
    onChange:(value : string) => void,
    errors?:string[]
}

const Switch : FC<Props> = ({id, title, subtitle, value, onChange, errors = [], buttonOnStyle = ""}) => {
    {title && <label htmlFor={id}><p className="font-bold text-xl mt-2 dark:text-white">{title}</p></label>}
    {subtitle && <label htmlFor={id}><p className="font-bold mb-2 text-zinc-600">{subtitle}</p></label>}

    return (
        <section className="m-2 min-w-0">
            <section className="flex items-center gap-x-5">
                {title && <label htmlFor={id}><p className="font-bold text-xl dark:text-white">{title}</p></label>}
                <button id={id}
                type="button"
                onClick={() => onChange(value == "true" ? "false" : "true")}
                className={`
                    cursor-pointer
                    relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-300
                    ${value == "true" ? `bg-green-500 ${buttonOnStyle}` : "bg-neutral-400 dark:bg-neutral-700"}
                `}
                >
                <span
                    className={`
                    inline-block h-4 w-4 transform rounded-full bg-white
                    transition-transform duration-300
                    ${value == "true" ? "translate-x-6" : "translate-x-1"}
                    `}
                />
                </button>

            </section>
            {
                errors.length != 0 &&
                <InputError content={errors[0]}/>
            }
        </section>
    );
}
export default Switch;