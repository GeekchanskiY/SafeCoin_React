import React from "react";
import logo from "../../img/SafeCoin 2.png";
import search from '../../img/search.png'
import trending from '../../img/trending.png';
import like from '../../img/like.png';
import user from '../../img/user.png';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";


export default function Header () {
    const user_state = useSelector((state) => state.user)
    return <header>
        <img src={logo} alt="" id="headerlogo" />
        <a href=""><img src={user} alt="" /></a>
        
        <a href=""><img src={like} alt="" /></a>

        <a href=""><img src={trending} alt="" /></a>
        
        <form action="">
            <input type="text" placeholder="SafeCoin"/>
            <input className="imgbutton" value='' type="submit" style={{backgroundImage: 'url(' + search + ')', backgroundSize: 'cover'}}/>
        </form>
        
    </header>
    
}