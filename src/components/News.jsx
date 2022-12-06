import React from "react";



export class NewsTile extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return <div className="newstile">
            <img src={this.props.img} alt={this.props.title} className='newstileimg'/>
            <span>{this.props.title}</span>
        </div>
    }
}

export default class NewsTiles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            data: null
        }
        fetch("http://127.0.0.1:8000/api/news/", this.requestOptions)
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
            return <div className="newswrapper">
                <h1>News</h1>
                <div className="newsblock">
            
            
            {this.state.data.results.map((el, index) => {
                return <NewsTile title={el.title} img={el.image} newsid={el.id} key={'News'+index}></NewsTile>
            })}
        </div>
            </div>
            
        } else {
            return <div className="newsblock">
                <h5>News cant be loaded now</h5>
            </div>
        }
       
    }

}