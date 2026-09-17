import { useEffect, useState, type FC } from "react";
import { useUserApi } from "../Api";
import { useNavigate } from "react-router-dom";
import { FixedButton } from "../Utils/Components/Popups";
import UserMenu from "../Components/Sections/UserMenu";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";

type Props = {

}

const MainPage : FC<Props> = ({}) => {

    const userApi = useUserApi();
    const navigate = useNavigate();

    const [userMenuActive, setUserMenuActive] = useState<boolean>(false);

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
            {
                !userMenuActive ? <>
                    <FixedButton
                        icon={faUserGear}
                        style="bg-green-600! hover:bg-green-500! hover:scale-100! top-4! left-4!"
                        onClick={() => setUserMenuActive(true)}
                    />
                    <main className="p-2 min-h-screen bg-neutral-100 dark:bg-inherit!">
                        
                    </main>
                </>
                :
                <UserMenu backState={() => setUserMenuActive(false)}/>
            }
        </>
    )
}

export default MainPage;