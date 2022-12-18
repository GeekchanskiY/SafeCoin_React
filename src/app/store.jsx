import { configureStore } from '@reduxjs/toolkit'
import JWTReducer from '../features/JWTSlice'
import userReducer from '../features/userSlice'

export default configureStore({
    reducer: {
        jwt: JWTReducer,
        user: userReducer
    },
  })