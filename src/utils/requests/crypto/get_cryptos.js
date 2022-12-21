import store from "../../../app/store";
import { set } from "../../../features/userSlice";
import { server_url } from "../../../app/constants";
import check_token from "../user/check_token";

export default async function crypto_list_request(page){
    await check_token()
    const jwt_state = store.getState().jwt
    
    const url = server_url + "/api/cryptos/?page="+page
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+jwt_state.token
    },
        
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