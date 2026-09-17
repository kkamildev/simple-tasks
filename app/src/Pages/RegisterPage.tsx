import { useEffect, useMemo, useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserApi } from "../Api";
import { BaseSeparator } from "../Utils/Components/Separators";
import { Form, InputField, Switch } from "../Utils/Components/Input";
import { useForm } from "../Utils/Hooks";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare, faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
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

    const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");

    useEffect(() => {
        if(verifyEmail) {
            setCode("");
        }
    }, [verifyEmail])
    

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
            },
            {
                fieldId:"termsOfService",
                errorMessages:["Must be checked"],
                validations:[/^true$/],
                required:true
            },
            {
                fieldId:"privacyPolicy",
                errorMessages:["Must be checked"],
                validations:[/^true$/],
                required:true
            },
        ]
    }, [])

    const [getData, update, getErrors,, checkComplete] = useForm(validators);

    const registerSubmit = async () => {
        if(checkComplete()) {
            if(getData("password")?.value == getData("repeatedPassword")?.value) {
                const result = await userApi.register(getData("email")?.value || "", getData("password")?.value || "", "register");
                if(result) {
                    setVerifyEmail(true);
                }
            }
        }
    }

    const emailVerificationSubmit = async () => {
        const result = await userApi.verify(getData("email")?.value || "", code, "email-verify");
        if(result) {
            const result2 = await userApi.register(getData("email")?.value || "", getData("password")?.value || "", "register");
            if(result2) {
                navigate("/app");
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
            {
                !verifyEmail ? 
                <ScrollShowBlock>
                    <main className="flex flex-col w-full items-center min-h-screen justify-center">
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
                                    <section className="flex flex-col my-3">
                                        <Switch
                                            title="I accept Terms Of Service"
                                            id="termsOfService"
                                            onChange={(value) => update("termsOfService", value)}
                                            value={getData("termsOfService")?.value || "false"}
                                            errors={getErrors("termsOfService")}
                                        />
                                        <Switch
                                            title="I accept Privacy Policy"
                                            id="privacyPolicy"
                                            onChange={(value) => update("privacyPolicy", value)}
                                            value={getData("privacyPolicy")?.value || "false"}
                                            errors={getErrors("privacyPolicy")}
                                        />
                                    </section>
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
                            <section className="flex flex-col gap-y-1">
                                <a className="hover:underline" href="/termsOfService.pdf" target="_blank">Terms Of Service <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></a>
                                <a className="hover:underline" href="/privacyPolicy.pdf" target="_blank">Privacy Policy <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></a>
                            </section>
                        </section>
                        <p className="mt-10 text-xl text-center text-zinc-600 font-bold">If you already have an account</p>
                        <Link to="/login">
                            <button className="btn hover:bg-green-500 bg-green-600">Login</button>
                        </Link>
                    </main>
                </ScrollShowBlock>
                :
                <ScrollShowBlock>
                    <main className="flex flex-col w-full items-center min-h-screen justify-center">
                        <section className=" relative p-4 shadow-md shadow-green-500/50 w-100 lg:w-auto rounded-lg flex flex-col items-center z-10 dark:bg-zinc-900 bg-neutral-100">
                            <FontAwesomeIcon icon={faEnvelope} className="text-6xl text-green-500"/>
                            <h1 className="font-bold text-green-500 text-3xl tracking-widest text-center">Verify Email</h1>
                            <p className=" dark:text-white text-zinc-800 font-bold text-2xl text-center">We have sent verification code on:</p>
                            <p className="my-3 text-green-500 font-bold text-2xl text-center">{getData("email")?.value}</p>
                            <p className="my-1  text-zinc-700 font-bold text-2xl text-center">Check you email box and enter code</p>
                            <Form onSubmit={() => emailVerificationSubmit()}>
                                <InputField
                                    id="code"
                                    onChange={(value) => setCode(value)}
                                    value={code}
                                    placeholder="Code..."
                                    icon={faLock}
                                    iconStyle="text-green-500!"
                                    errors={getErrors("email")}
                                />
                                <ErrorDisplay reqId="register" errorType="AUTH_ERROR">
                                    <InputError enableAnimation content="Authentication failed"/>
                                </ErrorDisplay>
                                <button className="btn hover:bg-green-500 bg-green-600 inline-block">
                                    <ReverseLoader reqId="email-verify">
                                        Verify email
                                    </ReverseLoader>
                                    <SpinLoader reqId="email-verify">
                                        <FontAwesomeIcon icon={faSpinner}/>
                                    </SpinLoader>
                                </button>
                            </Form>
                        </section>
                        <button onClick={() => setVerifyEmail(false)} className="btn hover:bg-green-500 bg-green-600 mt-10!">Back</button>
                    </main>
                </ScrollShowBlock>
            }
        </>
    )
}

export default RegisterPage;