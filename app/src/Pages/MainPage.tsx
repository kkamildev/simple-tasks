import { useEffect, useState, type FC } from "react";
import { useTaskApi, useUserApi, type SortByType, type Task } from "../Api";
import { FixedButton } from "../Utils/Components/Popups";
import UserMenu from "../Components/Sections/UserMenu";
import {  faSpinner, faUserGear, } from "@fortawesome/free-solid-svg-icons";
import { ScrollShowBlock } from "../Utils/Components/Blocks";
import { RadioGroup } from "../Utils/Components/Input";
import { ReverseLoader, SpinLoader } from "../Utils/Components/Loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskModel from "../Components/Models/TaskModel";
import CompleteConfirmation from "../Components/Popups/CompleteConfirmation";
import TaskView from "../Components/Popups/TaskView";
import InsertTaskForm from "../Components/Forms/InsertTaskForm";
import UpdateTaskForm from "../Components/Forms/UpdateTaskForm";

type Props = {

}

const MainPage : FC<Props> = ({}) => {

    const userApi = useUserApi();
    const taskApi = useTaskApi();

    const [userMenuActive, setUserMenuActive] = useState<boolean>(false);

    const [deleteId, setDeleteId] = useState<string>("");
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [vievedTask, setVievedTask] = useState<Task | null>(null);


    const [filter, setFilter] = useState<SortByType>("priority");
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = async() => {
        const result = await taskApi.get(filter, "getTasks")
        if(result) {
            const tasks : Task[] = result.tasks.map((obj: any) => ({...obj, deadline:new Date(obj.deadline), createdAt:new Date(obj.createdAt)}))
            setTasks(tasks);
        }
    }

    useEffect(() => {
        const authUser = async () => {
            await userApi.auth("");
        }
        authUser();
    }, []);

    useEffect(() => {
        getTasks();
    }, [filter]);

    const deleteTask = async (id : string) => {
        const result = await taskApi.delete(id, `delete-${id}`);
        if(result) {
            setTasks((prev) => prev.filter((obj) => obj.id !== id));
        }
    }

    return (
        <>
            {
                !userMenuActive ? <>
                    <CompleteConfirmation
                        clearDeleteId={() => setDeleteId("")}
                        deleteTask={deleteTask}
                        deleteId={deleteId}
                    />
                    {
                        vievedTask && 
                        <TaskView
                            data={vievedTask}
                            onClose={() => setVievedTask(null)}
                        />
                    }
                    <UpdateTaskForm
                        defaultTask={editTask}
                        backAction={() => setEditTask(null)}
                        updateTask={() => getTasks()}
                    />
                    <InsertTaskForm
                        addTask={(task) => setTasks((prev) => [...prev, task])}
                    />
                    <FixedButton
                        icon={faUserGear}
                        style="bg-green-600! hover:bg-green-500! hover:scale-100! top-4! left-4! text-xl"
                        onClick={() => setUserMenuActive(true)}
                    />
                    <main className="p-2 min-h-screen bg-neutral-100 dark:bg-inherit! pt-15">
                        <ScrollShowBlock>
                            <h1 className="font-bold text-green-500 text-4xl tracking-widest text-center">Welcome</h1>
                            <h2 className="font-bold text-green-500 text-center text-xl">Active tasks: {tasks.length}</h2>
                            <p className="font-bold text-zinc-700 text-center my-3 text-2xl">{tasks.length == 0 ? "Let's start new task!" : "Keep going!"}</p>
                        </ScrollShowBlock>
                        <section className="flex flex-col gap-y-3 items-center mt-5">
                            <h2 className="font-bold text-lg">Filter Options</h2>
                            <RadioGroup
                                buttons={[
                                    {
                                        title:"Priority",
                                        value:"priority"
                                    },
                                    {
                                        title:"Deadline",
                                        value:"deadline"
                                    }
                                ]}
                                onChange={(value) => setFilter(value as SortByType)}
                                value={filter}
                            />
                        </section>
                        <div className="mt-20"></div>
                        <SpinLoader reqId="getTasks">
                            <FontAwesomeIcon icon={faSpinner} className="text-6xl text-center"/>
                        </SpinLoader>
                        <ReverseLoader reqId="getTasks">
                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-5 lg:mx-10 my-5 gap-7">
                                {
                                    tasks.map((task, index) => <TaskModel
                                        onSetView={(task) => setVievedTask(task)}
                                        onUpdate={(task) => setEditTask(task)}
                                        onDelete={(id) => setDeleteId(id)}
                                        number={index + 1}
                                        key={task.id}
                                        data={task}/>)
                                }
                            </section>
                        </ReverseLoader>
                    </main>
                </>
                :
                <UserMenu backState={() => setUserMenuActive(false)}/>
            }
        </>
    )
}

export default MainPage;