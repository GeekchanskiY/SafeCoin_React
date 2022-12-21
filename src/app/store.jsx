import { compose, configureStore } from '@reduxjs/toolkit'
import JWTReducer from '../features/JWTSlice'
import userReducer from '../features/userSlice'
import persistState from 'redux-localstorage'

const authMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type == "JWT/auth"){
        localStorage.setItem('auth', JSON.stringify(action.payload))
        console.log('YAY')
    }
    
    return result;
  };

export default configureStore({
    reducer: {
        jwt: JWTReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
  })