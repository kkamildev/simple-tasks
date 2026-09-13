import type { FC, ReactNode } from "react";
import { useErrorStore } from "../../Stores";

type Props = {
    children:ReactNode,
    reqId:string,
    errorType?:string
}

const ErrorDisplay : FC<Props> = ({reqId, children, errorType = ""}) => {

    const errors = useErrorStore((state) => state.errors);

    return (
        errors.some((obj) => obj.id === reqId && (!errorType || obj.body.type === errorType)) &&
        <section>
            {children}
        </section>
    )
}

export default ErrorDisplay;