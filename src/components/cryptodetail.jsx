import React from "react";


export default class CryptoDetail extends React.Component{

    constructor(props){
        //super(props);
        // useParams не работает потому что пропаганда обоссаных функциональных компонентов
        // я их не буду использовать ибо считаю не удобными
        // поэтому тут костыль.
        // А ещё индекс -1 не работает. JS говно.
        let coin_name =  window.location.href.split('/').reverse()[0].toLowerCase()
        super(props)
        this.state = {
            isLoaded: false,
            data: null
        }
        let url = "http://127.0.0.1:8000/api/cryptos/" + coin_name + "/"
        
        fetch(url, this.requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                data: result
            })
        },
            (error) => {
            this.setState({
                isLoaded: false,
                data: null
            })
        }
        )
    }

    render(){
        let data = this.state.data
        if (data !== null){
            return <div>
                <span>{data.name}</span>
                <img src={data.image} alt={data.name}/>
                <p>{data.description}</p>
                <span>{data.code}</span> <br />
                <span>{data.current_price}</span> <br />
                <span>{data.volume}</span> <br />
                <span>{data.circulating_supply}</span> <br />
                <span>{data.transactions_count}</span> <br />
            </div>
        } else {
            return <div>
                Data cant be loaded
            </div>
        }
        
        
        
    }
}