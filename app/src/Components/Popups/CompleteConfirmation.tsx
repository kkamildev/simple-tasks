import type { FC } from "react";
import { CenterPopup } from "../../Utils/Components/Popups";
import { ScrollShowBlock } from "../../Utils/Components/Blocks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
    deleteId:string,
    clearDeleteId:() => void;
    deleteTask:(id : string) => void;
}

const CompleteConfirmation : FC<Props> = ({deleteId, clearDeleteId, deleteTask}) => {
    return (
        deleteId && 
        <CenterPopup onNonFocusClick={clearDeleteId}>
            <ScrollShowBlock>
                <section className="dark:bg-zinc-900 bg-zinc-200 p-4 rounded-md">
                    <h1 className="my-6 font-bold text-center text-4xl">Are you sure?</h1>
                    <div className="flex flex-col lg:flex-row gap-x-4">
                        <button onClick={() => {
                            deleteTask(deleteId);
                            clearDeleteId()
                        }} className="btn bg-green-600 hover:bg-green-500"><FontAwesomeIcon icon={faCheck}/> Yes</button>
                        <button onClick={clearDeleteId} className="btn bg-red-600 hover:bg-red-500"><FontAwesomeIcon icon={faXmark}/> No</button>
                    </div>
                </section>
            </ScrollShowBlock>
        </CenterPopup>
    )
}

export default CompleteConfirmation;