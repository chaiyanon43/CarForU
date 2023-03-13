import axios from "../axios.config"
import { toaster } from "evergreen-ui";
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
}