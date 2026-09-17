import { useEffect, useState, type FC } from "react";
import { useTaskApi, useUserApi, type SortByType, type Task } from "../Api";
import { useNavigate } from "react-router-dom";
import { FixedButton } from "../Utils/Components/Popups";
import UserMenu from "../Components/Sections/UserMenu";
import { faPlus, faSpinner, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { ScrollShowBlock } from "../Utils/Components/Blocks";
import { RadioGroup } from "../Utils/Components/Input";
import { ReverseLoader, SpinLoader } from "../Utils/Components/Loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskModel from "../Components/Models/TaskModel";

type Props = {

}

const MainPage : FC<Props> = ({}) => {

    const userApi = useUserApi();
    const taskApi = useTaskApi();
    const navigate = useNavigate();

    const [userMenuActive, setUserMenuActive] = useState<boolean>(false);

    const [filter, setFilter] = useState<SortByType>("priority");
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const authUser = async () => {
            const result = await userApi.auth("");
            if(!result) {
                navigate("/");
            }
        }
        authUser();
    }, []);

    useEffect(() => {
        const getTasks = async() => {
            const result = await taskApi.get(filter, "getTasks")
            if(result) {
                const tasks : Task[] = result.tasks.map((obj: any) => ({...obj, deadline:new Date(obj.deadline), createdAt:new Date(obj.deadline)}))
                setTasks(tasks);
            }
        }
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
                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-2 lg:mx-10 my-5 gap-7">
                                {
                                    tasks.map((task, index) => <TaskModel onDelete={deleteTask} number={index + 1} key={task.id} data={task}/>)
                                }
                            </section>
                        </ReverseLoader>
                    </main>
                    <FixedButton
                        icon={faPlus}
                        style="bg-green-600! hover:bg-green-500! hover:scale-100! text-xl"
                        onClick={() => setUserMenuActive(true)}
                    />
                </>
                :
                <UserMenu backState={() => setUserMenuActive(false)}/>
            }
        </>
    )
}

export default MainPage;