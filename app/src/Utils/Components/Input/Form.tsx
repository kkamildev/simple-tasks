import type { FC, ReactNode } from "react";


type Props = {
    children:ReactNode,
    title?:string,
    style?:string,
    titleStyle?:string,
    onSubmit:() => void
}

const Form : FC<Props> = ({children, title, style = "", titleStyle = "", onSubmit}) => {
    return(
        <form className={`p-5 flex flex-col items-center ${style}`} onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}>
            {title && <h1 className={`dark:text-white text-neutral-800 text-3xl font-bold ${titleStyle}`}>{title}</h1>}
            {children}
        </form>
    )
}

export default Form;