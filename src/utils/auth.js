export default async function login_request(login, password){
    let now = new Date()
    const url = "http://127.0.0.1:8000/api/auth/token/"
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
        
    
    let output_data;
    if (data.access != undefined) {
        output_data = {
            authentificated: true,
            token: data.access,
            expires_in: new Date(now.getTime() + (20 * 60 * 1000)).toString(),
            refresh: data.refresh
        }
        
    } else {
        output_data = {
            error: data
        }
    }
    return output_data;
}