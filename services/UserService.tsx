import axios from "../axios.config"
import { toaster } from "evergreen-ui";
import { userForm } from "components/interfaces";
export class UserService {
    async getUserProfile(){
        try {
            return await axios.get('http://localhost:8080/userProfile',{
                params:{
                    username:sessionStorage.getItem('user')
                }
            })
                .then((res) => res.data);
        } catch (err: any) {
            toaster.danger("Get User Data Error!", {
                duration: 5,
            });
        }
    }
    async updateUser(user:userForm){
        try {
            await axios.patch('http://localhost:8080/updateUser',{
                image:user.image,
                username:user.username,
                name:user.name,
                phoneNumber:user.phoneNumber,
                address:user.address,
                userId:user.userId
            })
                .then((res) =>
                toaster.success(res.data, {
                    duration: 5,
                }));
        } catch (err: any) {
            toaster.danger("Update Error!", {
                duration: 5,
            });
        }
    }
    async getUserDetail(){
        try {
            return await axios.get('http://localhost:8080/userDetail',{
                params:{
                    username:sessionStorage.getItem('user')
                }
            })
                .then((res) => res.data);
        } catch (err: any) {
            toaster.danger("Get User detail Error!", {
                duration: 5,
            });
        }
    }
}