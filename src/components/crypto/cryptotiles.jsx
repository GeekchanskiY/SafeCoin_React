import { Link } from "react-router-dom";
import { useState } from "react";

export default function CryptoTile(props){
    const data = props.data;
    console.log(data)
    const [hidden, setHidder] = useState(false)
    if (!hidden){
        return <div className="cryptotile">
            <img src={data.image} alt={data.name} />
            <span>{data.name}</span>
        </div>
    } else {
        return <div className="cryptorile">

        </div>
    }
    
}