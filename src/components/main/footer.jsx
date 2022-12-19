import React from "react";
import logo from "../../img/SafeCoin.png";
import { Link } from "react-router-dom";


export default function Footer (){
    
    return <footer>
        <img src={logo} alt="" />
        
        <div className="links">
            <Link to={'/'}>Index page</Link> <br />
            <Link to={'/news'}>News</Link> <br />
            <Link to={'/user'}>User detail</Link> <br />
            <Link tp={'/list'}>All Cryptos</Link> <br />
            <a href="https://127.0.0.1:8000/admin">Admin page</a>
        </div>
        <span className="sitemap">SiteMap:</span>
    </footer>
    
}