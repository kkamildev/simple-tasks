

type User = {
    id:string,
    email:string,
    password:string
}

let users : User[] = [];

export const getUsers = () => users;
export const setUsers = (newData : User[]) => users = newData;