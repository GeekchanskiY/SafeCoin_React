import { refresh }  from "../../../features/JWTSlice";
import store from "../../../app/store";

export default async function refresh_token(){
    const jwt_state = store.getState().jwt

    let now = new Date()
    const url = "http://127.0.0.1:8000/api/auth/token/refresh/"
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            refresh: jwt_state.refresh_token,
        })
      };
    
    const response = await fetch(url, requestOptions)
    const data = await response.json()
        
    
    if (data.access != undefined) { 
        console.log("TOKEN REFRESHED")
        store.dispatch(refresh({
            token: data.access,
            expires_in: new Date(now.getTime() + (5 * 60 * 1000)).toString()
        }))
        
        
    } else {
        console.error("TOKEN REFRESH ERROR")
        console.error(data)
    }
}