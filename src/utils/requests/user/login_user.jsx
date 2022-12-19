import { server_url } from "../../../app/constants";

export default async function login_request(login, password){
    let now = new Date()
    const url = server_url + "/api/auth/token/"
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: login,
            password: password
        })
      };
    
    const response = await fetch(url, requestOptions)
    const data = await response.json()
        
    if (response.status == 200) {
        console.log("LOGIN REQUEST SUCCESS")
        return {
            authentificated: true,
            token: data.access,
            expires_in: new Date(now.getTime() + (5 * 60 * 1000)).toString(),
            refresh: data.refresh
        }
        
    } else {
        console.error("LOGIN REQUEST ERROR")
        console.error("data")
        return {
            error: data
        }
    }
}