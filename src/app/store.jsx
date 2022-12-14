import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import JWTReducer from '../features/JWTSlice'

export default configureStore({
    reducer: {
        jwt: JWTReducer,
        counter: counterReducer
    },
  })