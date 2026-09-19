import { useMemo, useState, type FC } from "react";
import { CenterPopup, FixedButton } from "../../Utils/Components/Popups";
import { ScrollShowBlock } from "../../Utils/Components/Blocks";
import { faPlus, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AreaTextField, Form, InputField } from "../../Utils/Components/Input";
import { useForm } from "../../Utils/Hooks";
import { useTaskApi, type Task } from "../../Api";
import { ReverseLoader, SpinLoader } from "../../Utils/Components/Loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type Props = {
    addTask:(task : Task) => void;
}

const InsertTaskForm : FC<Props> = ({addTask}) => {

    const taskApi = useTaskApi();

    const [active, setActive] = useState<boolean>(false);



    const validators = useMemo(() => [
        {
            fieldId:"title",
            errorMessages:["Required", "Too long"],
            validations:[/.+/, /^.{0,50}$/],
            required:true
        },
        {
            fieldId:"content",
            errorMessages:["Required", "Too long"],
            validations:[/.+/, /^.{0,2000}$/],
            required:true
        },
        {
            fieldId:"deadline",
            errorMessages:["Required"],
            validations:[/.+/],
            required:true
        },
        {
            fieldId:"priority",
            errorMessages:["Required", "Invalid"],
            validations:[/.+/, /^([1-9]|10)$/],
            required:true
        },
    ], []);

    const [getData, update, getErrors,, checkComplete] = useForm(validators);

    const createSubmit = async () => {
        if(checkComplete()) {
            const result = await taskApi.insert({
                title:getData("title")?.value || "",
                content:getData("content")?.value || "",
                deadline:new Date(getData("deadline")?.value || ""),
                priority:parseInt(getData("priority")?.value || "1")
            }, "insert-task");
            if(result) {
                const task = result.task;
                addTask({...task, deadline:new Date(task.deadline), createdAt:new Date(task.createdAt)});
                setActive(false);
            }
        }
    }

    return (
        <>
            {
                active &&
                <CenterPopup>
                    <ScrollShowBlock>
                        <section className="dark:bg-zinc-900 bg-zinc-200 p-4 rounded-md max-w-100 lg:max-w-200 overflow-y-auto">
                            <div className="flex justify-end">
                                <button className="btn m-0!" onClick={() => setActive(false)}>
                                    <FontAwesomeIcon icon={faXmark} className="text-2xl"/>
                                </button>
                            </div>
                            <h1 className="my-3 font-bold text-green-500 text-center text-4xl">Create new task</h1>
                            <Form onSubmit={() => createSubmit()} style="mt-5">
                                <section className="flex lg:flex-row flex-col gap-y-1 gap-x-5">
                                    <section className="flex flex-col">
                                        <InputField
                                            id="title"
                                            subtitle="Title"
                                            placeholder="Task title..."
                                            onChange={(value) => update("title", value)}
                                            value={getData("title")?.value || ""}
                                            errors={getErrors("title")}
                                            maxCharacters={50}
                                        />
                                        <InputField
                                            subtitle="Deadline"
                                            id="deadline"
                                            type="datetime-local"
                                            onChange={(value) => update("deadline", value)}
                                            value={getData("deadline")?.value || ""}
                                            errors={getErrors("deadline")}
                                        />
                                        <InputField

                                            subtitle="Priority"
                                            placeholder="From 1 to 10..."
                                            id="priority"
                                            type="number"
                                            onChange={(value) => update("priority", value)}
                                            value={getData("priority")?.value || ""}
                                            errors={getErrors("priority")}
                                        />
                                    </section>
                                    <section className="flex flex-col">
                                        <AreaTextField
                                            id="content"
                                            subtitle="Content"
                                            areaStyle="h-[150px]"
                                            placeholder="Task content..."
                                            onChange={(value) => update("content", value)}
                                            value={getData("content")?.value || ""}
                                            errors={getErrors("content")}
                                            maxCharacters={2000}
                                        />
                                    </section>
                                </section>
                                <button className="btn hover:bg-green-500 bg-green-600 inline-block mt-5!">
                                    <ReverseLoader reqId="insert-task">
                                        Create new Task
                                    </ReverseLoader>
                                    <SpinLoader reqId="insert-task">
                                        <FontAwesomeIcon icon={faSpinner}/>
                                    </SpinLoader>
                                </button>
                            </Form>
                        </section>
                    </ScrollShowBlock>
                </CenterPopup>
            }
            <FixedButton
                icon={faPlus}
                style="bg-green-600! hover:bg-green-500! hover:scale-100! text-xl"
                onClick={() => setActive(true)}
            />
        </>
    )
}

export default InsertTaskForm;