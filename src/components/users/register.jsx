import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { refresh , auth }  from "../../features/JWTSlice";
import register_request from "../../utils/requests/user/register_user";
import logo from "../../img/SafeCoin.png";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export function RegisterForm() {
    const jwt_state = useSelector((state) => state.jwt)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [username, setUName] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [error, setError] = useState()
    const navigate = useNavigate()
    
    const register = async () => {
        let data = await register_request(email, username, password)
        if (data.error != undefined){
            setError(data.error.error)
        } else {
            dispatch(auth(data))
            console.log(data)
            navigate('/user')
        }
        
    }
    return (
      <div className="detail">
        <h4>You can start in a few steps</h4>
        <span className="password_error">{error}</span> <br />
        <input value={email} type="text" name="safecoin_email" id="emailinput" onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your email"/> <br />
        <input value={username} type="text" name="safecoin_username" id="unameinput" onChange={(e) => {setUName(e.target.value)}} placeholder="Create your username"/> <br />
        <input value={password} type="password" name="safecoin_password" id="passwordinput" autoComplete="on" onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your password"/> <br />
        <input value={cpassword} type="password" name="safecoin_password2" id="passwordinput2" autoComplete="on" onChange={(e) => {setCPassword(e.target.value)}} placeholder="Confirm your password"/> <br />
          
          
        <button type="submit" onClick={(e) => {register()}}>
                Join
        </button> <br /> <br />
        <span>Already registered? <br /><Link to='/login'>Login</Link></span>
      </div>
    )
  }

export default function Register (){
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
      <RegisterForm></RegisterForm>
  </div> 
}