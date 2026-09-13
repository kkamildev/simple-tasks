import type { FC } from "react";


type Props = {
    style?:string
}

const BaseSeparator : FC<Props> = ({style = ""}) => {
    return (
        <div className={`${style} w-25 h-1.25 dark:bg-white bg-black`}></div>
    )
}

export default BaseSeparator;