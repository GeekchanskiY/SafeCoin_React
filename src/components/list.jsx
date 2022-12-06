import React from "react";

// Fun fact -- в девелопменте реакт рендерит все компонеты дважды

class CryptoDetail extends React.Component{
    render(){
        return <div className="cryptodetail">
            {this.props.data.name}
        </div>
    }
}


export default class CryptoList extends React.Component{
    requestOptions = {
        method: 'GET',
    };
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            data: null
        }
        fetch("http://127.0.0.1:8000/api/cryptos/", this.requestOptions)
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
        if (this.state.data !== null){
            return <div className="a">
            
            <div className="items">
                {this.state.data.results.map((element, index) => {
                    return <CryptoDetail key={"cr"+index} data={element}></CryptoDetail>
                })}
            </div>
            <div className="paginator">
                <div className="page current">
                    {Math.floor(this.state.data.count%20)}
                </div>
            </div>
        </div>
        } else {
            return <h1>Error occured</h1>
        }
        
    }
}