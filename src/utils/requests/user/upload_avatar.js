import store from "../../../app/store";
import { set } from "../../../features/userSlice";
import { server_url } from "../../../app/constants";
import check_token from "./check_token";

export default async function change_avatar_request(file){
    check_token()
    const jwt_state = store.getState().jwt

    
    const url = server_url + "/api/users/change_avatar/"
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Disposition': 'attachment; filename="'+ file.name +'"',
            'Authorization': 'Bearer '+jwt_state.token
    },
        body: file
        
    };


    const response = await fetch(url, requestOptions)
    const data = await response.json()
    if (response.ok){
        console.log("USER DATA REQUEST SUCCESS")
        
        return data
    } else {
        console.error("USER DATA REQUEST ERROR")
        console.error(data)
        return {error: data}   
    }
}