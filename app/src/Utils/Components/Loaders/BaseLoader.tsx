
import type { FC, ReactNode } from "react";
import { useLoadingStore } from "../../Stores";

type Props = {
    children:ReactNode,
    reqId:string
}

const BaseLoader : FC<Props> = ({children, reqId}) => {

    const loaders = useLoadingStore((store) => store.loaders);

    return (
        loaders.includes(reqId) && <section>
            {children}
        </section>
    )
}

export default BaseLoader;