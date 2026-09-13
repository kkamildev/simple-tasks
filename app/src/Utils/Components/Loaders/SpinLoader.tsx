import type { FC, ReactNode } from "react";
import { useLoadingStore } from "../../Stores";

type Props = {
    children:ReactNode,
    reqId:string
}

const SpinLoader : FC<Props> = ({children, reqId}) => {

    const loaders = useLoadingStore((store) => store.loaders);

    return (
        loaders.includes(reqId) && <section className="animate-spin flex items-center justify-center">
            {children}
        </section>
    )
}

export default SpinLoader;