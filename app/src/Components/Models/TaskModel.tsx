import type { FC } from "react"
import type { Task } from "../../Api"
import { truncate } from "../../Utils/Helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faPen, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { ReverseLoader, SpinLoader } from "../../Utils/Components/Loaders"
import { ErrorDisplay } from "../../Utils/Components/Notifications"
import { Navigate } from "react-router-dom"


type Props = {
    data:Task,
    number:number;
    onDelete:(id : string) => void;
    onSetView:(task : Task) => void;
    onUpdate:(task : Task) => void;
}

const TaskModel : FC<Props> = ({data, number, onDelete, onSetView, onUpdate}) => {

    return (
        <div className="p-4 shadow-md shadow-green-500/50 rounded-xl hover:scale-102 transition-transform duration-100 ease-in-out flex flex-col justify-between">
            <div>
                {
                    data.deadline <= new Date() &&
                    <section className="flex justify-center">
                        <span className="p-2 text-white bg-red-800 rounded-md font-bold mb-1 flex justify-center">Missed</span>
                    </section>
                }
                <h1 className="text-2xl font-bold text-green-500">#{number}</h1>
                <p className="font-bold mt-3">Created at {data.createdAt.toLocaleDateString()} {data.createdAt.toLocaleTimeString()}</p>
                <h2 className="text-2xl font-bold break-all mb-3 mt-1">{data.title}</h2>
                <section className="flex flex-wrap gap-x-3">
                    <p className={`font-bold text-zinc-700 ${data.deadline <= new Date(Date.now() + 1000 * 60 * 60 * 24) && "text-red-700!"}`}>Deadline: {data.deadline.toLocaleDateString() + " " + data.deadline.toLocaleTimeString()}</p>
                    <p className="font-bold text-zinc-700">priority: {data.priority}</p>
                </section>
                <p className="font-bold text-zinc-500 mt-2 break-all">{truncate(data.content, 50)}{data.content.length > 50 && "..."}</p>
            </div>
            <div className="flex justify-between m-1 mt-4">
                <div className="flex gap-x-3">
                    <button onClick={() => onSetView(data)} title="Show more" className="btn bg-blue-600 hover:bg-blue-500 text-base! m-0!"><FontAwesomeIcon icon={faEye}/></button>
                    <button onClick={() => onUpdate(data)} title="Edit task" className="btn bg-blue-600 hover:bg-blue-500 text-base! m-0!"><FontAwesomeIcon icon={faPen}/></button>
                </div>
                <button title="Complete this task" onClick={() => onDelete(data.id)} className="btn bg-green-600 hover:bg-green-500 text-base! m-0!">
                    <ReverseLoader reqId={`delete-${data.id}`}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </ReverseLoader>
                    <SpinLoader reqId={`delete-${data.id}`}>
                        <FontAwesomeIcon icon={faSpinner}/>
                    </SpinLoader>
                </button>
                <ErrorDisplay reqId={`delete-${data.id}`} errorType="AUTH_ERROR">
                    <Navigate replace to="/"/>
                </ErrorDisplay>
            </div>
        </div>
    )
}

export default TaskModel;