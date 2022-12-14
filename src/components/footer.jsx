import React from "react";
import logo from "../img/SafeCoin 2.png";
import { Link } from "react-router-dom";


export default class Footer extends React.Component{
    render(){
        return <footer>
            <img src={logo} alt="" />
            
            <div className="links">
                <Link to={'/'}>Index page</Link> <br />
                <Link>News</Link> <br />
                <Link>User detail</Link> <br />
                <Link>All Cryptos</Link> <br />
                <a href="https://127.0.0.1:8000/admin">Admin page</a>
            </div>
            <span className="sitemap">SiteMap:</span>
        </footer>
    }
}