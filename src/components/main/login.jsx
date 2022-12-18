import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { refresh , auth }  from "../../features/JWTSlice";
import login_request from "../../utils/auth";
import logo from "../../img/SafeCoin 2.png";
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function LoginForm() {
    const jwt_state = useSelector((state) => state.jwt)
    const dispatch = useDispatch()
    const [login, setLogin] = useState('login')
    const [password, setPassword] = useState('password')
    const [error, setError] = useState()
    const navigate = useNavigate()
    
    const try_login = async () => {
        let data = await login_request(login, password)
        if (data.error != undefined){
            setError(data.error.detail)
        } else {
            dispatch(auth(data))
            console.log(data)
            navigate('/user')
        }
        
    }
    return (
      <div>
        
        <span>{error}</span>
        <input type="text" name="safecoin_email" id="emailinput" onChange={(e) => {setLogin(e.target.value)}} /> <br />
        <input type="password" name="safecoin_password" id="passwordinput" autoComplete="on" onChange={(e) => {setPassword(e.target.value)}}/> <br />
          
          
        <button type="submit" onClick={(e) => {try_login()}}>
                Login
        </button>
      </div>
    )
  }

export default class Login extends React.Component{
    render(){
        return <div className="LoginForm">
            <span>Welcome to SafeCoin</span> <img src={logo} alt="logo" />
            <hr />
            <LoginForm></LoginForm>
        </div>
    }
}