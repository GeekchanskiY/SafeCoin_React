import store from "../../../app/store";
import { auth } from "../../../features/JWTSlice";
import user_data_request from "../../requests/user/user_data";

export function check_login(){
    const auths = localStorage.getItem('auth')
    if (auths != undefined){
        const data = JSON.parse(auths)
        store.dispatch(auth(data))
        user_data_request()
        return true
    } else {
        return false;
    }
}