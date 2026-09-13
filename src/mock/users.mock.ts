

type User = {
    id:string,
    email:string,
    password:string
}

let users : User[] = [
    {
        id:"hyuduyfgeh",
        email:"kijak935@gmail.com",
        password:"$2a$12$qUICY3vffBxMPih.wHnXIuOItO5uH.aKI/3VfRlwINi7aWVYgz9f2"
    }
];

export const getUsers = () => users;
export const setUsers = (newData : User[]) => users = newData;