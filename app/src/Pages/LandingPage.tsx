import type { FC } from "react";
import { ScrollResponsibleBlock } from "../Utils/Components/Blocks";
import { BaseSeparator } from "../Utils/Components/Separators";

type Props = {

}

const LandingPage : FC<Props> = ({}) => {
    return (
        <>
            <ScrollResponsibleBlock style="fixed transition-all duration-500 ease-in-out left-0 right-0" upStyle="top-0" downStyle="top-[-75px]">
                <nav className="border-b-4 border-green-500 p-2 flex justify-between h-18.75">
                    <section className="flex items-center gap-x-4">
                        <img src="/favicon.png" alt="app logo" className="w-[50px]" />
                        <h1 className="font-bold dark:text-white text-neutral-800 text-2xl">Simple Tasks</h1>
                    </section>
                    <section className="flex items-center mr-3">
                        <button className="btn bg-green-600 hover:bg-green-500">Login</button>
                    </section>
                </nav>
            </ScrollResponsibleBlock>
            <main className="mt-18.75 h-screen p-2">
                <section className="flex flex-col lg:flex-row lg:justify-between justify-start lg:p-10 p-2 pt-10 ">
                    <section className=" flex lg:items-start items-center flex-col flex-1">
                        <h1 className="font-bold text-green-500 lg:text-5xl text-4xl tracking-widest text-center">Simply Task Application</h1>
                        <BaseSeparator style="dark:bg-green-500! bg-green-500! mt-4 w-[75%] rounded-md"/>
                        <p className="dark:text-zinc-200 text-dark my-5 ml-3 w-[75%] font-bold text-lg tracking-widest">
                            Simply task application that will deliver good experience with easy interface. This app is only for <span className="text-green-500 font-extrabold">TASKS</span>,
                            so you can stay simple with our app and easy manage own task in cleaner way
                        </p>
                    </section>
                    <section className="flex-1">

                    </section>
                </section>
            </main>
        
        
        </>
    )
}

export default LandingPage;