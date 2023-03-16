import { userForm } from "components/interfaces";
import UserSettingResult from "components/UserSetting/user_setting_result"
import { useEffect, useState } from "react";
import { UserService } from "services/UserService";

const UserSetting = () => {
    const [user, setUser] = useState<userForm>();
    const userService = new UserService();
    const getUserDetail = async () => {
        const response = userService.getUserDetail();
        await response.then((res) => {
            setUser!(res)
        })

    }
    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            getUserDetail();
        }
    }, [sessionStorage.getItem('user')])
    if (user) {
        return (
            <UserSettingResult user={user!} getUserDetail={getUserDetail}/>
        )
    } else return

}
export default UserSetting