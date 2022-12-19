import React from "react";
import logo from "../../img/SafeCoin.png";
import search from '../../img/search.png'
import trending from '../../img/trending.png';
import like from '../../img/like.png';
import user from '../../img/user.png';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Header () {
    const user_state = useSelector((state) => state.user)
    const navigate = useNavigate()
    return <header>
        
        <img src={logo} alt="" id="headerlogo" onClick={() => {navigate('/')}}/>
        {user_state.username === null ? <Link to={'/login'}><img src={user} alt="" /></Link> : <Link to={'/user'}><img src={user_state.userimg} alt="" /></Link>}

        <a href=""><img src={like} alt="" /></a>

        <a href=""><img src={trending} alt="" /></a>
        
        <form action="">
            <input type="text" placeholder="SafeCoin"/>
            <input className="imgbutton" value='' type="submit" style={{backgroundImage: 'url(' + search + ')', backgroundSize: 'cover'}}/>
        </form>
        
    </header>
    
}