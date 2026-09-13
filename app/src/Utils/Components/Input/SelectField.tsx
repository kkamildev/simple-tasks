
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState, type FC } from "react"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { animate, JSAnimation } from "animejs";
import { InputError } from "../Notifications";

type Props = {
    title?:string,
    subtitle?:string,
    style?:string,
    iconStyle?:string,
    downStyle?:string
    menuActive?:boolean
    placeholder?:string,
    id:string,
    value:string,
    onChange:(value : string, key : string) => void;
    errors?:string[],
    options:SelectFieldOption[],
}

export type SelectFieldOption = {
    key:string,
    value?:string
}

const SelectField : FC<Props> = ({id, title, subtitle, style = "", iconStyle = "", downStyle = "", placeholder = "", value, onChange, errors = [], options, menuActive = false}) => {

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

    const getKey = useCallback((value : string) => {
        const option = options.find((option) => {
            const valueToCompare = option.value == null ? option.key : option.value;
            return valueToCompare == value;
        })
        return option?.key;
    }, [options])

    const filteredOptions = useCallback(() => {
        return options.filter((option) => {
            const valueToCompare = option.value == null ? option.key : option.value;
            return valueToCompare.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        }).sort((a, b) => {
            const aValue = a.value == null ? a.key : a.value;
            const bValue = b.value == null ? b.key : b.value;
            return aValue.localeCompare(bValue);
        })
    }, [options, value]);

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
            {title && <label htmlFor={id}><p className="font-bold text-xl mt-2 dark:text-white">{title}</p></label>}
            {subtitle && <label htmlFor={id}><p className="font-bold mb-2 text-zinc-600">{subtitle}</p></label>}
            <section ref={boxRef} className={`flex gap-x-3 p-2 items-center border-3 rounded-md dark:border-white relative ${style}`}>
                <input id={id} onFocus={() => setIsOptionsShowed(true)} onBlur={() => setIsOptionsShowed(false)}
                autoComplete="off" autoCapitalize="off" spellCheck={false}
                className={`flex-[1_1_auto] focus:outline-0 min-w-0 dark:text-white`} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value, getKey(e.target.value))}/>
                {
                    menuActive &&
                    <FontAwesomeIcon className={`shrink-0 dark:text-white cursor-pointer ${iconStyle}`} icon={faChevronDown} ref={buttonRef}
                    onClick={() => setIsOptionsShowed((prev) => !prev)} />
                }
                {
                    isOptionsShowed &&
                    <section className="absolute top-full max-h-50 w-full dark:bg-zinc-950 bg-zinc-200 z-10 right-px rounded-b-lg overflow-y-auto">
                        {
                            filteredOptions().map((option) => <p key={option.key} onMouseDown={() => {onChange(option.value == null ? option.key : option.value, option.key); setIsOptionsShowed(false)}}
                            className={`${downStyle} dark:text-white text-zinc-600 p-2 font-bold dark:hover:bg-zinc-800 hover:bg-neutral-300 cursor-pointer transition-colors duration-100 ease-in-out`}>
                                {option.value == null ? option.key : option.value}</p>)
                        }
                    </section>
                }
            </section>
            {
                errors.length != 0 &&
                <InputError content={errors[0]}/>
            }
        </section>
    )
}

export default SelectField;