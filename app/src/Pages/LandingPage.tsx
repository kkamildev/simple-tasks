import { useEffect, type FC } from "react";
import { ScrollResponsibleBlock, ScrollShowBlock } from "../Utils/Components/Blocks";
import { BaseSeparator } from "../Utils/Components/Separators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCode, faGears } from "@fortawesome/free-solid-svg-icons";
import { faSmile} from "@fortawesome/free-regular-svg-icons";
import { useUserApi } from "../Api";
import { Link, useNavigate } from "react-router-dom";

type Props = {

}

const LandingPage : FC<Props> = ({}) => {

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

    return (
        <>
            <ScrollResponsibleBlock style="fixed transition-all duration-500 ease-in-out left-0 right-0 z-20" upStyle="top-0" downStyle="top-[-75px]">
                <nav className="border-b-4 border-green-500 p-2 flex justify-between h-18.75 dark:bg-zinc-900 bg-neutral-200">
                    <section className="flex items-center gap-x-4 ml-3">
                        <img src="/favicon.png" alt="app logo" className="w-12.5" />
                        <h1 className="font-bold dark:text-white text-neutral-800 text-2xl">Simple Tasks</h1>
                    </section>
                    <section className="flex items-center mr-3">
                        <Link to="/login">
                            <button className="btn bg-green-600 hover:bg-green-500">Login</button>
                        </Link>
                    </section>
                </nav>
            </ScrollResponsibleBlock>
            <div className="bg-neutral-100 dark:bg-inherit! w-full h-18.75"></div>


            <main className="p-2 min-h-screen bg-neutral-100 dark:bg-inherit!">
                <div className="h-50 relative">
                    <div className="w-[50%] h-137.5 bg-green-700 [clip-path:polygon(100%_0%,100%_100%,0%_0%)] z-0 absolute top-0 right-0"></div>
                </div>
                <header className="flex flex-col lg:flex-row lg:justify-between justify-start lg:p-10 p-2 pt-10 items-center z-10 relative">
                    <section className="flex lg:items-start items-center flex-col flex-1">
                        <h1 className="font-bold text-green-500 text-4xl lg:text-6xl tracking-widest text-center">Simple Tasks Application</h1>
                        <BaseSeparator style="dark:bg-green-500! bg-green-500! mt-4 w-[75%] rounded-md"/>
                        <p className="dark:text-zinc-200 text-neutral-800 my-5 ml-3 w-[75%] font-bold lg:text-2xl text-lg tracking-widest">
                            Simply task application that will deliver good experience with easy interface. This app is only for <span className="text-green-500 font-extrabold">TASKS</span>,
                            so you can stay simple with our app and easy manage own task in cleaner way
                        </p>
                    </section>
                    <section className="flex-1 items-center justify-center">
                        
                    </section>
                </header>
                <div className="h-50"></div>
                <ScrollShowBlock>
                    <section className="my-5 flex flex-col items-center">
                        <h1 className="font-bold text-green-500 text-4xl lg:text-5xl tracking-widest text-center">What we offer?</h1>
                        <BaseSeparator style="dark:bg-green-500! bg-green-500! mt-4 lg:w-[25%] w-[75%] rounded-md"/>
                    </section>
                    <section className="flex flex-col gap-y-10 items-center mt-15 text-center">
                        <div className="p-3 rounded-lg shadow-md shadow-green-500/50 flex gap-3 flex-col lg:flex-row items-center lg:w-150 w-80 hover:scale-105 transition-transform duration-200 ease-in-out">
                            <FontAwesomeIcon icon={faCode} className="text-6xl text-green-500"/>
                            <h2 className="font-bold text-2xl">Clear application</h2>
                        </div>
                        <div className="p-3 rounded-lg shadow-md shadow-green-500/50 flex gap-3 flex-col lg:flex-row items-center lg:w-150 w-80 hover:scale-105 transition-transform duration-200 ease-in-out">
                            <FontAwesomeIcon icon={faGears} className="text-6xl text-green-500"/>
                            <h2 className="font-bold text-2xl">Simple to-do managing system</h2>
                        </div>
                        <div className="p-3 rounded-lg shadow-md shadow-green-500/50 flex gap-3 flex-col lg:flex-row items-center lg:w-150 w-80 hover:scale-105 transition-transform duration-200 ease-in-out">
                            <FontAwesomeIcon icon={faSmile} className="text-6xl text-green-500"/>
                            <h2 className="font-bold text-2xl">User friendly interface</h2>
                        </div>
                    </section>
                </ScrollShowBlock>
                <div className="h-50"></div>
                <ScrollShowBlock>
                    <section className="my-5 flex flex-col items-center">
                        <h1 className="font-bold text-green-500 text-4xl lg:text-5xl tracking-widest text-center">So Let's start</h1>
                        <BaseSeparator style="dark:bg-green-500! bg-green-500! mt-4 lg:w-[25%] w-[75%] rounded-md"/>
                        <h2 className="font-bold dark:text-white text-zinc-800 text-2xl lg:text-3xl text-center mt-5 w-100 lg:w-auto">Click this button to create an account</h2>
                    </section>
                    <section className="flex flex-col gap-y-10 items-center mt-10 text-center">
                        <Link to="/register">
                            <button className="btn btn-show bg-green-600 hover:bg-green-500 lg:text-3xl! text-2xl!">Create account</button>
                        </Link>
                    </section>
                </ScrollShowBlock>
                <div className="h-50"></div>
            </main>
            <footer className="border-t-4 border-t-green-500 p-4 dark:bg-zinc-900 bg-neutral-200">
                <h1 className="dark:text-white text-black font-bold text-2xl lg:text-start text-center p-2">Simple Tasks In Development</h1>
                <p className="text-zinc-600 font-bold text-lg lg:text-start text-center ml-3">App created by: <a className="text-green-500" href="https://github.com/kkamildev" target="_blank">Kkamildev <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></a></p>
                <section className="flex xl:flex-row flex-col justify-start gap-x-20 my-10 mx-10">
                    <div className="text-xl dark:text-white text-black flex-1">
                        <h2 className="h-7.5">Company</h2>
                        <BaseSeparator style="w-full h-[1px]"/>
                        <div className="flex flex-col mt-2">
                            <p className=" p-3! m-0! font-medium! dark:text-white! text-black! rounded-none!">Company S.A</p>
                            <p className=" p-3! m-0! font-medium! dark:text-white! text-black! rounded-none!">Adress: ul.Grzegórzecka 12, Kraków</p>
                            <p className=" p-3! m-0! font-medium! dark:text-white! text-black! rounded-none!">NIP: 86687551241</p>
                        </div>
                    </div>
                    <div className="text-xl dark:text-white text-black flex-1">
                        <h2 className="h-7.5">Contact</h2>
                        <BaseSeparator style="w-full h-[1px]"/>
                        <div className="flex flex-col mt-2">
                            <p className=" p-3! m-0! font-medium! dark:text-white! text-black! rounded-none!">Email: something@gmail.com</p>
                            <p className=" p-3! m-0! font-medium! dark:text-white! text-black! rounded-none!">Phone: +48 123123123</p>
                        </div>
                    </div>
                    <div className="text-2xl dark:text-white text-black flex-1">
                        <h2 className="h-7.5">Socials</h2>
                        <BaseSeparator style="w-full h-[1px]"/>
                        <div className="flex flex-col mt-2">
                            <a href="https://instagram.com" target="_blank" className="btn p-3! m-0! dark:hover:bg-zinc-100/5 hover:bg-zinc-800/5 font-medium! dark:text-white! text-black! rounded-none!">Instagram <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></a>
                            <a href="https://facebook.com" target="_blank" className="btn p-3! m-0! dark:hover:bg-zinc-100/5 hover:bg-zinc-800/5 font-medium! dark:text-white! text-black! rounded-none!">Facebook <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></a>
                            <a href="https://tiktok.com" target="_blank" className="btn p-3! m-0! dark:hover:bg-zinc-100/5 hover:bg-zinc-800/5 font-medium! dark:text-white! text-black! rounded-none!">Tiktok <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></a>
                        </div>
                    </div>
                    <div className="text-xl dark:text-white text-black flex-1">
                        <h2 className="h-7.5">Documents</h2>
                        <BaseSeparator style="w-full h-[1px]"/>
                        <div className="flex flex-col mt-2">
                            <a href="/privacyPolicy.pdf" target="_blank" className="btn p-3! m-0! dark:hover:bg-zinc-100/5 hover:bg-zinc-800/5 font-medium! dark:text-white! text-black! rounded-none!">Privacy Policy <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></a>
                            <a href="/termsOfService.pdf" target="_blank" className="btn p-3! m-0! dark:hover:bg-zinc-100/5 hover:bg-zinc-800/5 font-medium! dark:text-white! text-black! rounded-none!">Terms of service <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></a>
                        </div>
                    </div>
                </section>
            </footer>
        
        
        </>
    )
}

export default LandingPage;