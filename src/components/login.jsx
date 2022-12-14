import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { refresh , auth }  from "../features/JWTSlice";
import login_request from "../utils/auth";
import logo from "../img/SafeCoin 2.png";

export function LoginForm() {
    const jwt_state = useSelector((state) => state.jwt)
    const dispatch = useDispatch()
  
    return (
      <form>
        
          <input type="text" name="safecoin_email" id="emailinput" /> <br />
          <input type="password" name="safecoin_password" id="passwordinput" autoComplete="on"/> <br />
            
          <span>{jwt_state.token}</span>
          
          
        <button
            aria-label="Increment value"
            onClick={async () => {
                let data = await login_request("dmt@mail.ru", "111")
                console.log(data)
                console.log(jwt_state)
                dispatch(auth(data))
            }}>
                login
          </button>
      </form>
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