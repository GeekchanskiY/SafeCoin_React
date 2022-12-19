import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { refresh , auth }  from "../../features/JWTSlice";
import login_request from "../../utils/requests/user/login_user";
import logo from "../../img/SafeCoin.png";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
      <div className="detail">
        <h4>We've been waiting for you</h4>
        <span className="password_error">{error}</span> <br />
        <input type="text" name="safecoin_email" id="emailinput" onChange={(e) => {setLogin(e.target.value)}} /> <br />
        <input type="password" name="safecoin_password" id="passwordinput" autoComplete="on" onChange={(e) => {setPassword(e.target.value)}}/> <br />
          
          
        <button type="submit" onClick={(e) => {try_login()}}>
                Login
        </button> <br />
        <Link to='/register'>Register</Link>
      </div>
    )
  }

export default function Login (){
  const jwt_state = useSelector((state) => state.jwt)
  const navigate = useNavigate()
  useEffect(()=>{
    if (jwt_state.authentificated === true){
      navigate('/user')
    }
  })
  return <div className="logregform">
    <div className="welcomeback">
    <h3 className="left_span">Welcome to SafeCoin</h3> <img src={logo} alt="logo" className="logoimg" />
    </div>
      
      <hr />
      <LoginForm></LoginForm>
  </div> 
}