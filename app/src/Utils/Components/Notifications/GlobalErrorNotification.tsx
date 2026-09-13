import { faWifi, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type FC } from "react";
import { useGlobalErrorStore } from "../../Stores";


type Props = {

}

const GlobalErrorNotification : FC<Props> = ({}) => {

    const errorStore = useGlobalErrorStore();

    const [detailsVisible, setDetailsVisible] = useState<boolean>(false);


    return (
        errorStore.errorAppeared &&
        <section className="top-0 left-0 flex justify-center right-0 pointer-events-none absolute z-20 transition-all duration-300 ease-in-out">
            <section className="bg-red-600 text-white pointer-events-auto m-4 py-2 px-4 rounded-md text-lg max-w-75 lg:max-w-100">
                {
                    !errorStore.networkError ? <>
                        <section className="flex items-center justify-between gap-x-4">
                            <button className="border border-white px-2 py-1 cursor-pointer" onClick={() => setDetailsVisible((prev) => !prev)}>
                                Details
                            </button>
                            <h1 className="font-bold">{errorStore.errorTitle}</h1>
                            <FontAwesomeIcon icon={faXmark} className="cursor-pointer text-xl" onClick={() => {errorStore.dismissError(); setDetailsVisible(false)}}/>
                        </section>
                        {
                            detailsVisible && 
                            <section className="flex flex-col mt-2 text-md">
                                <h2 className="font-bold">Details:</h2>
                                <p>Error type: {errorStore.errorType || "none"}</p>
                                <p>Description: {errorStore.errorMessage || "none"}</p>
                            </section>
                        }
                    </> : 
                    <>
                    <section className="flex items-center justify-between gap-x-4">
                        <FontAwesomeIcon icon={faWifi}/>
                        <h1 className="font-bold">Check internet connection</h1>
                        <FontAwesomeIcon icon={faXmark} className="cursor-pointer text-xl" onClick={() => {errorStore.dismissError(); setDetailsVisible(false)}}/>
                    </section>
                    </>
                }
            </section>
        </section>
    )
}

export default GlobalErrorNotification;