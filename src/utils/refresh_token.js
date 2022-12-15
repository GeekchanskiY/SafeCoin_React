export default async function refresh_request(token){
    console.log(token)
    let now = new Date()
    const url = "http://127.0.0.1:8000/api/auth/token/refresh/"
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            refresh: token,
        })
      };
    
    const response = await fetch(url, requestOptions)
    const data = await response.json()
        
    
    let output_data;
    if (data.access != undefined) {
        output_data = {
            token: data.access,
            expires_in: new Date(now.getTime() + (5 * 60 * 1000)).toString()
        }
        console.log(output_data)
        
    } else {
        output_data = {
            error: data
        }
    }
    return output_data;
}