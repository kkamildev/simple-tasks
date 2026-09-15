import { useEffect, type FC } from "react";
import { useUserApi } from "../Api";
import { useNavigate } from "react-router-dom";

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

    return (
        <>
        </>
    )
}

export default MainPage;