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
import change_about_me_request from "../../utils/requests/user/change_about_me";
import change_country_request from "../../utils/requests/user/change_country";
import change_password_request from "../../utils/requests/user/change_password";

export default function UserDetail(){
    const jwt_state = useSelector((state) => state.jwt)
    const user_state = useSelector((state) => state.User)
    const [pageinit, setPageInit] = useState(true)
    const [user, setUser] = useState({
        'email': ''
    })
    const [about_me, setAboutMe] = useState("")
    const [country, setCountry] = useState("")

    const [old_password, setOldPassword] = useState("")

    const [new_password, setNewPassword] = useState("")

    const [confirm_password, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    
    const dispatch = useDispatch()

    const set_user_data = async () => {
        let user_data = await user_data_request()
        setUser(user_data)
        setAboutMe(user_data.about_me)
        setCountry(user_data.country)
    }

    const change_about_me = async () => {
        await change_about_me_request(about_me)
        set_user_data()
    }
    const change_country = async () => {
        await change_country_request(country)
        set_user_data()
    }

    const change_password = async () => {
        let status_span = document.getElementById("password_error")
        if (old_password == new_password){
            status_span.innerText = "Old and new passwords must be different"
            return
        }
        if (new_password != confirm_password){
            status_span.innerText = "Confirm password does not match"
            return
        }

        await change_password_request(new_password)
        
        status_span.innerText = "Password changed"

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
                <input type="password" value={old_password} placeholder="Old password" name="old_password" id="old_password" onChange={(e) => {setOldPassword(e.target.value)}}/> <br /> 
                <span className="password_error" id="password_error"></span> <br />
                <input type="password" value={new_password} placeholder="New password" name="new_password" id="new_password" onChange={(e) => {setNewPassword(e.target.value)}}/><br />
                <input type="password" value={confirm_password} placeholder="Confirm password" name="confirm_password" id="confirm_password" onChange={(e) => setConfirmPassword(e.target.value)}/> <br />
                <input type="button" value="confirm" onClick={() => {change_password()}}/>
                <h3>Personal info</h3>
                <div className="personal">
                <span>Country:</span>
                <input type="text" name="about_me" id="about_me_form" value={country} onChange={(e) => setCountry(e.target.value)}/> <div></div><input type="button" value="Update" onClick={(e) => {change_country()}}/> 
                <span>About me:</span><input type="text" name="about_me" id="about_me_form" value={about_me} onChange={(e) => setAboutMe(e.target.value)}/> <div></div><input type="button" value="Update" onClick={(e) => {change_about_me()}}/> 
                </div>
                
            </div>
            <br />
            <button onClick={async (e) => {set_user_data()}}>refresh</button>
            <button onClick={(e) => {logout_action()}}>logout</button>
        </div>
    )
}