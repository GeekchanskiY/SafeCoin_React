import { Link } from "react-router-dom";
import { useState } from "react";

export default function CryptoTile(props){
    const data = props.data;
    console.log(data)
    const [hidden, setHidden] = useState(true)

    const change_view = () => {
        setHidden(!hidden);
    }

    if (hidden){
        return <div className="cryptotile" onClick={change_view}>
            <img src={data.image} alt={data.name} />
            <span>{data.name}</span>
        </div>
    } else {
        return <div className="cryptotiledetail">
            <h3>{data.name} <span>{data.code}</span></h3>
            <span>price: {data.current_price}</span> <br />
            <span>mkt_cap: {data.market_cap}</span> <br />
            <span>24h trans: {data.transactions_count}</span> <br />
            <Link to={'/crypto/'+ data.name}>Get_detail</Link>
        </div>
    }
    
}