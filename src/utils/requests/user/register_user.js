import { server_url } from "../../../app/constants";
import login_request from "./login_user";

export default async function register_request(email, username, password){
    let now = new Date()
    const url = server_url + "/api/users/register/"
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
      };
    
    const response = await fetch(url, requestOptions)
    const data = await response.json()
        
    if (response.status == 201) {
        console.log("REGISTER REQUEST SUCCESS")
        let login = await login_request(email, password)
        return login
        
    } else {
        console.error("LOGIN REQUEST ERROR")
        console.error("data")
        return {
            error: data
        }
    }
}