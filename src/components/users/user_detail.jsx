import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { set }  from "../../features/userSlice";
import { refresh , auth }  from "../../features/JWTSlice";
import { useState, useEffect } from 'react';
import refresh_request from "../../utils/requests/user/refresh_token";
import check_token from "../../utils/requests/user/check_token";
import { useNavigate } from "react-router-dom";
import user_data_request from "../../utils/requests/user/user_data";
import logout_action from "../../utils/actions/user/logout";
import { server_url } from "../../app/constants";
import logo from "../../img/SafeCoin.png";

export default function UserDetail(){
    const jwt_state = useSelector((state) => state.jwt)
    const user_state = useSelector((state) => state.User)
    const [pageinit, setPageInit] = useState(true)
    const [user, setUser] = useState({
        'email': ''
    })
    const [about_me, setAboutMe] = useState("")
    const [country, setCountry] = useState("")

    const navigate = useNavigate()
    
    const dispatch = useDispatch()

    const set_user_data = async () => {
        let user_data = await user_data_request()
        setUser(user_data)
        setAboutMe(user_data.about_me)
        setCountry(user_data.country)
    }

    useEffect(() => {
        if (jwt_state.authentificated == false){
            navigate('/login')
        }
        
        if (pageinit){
            set_user_data()
            setPageInit(false)
        }
        
        
        
            
        
    })

    if (user.email === ''){
        return <div>please wait data loads</div>
    }

    return (
        <div className="user_detail">
            <div className="welcomeback">
                <img className="avatarimg" src={server_url + user.avatar} alt="avatar" />
                <h3 className="welcomeback_h3">Welcome back, <span className="green">{user.username}</span></h3>
                <img className="logoimg" src={logo} alt="logo" />
            </div>
            <hr />
            <div className="userinfoblock">
                <span className="email">Your email is: {user.email}</span> <br />
                <span className="blocklabel">Change Password:</span> <br />
                <input type="password" placeholder="Old password" name="old_password" id="old_password"/> <br /> <br />
                <input type="password" placeholder="New password" name="new_password" id="new_password"/><br />
                <input type="password" placeholder="Confirm password" name="confirm_password" id="confirm_password"/> <br />
                <input type="button" value="confirm" />
                <h3>Personal info</h3>
                <div className="personal">
                <span>Country:</span>
                <input type="text" name="about_me" id="about_me_form" value={country} onChange={(e) => setCountry(e.target.value)}/> <div></div><input type="button" value="Update" /> 
                <span>About me:</span><input type="text" name="about_me" id="about_me_form" value={about_me} onChange={(e) => setAboutMe(e.target.value)}/> <div></div><input type="button" value="Update" /> 
                </div>
                
            </div>
            <br />
            <button onClick={async (e) => {set_user_data()}}>refresh</button>
            <button onClick={(e) => {logout_action()}}>logout</button>
        </div>
    )
}