
type Task = {
    id:string,
    userId:string,
    title:string,
    content:string,
    priority:number,
    deadline:Date,
    createdAt:Date
}

let tasks : Task[] = [
    {
        id:"jhebfvefvy",
        userId:"hyuduyfgeh",
        content:"Hello world",
        title:"First important task",
        createdAt:new Date(),
        deadline:new Date(Date.now() + 1000 * 60 * 60 * 24),
        priority:6
    },
    {
        id:"jhebfvefvywdadwddawdawd",
        userId:"hyuduyfgeh",
        content:"Loewnfewjkbernjgerbjerbhjhbgbhbhvjivjhvbewjrkvrneb vrnek btrnhb vrejkbhtrkjbhjhrbrtjkrenbjhre btrhjb trjbh",
        title:"Second important task",
        createdAt:new Date(),
        deadline:new Date(Date.now() + 1000 * 60 * 60 * 24 * 1.5),
        priority:8
    }
];

export const getTasks = () => tasks;
export const setTasks = (newData : Task[]) => tasks = newData;