import type { FC } from "react";
import { ScrollResponsibleBlock, ScrollShowBlock } from "../Utils/Components/Blocks";
import { BaseSeparator } from "../Utils/Components/Separators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

type Props = {

}

const LandingPage : FC<Props> = ({}) => {
    return (
        <>
            <ScrollResponsibleBlock style="fixed transition-all duration-500 ease-in-out left-0 right-0" upStyle="top-0" downStyle="top-[-75px]">
                <nav className="border-b-4 border-green-500 p-2 flex justify-between h-18.75 bg-zinc-900">
                    <section className="flex items-center gap-x-4 ml-3">
                        <img src="/favicon.png" alt="app logo" className="w-[50px]" />
                        <h1 className="font-bold dark:text-white text-neutral-800 text-2xl">Simple Tasks</h1>
                    </section>
                    <section className="flex items-center mr-3">
                        <button className="btn bg-green-600 hover:bg-green-500">Login</button>
                    </section>
                </nav>
            </ScrollResponsibleBlock>
            <main className="mt-18.75 p-2 min-h-screen">
                <div className="h-50"></div>
                <header className="flex flex-col lg:flex-row lg:justify-between justify-start lg:p-10 p-2 pt-10 items-center">
                    <section className="flex lg:items-start items-center flex-col flex-1">
                        <h1 className="font-bold text-green-500 text-4xl lg:text-6xl tracking-widest text-center">Simple Task Application</h1>
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
                        <div className="p-3 rounded-lg shadow-md shadow-green-500/50 flex gap-3 flex-col lg:flex-row items-center lg:w-150 w-80">
                            <FontAwesomeIcon icon={faUser} className="text-6xl text-green-500"/>
                            <h2 className="font-bold text-2xl">Good user experience and interface</h2>
                        </div>
                        <div className="p-3 rounded-lg shadow-md shadow-green-500/50 flex gap-3 flex-col lg:flex-row items-center lg:w-150 w-80">
                            <FontAwesomeIcon icon={faGears} className="text-6xl text-green-500"/>
                            <h2 className="font-bold text-2xl">Simple app functions</h2>
                        </div>
                    </section>
                </ScrollShowBlock>
            </main>
        
        
        </>
    )
}

export default LandingPage;