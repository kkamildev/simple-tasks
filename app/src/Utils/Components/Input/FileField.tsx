import { useRef, useState, type ChangeEvent, type FC } from "react";
import { InputError } from "../Notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

type Props = {
    title?:string,
    subtitle?:string,
    style?:string,
    inputStyle?:string,
    id:string,
    onChange:(value : FileList) => void;
    maxCharacters?:number,
    mediaTypes?:string,
    minSizeMb?:number,
    maxSizeMb?:number,
    filesCount?:number
}

const FileField : FC<Props> = ({id, title, subtitle, style = "", inputStyle = "", onChange, mediaTypes = "", filesCount = 1, maxSizeMb = null, minSizeMb = null}) => {

    const inputRef = useRef(null);

    const [preview, setPreview] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);


    const handleFile = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const fileArray = Array.from(e.target.files);
        
        for(const file of fileArray) {
            if (!file) return;
            if (mediaTypes.length !== 0) {
                const allowed = mediaTypes.split(", ").map(t => t.trim());
                const fileType = file.type;
                const fileName = file.name.toLowerCase();
                const fileExt = fileName.split(".").pop();

                const isAllowed = allowed.some(type => {
                    if (type.endsWith("/*")) {
                        const prefix = type.replace("/*", "");
                        return fileType.startsWith(prefix);
                    }

                    if (type.startsWith(".")) {
                        return fileExt === type.replace(".", "");
                    }

                    return fileType === type;
                });

                if (!isAllowed) {
                    destroyFile("Not allowed");
                    return;
                }
            }
            if(maxSizeMb != null) {
                if(file.size > maxSizeMb * 1024 * 1024) {
                    destroyFile("Too big");
                    return;
                }
            }
            if(minSizeMb != null) {
                if(file.size < minSizeMb * 1024 * 1024) {
                    destroyFile("Too small");
                    return;
                }
            }
            setPreview((prev) => [...prev, file.name]);
        }
        setErrors([]);
    }

    const destroyFile = (error : string) => {
        const scrollY = window.scrollY;
        setPreview([]);
        onChange(null);
        inputRef.current.value = "";
        setTimeout(() => {
            window.scrollTo(0, scrollY);
        }, 0);
        if(error == null) {
            setErrors([]);
        } else {
            setErrors([error]);
        }
    }

    return(
        <section className="m-2 min-w-0">
            {title && <label htmlFor={id}><p className="font-bold text-xl mt-2 dark:text-white">{title}</p></label>}
            {subtitle && <label htmlFor={id}><p className="font-bold mb-2 text-zinc-600">{subtitle}</p></label>}
            <section className={`flex flex-col gap-x-3 p-2 items-center border-3 border-dashed rounded-md dark:border-white ${style}`}>
                <input ref={inputRef} className="hidden" type="file" onChange={(e) => {
                    handleFile(e),
                    onChange(e.target.files)
                }} accept={mediaTypes} multiple={filesCount > 1}/>
                {
                    preview.length == 0 && <FontAwesomeIcon icon={faFile} className="dark:text-white text-black text-2xl mt-3"/>
                }
                <section className="flex flex-col items-start gap-y-2">
                    {preview.length != 0 && preview.map((value) => <p key={value} className="dark:text-white text-black text-left">{value}</p>)}
                </section>

                {
                    preview.length == 0 ? <>
                        <button id={id} type="button" className={`${inputStyle} btn text-lg! dark:text-white! text-black!`} onClick={() => inputRef.current.click()}>Import files</button>
                        {mediaTypes.length != 0 && <p className="text-zinc-600">Allowed: {mediaTypes}</p>}
                        {maxSizeMb && <p className="text-zinc-600">Max size: {maxSizeMb}Mb</p>}
                        {minSizeMb && <p className="text-zinc-600">Min size: {minSizeMb}Mb</p>}
                    </> :
                    <button id={id} type="button" className={`${inputStyle} btn text-lg! text-red-700!`} onClick={() => destroyFile(null)}>Cancel upload</button>
                }
            </section>
            {
                errors.length != 0 &&
                <InputError content={errors[0]}/>
            }
        </section>
    )
}

export default FileField;