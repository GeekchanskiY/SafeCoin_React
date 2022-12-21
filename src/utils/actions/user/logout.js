import store from "../../../app/store";
import { set } from "../../../features/userSlice";
import { logout } from "../../../features/JWTSlice";

export default function logout_action(){
    localStorage.removeItem('auth')
    store.dispatch(set({
        username: null,
        userid: null,
        userimg: null
    }))
    store.dispatch(logout())
}