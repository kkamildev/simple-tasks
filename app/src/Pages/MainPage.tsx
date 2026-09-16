import { useEffect, type FC } from "react";
import { useUserApi } from "../Api";
import { useNavigate } from "react-router-dom";
import { FixedButton } from "../Utils/Components/Popups";
import { faUser } from "@fortawesome/free-regular-svg-icons";

type Props = {

}

const MainPage : FC<Props> = ({}) => {

    const userApi = useUserApi();
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = async () => {
            const result = await userApi.auth("");
            if(!result) {
                navigate("/");
            }
        }
        authUser();
    }, []);

    const logout = async () => {
        const result = await userApi.logout("logout");
        if(result) {
            navigate("/");
        }
    }

    return (
        <>
            {/* <FixedButton
                icon={faUser}
                style="bg-green-600! hover:bg-green-500! hover:scale-100! top-2! left-2!"
                onClick={() => {}}
            /> */}
            <main className="p-2 min-h-screen bg-neutral-100 dark:bg-inherit!">
                <button onClick={logout} className="btn hover:bg-green-500 bg-green-600">Logout</button>
            </main>
        </>
    )
}

export default MainPage;