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

                    <p className="font-bold text-zinc-500 mt-2 break-all">{data.content} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum reprehenderit ratione deserunt, debitis fuga quo repellat voluptatum eligendi recusandae impedit, exercitationem vitae modi odio sed laboriosam eius laudantium autem! Consectetur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta maxime officiis pariatur dolores sit, ducimus hic laudantium dolor corrupti voluptatibus id blanditiis aperiam, numquam tenetur quo dignissimos culpa. Quis, accusamus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt itaque ipsa dicta, quisquam natus porro ratione tempora magni corporis nobis sit cumque quas repellendus sed quaerat, soluta expedita perferendis! Officiis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, iusto! Nesciunt est blanditiis qui vero impedit numquam iste, accusamus, neque placeat nihil eveniet. Illum omnis accusamus optio unde. Libero, fugiat.</p>
                    </section>
                </section>
            </ScrollShowBlock>
        </CenterPopup>
    )
}

export default TaskView;