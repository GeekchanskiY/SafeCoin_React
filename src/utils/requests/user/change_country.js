import { server_url } from "../../../app/constants";
import store from "../../../app/store";

export default async function change_country_request(country){
    const jwt_state = store.getState().jwt
    const url = server_url + "/api/users/change_country/"
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+jwt_state.token
        },
        body: JSON.stringify({
            country: country,
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