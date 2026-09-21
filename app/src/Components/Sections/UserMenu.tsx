import { faArrowLeft, faLock, faRightFromBracket, faSpinner, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState, type FC } from "react"
import { BaseSeparator } from "../../Utils/Components/Separators";
import { useUserApi } from "../../Api";
import { useNavigate } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Accordion } from "../../Utils/Components/Blocks";
import { Form, InputField } from "../../Utils/Components/Input";
import { useForm } from "../../Utils/Hooks";
import { ReverseLoader, SpinLoader } from "../../Utils/Components/Loaders";
import { ErrorDisplay, InputError } from "../../Utils/Components/Notifications";


type Props = {
    backState:() => void;
}

const UserMenu : FC<Props> = ({backState}) => {

    const userApi = useUserApi();
    const navigate = useNavigate();

    const logout = async () => {
        const result = await userApi.logout("logout");
        if(result) {
            navigate("/");
        }
    }

    const emailValidators = useMemo(() => [
        {
            fieldId:"email",
            errorMessages:["Required", "Too long", "Invalid"],
            validations:[/.+/, /^.{0,50}$/, /^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            required:true
        },
    ], []);

    const passwordValidators = useMemo(() => [
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
    ], []);

    const [getEmailData, updateEmail, getEmailErrors,, checkEmailComplete] = useForm(emailValidators);

    const [getPasswordData, updatePassword, getPasswordErrors,, checkPasswordComplete] = useForm(passwordValidators);

    const submitEmailChanging = async () => {
        if(checkEmailComplete()) {
            const result = await userApi.updateEmail(getEmailData("email")?.value || "", "changeEmail")
            if(result) {
                backState();
            }
        }
    }

    const submitPasswordChanging = async () => {
        if(checkPasswordComplete()) {
            if(getPasswordData("password")?.value == getPasswordData("repeatedPassword")?.value) {
                const result = await userApi.updatePassword(getPasswordData("password")?.value || "", "changePassword");
                if(result) {
                    backState();
                }
            }
        }
    }

    const [notSamePasswords, setNotSamePasswords] = useState<boolean>(false);

    const checkPasswordRepeat = (passwordValue? : string, repeatedPasswordValue? : string) => {
        if(passwordValue && repeatedPasswordValue) {
            setNotSamePasswords(passwordValue != repeatedPasswordValue);
        }
    }

    return (
        <main className="p-2 min-h-screen bg-neutral-100 dark:bg-inherit!">
            <button onClick={backState} className="btn bg-red-700 hover:bg-red-600"><FontAwesomeIcon icon={faArrowLeft}/> Back</button>
            <section className="flex flex-col items-center gap-y-5">
                <FontAwesomeIcon icon={faUserGear} className="text-6xl text-green-500"/>
                <h1 className="text-center p-2 dark:text-white text-zinc-800 font-bold text-3xl">User Options</h1>
                <button onClick={logout} className="btn bg-red-700 hover:bg-red-600"><FontAwesomeIcon icon={faRightFromBracket}/> Log out</button>
                <BaseSeparator style="dark:bg-green-500! bg-green-500! mt-4 max-w-[50%] w-100 rounded-md"/>
            </section>
            <section className="flex flex-col items-center gap-y-1 mt-5">
                <Accordion title="Set new email" buttonStyle="font-bold! btn w-100! m-0! dark:hover:bg-zinc-800! hover:bg-zinc-200! text-2xl! text-left! text-black! dark:text-white!">
                    <Form onSubmit={() => submitEmailChanging()}>
                        <h2 className="text-center font-bold text-green-500 text-2xl">Enter new Email</h2>
                        <section className="m-3">
                            <InputField
                                id="email"
                                onChange={(value) => updateEmail("email", value)}
                                value={getEmailData("email")?.value || ""}
                                placeholder="New email..."
                                icon={faEnvelope}
                                iconStyle="text-green-500!"
                                errors={getEmailErrors("email")}
                            />
                        </section>
                        <ErrorDisplay reqId="changeEmail" errorType="CONFLICT_ERROR">
                            <InputError enableAnimation content="This email is not available"/>
                        </ErrorDisplay>
                        <button className="btn hover:bg-green-500 bg-green-600 inline-block">
                            <ReverseLoader reqId="changeEmail">
                                Change email
                            </ReverseLoader>
                            <SpinLoader reqId="changeEmail">
                                <FontAwesomeIcon icon={faSpinner}/>
                            </SpinLoader>
                        </button>
                    </Form>
                </Accordion>
                <Accordion title="Set new password" buttonStyle="font-bold! btn w-100! m-0! dark:hover:bg-zinc-800! hover:bg-zinc-200! text-2xl! text-left! text-black! dark:text-white!">
                    <Form onSubmit={() => submitPasswordChanging()}>
                        <h2 className="text-center font-bold text-green-500 text-2xl">Enter new Password</h2>
                        <section className="m-3 flex flex-col gap-y-1">
                            <InputField
                                id="password"
                                type="password"
                                onChange={(value) => {updatePassword("password", value); checkPasswordRepeat(value, getPasswordData("repeatedPassword")?.value || "")}}
                                value={getPasswordData("password")?.value || ""}
                                placeholder="New password..."
                                icon={faLock}
                                iconStyle="text-green-500!"
                                errors={getPasswordErrors("password")}
                            />
                            <InputField
                                id="repeatedPassword"
                                type="password"
                                onChange={(value) => {updatePassword("repeatedPassword", value); checkPasswordRepeat(getPasswordData("password")?.value || "", value)}}
                                value={getPasswordData("repeatedPassword")?.value || ""}
                                placeholder="Repeat password..."
                                icon={faLock}
                                iconStyle="text-green-500!"
                                errors={getPasswordErrors("repeatedPassword")}
                            />
                        </section>
                        <section className="flex flex-col gap-y-1">
                            {
                                notSamePasswords && <InputError enableAnimation content="Passwords are not the same"/>
                            }
                        </section>
                        <button className="btn hover:bg-green-500 bg-green-600 inline-block">
                            <ReverseLoader reqId="changePassword">
                                Change password
                            </ReverseLoader>
                            <SpinLoader reqId="changePassword">
                                <FontAwesomeIcon icon={faSpinner}/>
                            </SpinLoader>
                        </button>
                    </Form>
                </Accordion>
            </section>
        </main>
    )
}

export default UserMenu;