import { useCallback, useEffect, useState } from "react";


export type ValidationObject = {
    fieldId:string,
    errorMessages:string[],
    validations:RegExp[],
    required:boolean,
    keyCheck?:boolean
}

const useForm = (validators : ValidationObject[]) => {
    const [data, setData] = useState<{id:string, value:string, key?:string}[]>([]);
    const [errors, setErrors] = useState<{id:string, error:string}[]>([]);

    useEffect(() => {
        setData(validators.map((obj) => ({id:obj.fieldId, value:null})))
    }, []);
    useEffect(() => {
        const newErrors: { id: string; error: string }[] = [];

        data.forEach(obj => {
            if(obj.value != null) {
                const validator = validators.find(v => v.fieldId === obj.id);
                if (!validator) return;
    
                validator.validations.forEach((regExp, index) => {
                    if(validator.keyCheck) {
                        if (!regExp.test(obj.key || "")) {
                            newErrors.push({ id: obj.id, error: validator.errorMessages[index] });
                        }
                    } else {
                        if (!regExp.test(obj.value)) {
                            newErrors.push({ id: obj.id, error: validator.errorMessages[index] });
                        }
                    }
                });
            }
        });

        setErrors(newErrors);
    }, [data, validators]);

    const update = useCallback((id : string, newValue : string, key? : string) => {
        setData((prev) => prev.map((obj) => {
            if(obj.id == id) {
                return ({id, value:newValue, key})
            }
            return obj;
        }))
    }, []);
    const getErrors = useCallback((id : string) => {
        return errors.filter((obj) => obj.id == id).map((obj) => obj.error);
    }, [errors]);

    const getData = useCallback((id : string) => {
        return data.find((obj) => obj.id == id);
    }, [data]);

    const checkComplete = useCallback(() => {
        if (errors.length > 0) return false;
        const completed = data.every(obj => {
            const validator = validators.find(v => v.fieldId === obj.id);
            if (!validator) return true;
            if (!validator.required) return true;
            if(validator.keyCheck) {
                return !!obj.key && obj.key.trim() !== "";
            } else {
                return !!obj.value && obj.value.trim() !== "";
            }
        });
        if(!completed) {
            setData((prev) => prev.map((obj) => ({id:obj.id, value:obj.value == null ? "" : obj.value})))
        }
        return completed;
    }, [errors, data, validators]);


    return [getData, update, getErrors, setErrors, checkComplete] as [
        (id: string) => {id : string, value:string, key?:string} | undefined,
        (id: string, newValue: string, key? : string) => void,
        (id: string) => string[] | undefined,
        React.Dispatch<React.SetStateAction<{ id: string; error: string }[]>>,
        () => boolean
    ];
}

export {useForm};