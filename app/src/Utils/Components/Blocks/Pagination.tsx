import type { FC, ReactNode } from "react";

type Props = {
    components:ReactNode[],
    pageIndex?:number,
    style?:string,
    componentsPerPage?:number
}

const Pagination : FC<Props> = ({components, pageIndex = 0, style = "", componentsPerPage = 10}) => {

    const minIndex = pageIndex * componentsPerPage;
    const maxIndex = minIndex + componentsPerPage;

    return (
        <section className={`${style}`}>
            {components.filter((_obj, index) => index >= minIndex && index < maxIndex).map((obj, index) => <section key={index}>{obj}</section>)}
        </section>
    )
}

export default Pagination;