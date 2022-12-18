export default async function get_news_request(page){
    const url = "http://127.0.0.1:8000/api/news/?page="+page
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        
      };
    const response = await fetch(url, requestOptions);
    const data = await response.json()
    if (response.status == 200){
        return data
    } else {
        return {"error": "invalid request"}
    }
}