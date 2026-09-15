import { useEffect, useMemo, useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserApi } from "../Api";
import { BaseSeparator } from "../Utils/Components/Separators";
import { Form, InputField } from "../Utils/Components/Input";
import { useForm } from "../Utils/Hooks";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ErrorDisplay, InputError } from "../Utils/Components/Notifications";
import { ReverseLoader, SpinLoader } from "../Utils/Components/Loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollShowBlock } from "../Utils/Components/Blocks";

type Props = {

}

const RegisterPage : FC<Props> = ({}) => {
    const userApi = useUserApi();
    const navigate = useNavigate();

    const [notSamePasswords, setNotSamePasswords] = useState<boolean>(false);
    
    useEffect(() => {
        const authUser = async () => {
            const result = await userApi.auth("");
            if(result) {
                navigate("/app");
            }
        }
        authUser();
    }, []);

    const validators = useMemo(() => {
        return [
            {
                fieldId:"email",
                errorMessages:["Required", "Too long", "Invalid"],
                validations:[/.+/, /^.{0,50}$/, /^[^\s@]+@[^\s@]+\.[^\s@]+$/],
                required:true
            },
            {
                fieldId:"password",
                errorMessages:["Required", "Min 8 characters"],
                validations:[/.+/, /^.{8,}$/],
                required:true
            },
            {
                fieldId:"repeatedPassword",
                errorMessages:["Required"],
                validations:[/.+/],
                required:true
            }
        ]
    }, [])

    const [getData, update, getErrors,, checkComplete] = useForm(validators);

    const registerSubmit = async () => {
        if(checkComplete()) {
            const result = await userApi.register(getData("email")?.value || "", getData("password")?.value || "", "register");
            if(result) {
                
            }
        }
    }

    const checkPasswordRepeat = (passwordValue? : string, repeatedPasswordValue? : string) => {
        if(passwordValue && repeatedPasswordValue) {
            setNotSamePasswords(passwordValue != repeatedPasswordValue);
        }
    }


    return (
        <>
            <div className="relative">
                <div className="w-[75%] h-137.5 bg-green-700 [clip-path:polygon(100%_0%,100%_100%,0%_0%)] z-0 absolute top-0 right-0"></div>
            </div>
            <ScrollShowBlock>

                <main className="flex flex-col w-full items-center h-screen justify-center">
                    <section className=" relative p-4 shadow-md shadow-green-500/50 rounded-lg flex flex-col items-center z-10 dark:bg-zinc-900 bg-neutral-100">
                        <img src="/favicon.png" alt="app logo" className="w-12.5 mb-4" />
                        <h1 className="font-bold text-green-500 text-3xl tracking-widest text-center">Register to system</h1>
                        <BaseSeparator style="dark:bg-green-500! bg-green-500! mt-4 w-[75%] rounded-md"/>
                        <Form onSubmit={() => registerSubmit()}>
                            <section className="w-full flex flex-col gap-y-1">
                                <InputField
                                    id="email"
                                    onChange={(value) => update("email", value)}
                                    value={getData("email")?.value || ""}
                                    placeholder="Email..."
                                    icon={faEnvelope}
                                    iconStyle="text-green-500!"
                                    errors={getErrors("email")}
                                />
                                <InputField
                                    id="password"
                                    type="password"
                                    onChange={(value) => {update("password", value); checkPasswordRepeat(value, getData("repeatedPassword")?.value || "")}}
                                    value={getData("password")?.value || ""}
                                    placeholder="Password..."
                                    icon={faLock}
                                    iconStyle="text-green-500!"
                                    errors={getErrors("password")}
                                />
                                <InputField
                                    id="repeatedPassword"
                                    type="password"
                                    onChange={(value) => {update("repeatedPassword", value); checkPasswordRepeat(getData("password")?.value || "", value)}}
                                    value={getData("repeatedPassword")?.value || ""}
                                    placeholder="Repeat password..."
                                    icon={faLock}
                                    iconStyle="text-green-500!"
                                    errors={getErrors("repeatedPassword")}
                                />
                                <button className="btn hover:bg-green-500 bg-green-600 inline-block">
                                    <ReverseLoader reqId="register">
                                        Create new Account
                                    </ReverseLoader>
                                    <SpinLoader reqId="register">
                                        <FontAwesomeIcon icon={faSpinner}/>
                                    </SpinLoader>
                                </button>
                                <section className="flex flex-col gap-y-1">
                                    {
                                        notSamePasswords && <InputError enableAnimation content="Passwords are not the same"/>
                                    }
                                    <ErrorDisplay reqId="register" errorType="CONFLICT_ERROR">
                                        <InputError enableAnimation content="This email is not available"/>
                                    </ErrorDisplay>
                                </section>
                            </section>
                        </Form>
                    </section>
                    <p className="mt-10  text-xl text-center text-zinc-600 font-bold">If you already have an account</p>
                    <Link to="/login">
                        <button className="btn hover:bg-green-500 bg-green-600">Login</button>
                    </Link>
                </main>
            </ScrollShowBlock>
        </>
    )
}

export default RegisterPage;