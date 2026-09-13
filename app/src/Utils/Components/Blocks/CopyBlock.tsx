import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type FC } from "react";

type Props = {
    dataToCopy:string,
    style?:string
}

const CopyBlock : FC<Props> = ({dataToCopy, style = ""}) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(dataToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className={`${style} flex justify-between items-center p-3 px-3 m-2 rounded-lg dark:bg-neutral-800 bg-neutral-200 border-neutral-600 border`}>
            <section className="min-w-0 mr-2 h-auto">
                <span className="dark:text-white font-bold">Api Key</span>
                <pre className="dark:text-zinc-500 text-zinc-800 text-md py-1.5 pt-1! overflow-y-scroll dark:custom-scroll-dark custom-scroll-light">{dataToCopy}</pre>
            </section>
            <button type="button" onClick={handleCopy} className="btn bg-green-700 hover:bg-green-600 text-sm! p-2!">
                <FontAwesomeIcon icon={copied ? faCheck : faCopy}/>
            </button>
        </section>
    )
}

export default CopyBlock;