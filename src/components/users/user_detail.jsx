import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { set }  from "../../features/userSlice";
import { refresh , auth }  from "../../features/JWTSlice";
import { useState, useEffect } from 'react';
import refresh_request from "../../utils/refresh_token";
import check_token from "../../utils/check_token";
import { useNavigate } from "react-router-dom";

export function User_detail_info(){
    const jwt_state = useSelector((state) => state.jwt)
    const user_state = useSelector((state) => state.User)
    const [user, setUser] = useState({
        'email': ''
    })
    const navigate = useNavigate()
    
    const dispatch = useDispatch()

    useEffect(() => {
        const f = async () => {
            if (jwt_state.authentificated == false){
                navigate('/login')
            }
            if (check_token(jwt_state.expires_in) == true){
                console.log("refresh_token")
                let new_token = refresh_request(jwt_state.refresh_token)
                dispatch(refresh(new_token))
            }
            const url = "http://127.0.0.1:8000/api/users/me/"
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+jwt_state.token
            },
                
            };
        
        
            const response = await fetch(url, requestOptions)
            const data = await response.json()
            if (response.ok){
                setUser(data)
            } else {
                console.log("Blyat")
                
            }
        }
        f();
    })

    const get_data = async () => {
        if (jwt_state.authentificated == false){
            navigate('/login')
        }
        if (check_token(jwt_state.expires_in) == true){
            console.log(jwt_state)
            let new_token = await refresh_request(jwt_state.refresh_token)
            await dispatch(refresh(new_token))
        }
        const url = "http://127.0.0.1:8000/api/users/me/"
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+jwt_state.token
        },
            
        };
    
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        if (response.ok){
            setUser(data)
        } else {
            console.log("Blyat")
            
        }
        
    }

    return (
        <div>
            <span>{user.email}</span>
            <button onClick={async (e) => {get_data()}}>refresh</button>
        </div>
    )
}

export default class UserDetail extends React.Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return <div><User_detail_info/></div>
    }
}