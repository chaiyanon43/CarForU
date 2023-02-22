import axios from "axios";
import { toaster } from "evergreen-ui";

export class CarService{
    async getBrandList(){
        try{
            return await axios.get('http://localhost:8080/getAllBrand')
            .then((res) => res.data);
        }catch(err:any){
            toaster.danger("Get Brand List Error!",{
                duration:5,
            });
        }
    }
    async getModelList(carBrandName:String){
        try{
            return await axios.get('http://localhost:8080/get-model',{
                params:{
                    brandName:carBrandName
                }
            })
            .then((res) => res.data);
        }catch(err:any){
            toaster.danger("Get Model List Error!",{
                duration:5,
            });
        }
    }
}