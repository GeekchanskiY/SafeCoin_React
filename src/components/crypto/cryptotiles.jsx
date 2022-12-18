
import React from "react";
import { Link } from "react-router-dom";

export class Tile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            detail: false
        }
    }

    setvisible(){
        this.setState({
            detail: !this.state.detail
        })
        // if to remove deadlock
        if (!this.state.detail){
            setTimeout(() => {
                this.setvisible()
            }, 3000);
        }
        
    }

    render(){
        if (!this.state.detail){
            return <div className="cryptotile">
                <img src={this.props.data.image} alt="" onMouseEnter={(e) => {this.setvisible()}}/>
                <br/>  
                <span onClick={(e) => {this.setvisible()}}>{this.props.data.name}</span>
            </div>
        } else {
            let link = '/crypto/'+ this.props.data.name;
            return <div className="cryptotile">
                <span onClick={(e) => {this.setvisible()}}>{this.props.data.name} </span><small>{this.props.data.code}</small><br />
                <Link to={link}>aaa</Link>
            </div>
        }
    }
}

export default class CryptoTiles extends React.Component{
    constructor(props){
        super(props)
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
        if (this.state.isLoaded){
            let data = this.state.data.results.slice(0, 4)
            return <div><h1>Newest Cryptos Now:</h1>
            <div className="cryptotilesblock">
            {data.map((el, index) => {return <Tile data={el} key={'CryptoTile'+index} ></Tile>})}
            </div>
            
            </div>
        } else {
            return <h3>data cant be loaded</h3>
        }
    }
}