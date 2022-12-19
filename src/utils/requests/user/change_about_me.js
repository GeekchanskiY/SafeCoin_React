import { server_url } from "../../../app/constants";
import store from "../../../app/store";

export default async function change_about_me_request(about_me){
    const jwt_state = store.getState().jwt
    const url = server_url + "/api/users/change_about_me/"
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+jwt_state.token
        },
        body: JSON.stringify({
            about_me: about_me,
        })
      };
    
    const response = await fetch(url, requestOptions)
    const data = await response.json()
        
    if (response.status == 200) {
        console.log("CHANGE COUNTRY REQUEST SUCCESS")
        return true
        
    } else {
        console.error("CHANGE COUNTRY REQUEST ERROR")
        console.error("data")
        return false
    }
}