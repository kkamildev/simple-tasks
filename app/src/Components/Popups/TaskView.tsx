import type { FC } from "react";
import { CenterPopup } from "../../Utils/Components/Popups";
import { ScrollShowBlock } from "../../Utils/Components/Blocks";
import type { Task } from "../../Api";
import { useKeyboard } from "../../Utils/Hooks";

type Props = {
    data:Task,
    onClose:() => void;
}

const TaskView : FC<Props> = ({data, onClose}) => {

    useKeyboard(
        {
            Escape:() => onClose()
        },
        true
    )

    return (
        <CenterPopup onNonFocusClick={onClose}>
            <ScrollShowBlock>
                <section className="dark:bg-zinc-900 bg-zinc-200 p-4 rounded-md max-w-100 lg:max-w-200">
                    {
                        data.deadline <= new Date() &&
                        <section className="flex justify-center">
                            <span className="p-2 text-white bg-red-800 rounded-md font-bold mb-1 flex justify-center">Missed</span>
                        </section>
                    }
                    <h1 className="my-3 font-bold text-green-500 text-center text-4xl">{data.title}</h1>
                    <p className="font-bold mt-3 text-xl">Created at {data.createdAt.toLocaleDateString()} {data.createdAt.toLocaleTimeString()}</p>
                    <section className="flex flex-wrap gap-x-3 mt-4">
                        <p className={`font-bold text-zinc-700 ${data.deadline <= new Date(Date.now() + 1000 * 60 * 60 * 24) && "text-red-700!"}`}>Deadline: {data.deadline.toLocaleDateString() + " " + data.deadline.toLocaleTimeString()}</p>
                        <p className="font-bold text-zinc-700">priority: {data.priority}</p>
                    </section>
                    <section className="max-h-125 overflow-y-auto lg:pr-0 pr-10 mt-3">

                    <p className="font-bold text-zinc-500 mt-2 break-all">{data.content}</p>
                    </section>
                </section>
            </ScrollShowBlock>
        </CenterPopup>
    )
}

export default TaskView;