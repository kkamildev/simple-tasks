import { useEffect, useMemo, type FC } from "react";
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

const LoginPage : FC<Props> = ({}) => {
    const userApi = useUserApi();
    const navigate = useNavigate();
    
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
                errorMessages:["Required"],
                validations:[/.+/],
                required:true
            },
            {
                fieldId:"password",
                errorMessages:["Required"],
                validations:[/.+/],
                required:true
            }
        ]
    }, [])

    const [getData, update, getErrors,, checkComplete] = useForm(validators);

    const loginSubmit = async () => {
        if(checkComplete()) {
            const result = await userApi.login(getData("email")?.value || "", getData("password")?.value || "", "login");
            if(result) {
                navigate("/app");
            }
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
                        <h1 className="font-bold text-green-500 text-3xl tracking-widest text-center">Login to system</h1>
                        <BaseSeparator style="dark:bg-green-500! bg-green-500! mt-4 w-[75%] rounded-md"/>
                        <Form onSubmit={() => loginSubmit()}>
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
                                    onChange={(value) => update("password", value)}
                                    value={getData("password")?.value || ""}
                                    placeholder="Password..."
                                    icon={faLock}
                                    iconStyle="text-green-500!"
                                    errors={getErrors("password")}
                                />
                                <button className="btn hover:bg-green-500 bg-green-600 inline-block">
                                    <ReverseLoader reqId="login">
                                        Log in
                                    </ReverseLoader>
                                    <SpinLoader reqId="login">
                                        <FontAwesomeIcon icon={faSpinner}/>
                                    </SpinLoader>
                                </button>
                                <section className="flex flex-col gap-y-1">
                                    <ErrorDisplay reqId="login" errorType="AUTH_ERROR">
                                        <InputError enableAnimation content="Invalid Login Data"/>
                                    </ErrorDisplay>
                                </section>
                            </section>
                        </Form>
                    </section>
                    <p className="mt-10  text-xl text-center text-zinc-600 font-bold">If you don't have an account</p>
                    <Link to="/register">
                        <button className="btn hover:bg-green-500 bg-green-600">Register</button>
                    </Link>
                </main>
            </ScrollShowBlock>
        </>
    )
}

export default LoginPage;