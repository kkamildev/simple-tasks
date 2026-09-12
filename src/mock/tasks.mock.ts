
type Task = {
    id:string,
    userId:string,
    title:string,
    content:string,
    priority:number,
    deadline:Date,
    createdAt:Date
}

let tasks : Task[] = [];

export const getTasks = () => tasks;
export const setTasks = (newData : Task[]) => tasks = newData;