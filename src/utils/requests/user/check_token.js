import { useSelector } from "react-redux"
import store from "../../../app/store"
import refresh_token from "./refresh_token"

export default async function check_token(){
    const jwt_state = store.getState().jwt
    let now = new Date()
    
    let expires = new Date(jwt_state.expires_in)
    if (now.getTime() > expires.getTime()){
        await refresh_token()
        return true
    } else {
        return false
    }
}