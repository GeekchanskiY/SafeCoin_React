import React from "react";

// Fun fact -- в девелопменте реакт рендерит все компонеты дважды

class CryptoDetail extends React.Component{
    render(){
        return <div className="cryptodetail">
            {this.props.data.name}
        </div>
    }
}


export default function CryptoList (){
    
    return <div></div>
}