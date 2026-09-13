import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState, type FC } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-python";


type Props = {
    title: string;
    code: string;
    language: string;
    style?:string,
    buttonStyle?:string
};

const CodeBlock: FC<Props> = ({title, code, language, style = "", buttonStyle = ""}) => {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="dark:bg-neutral-900 text-neutral-100 rounded-lg border border-neutral-700 overflow-hidden m-2">
            <div className={`flex justify-between items-center px-4 py-2 bg-neutral-800 border-neutral-700 ${style}`}>
                <span className="font-medium text-sm">{title}</span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className={`btn bg-neutral-700 hover:bg-neutral-600 text-sm! px-1! py-1! rounded-md m-0! ${buttonStyle}`}
                >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy}/> {copied ? "Copied" : "Copy"}
                </button>
            </div>

            <pre className="p-4 whitespace-pre text-xs! m-0! overflow-x-auto dark:custom-scroll-dark custom-scroll-light">
                <code ref={codeRef} className={`language-${language}`}>{code}</code>
            </pre>
        </section>
    );
};

export default CodeBlock;
