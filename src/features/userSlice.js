import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: null,
    userimg: null,
    userid: null,
  }

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action) => {
        state.username = action.payload.username
        state.userid = action.payload.userid
        state.userimg = action.payload.img
    },
  },
})

export const { set } = UserSlice.actions

export default UserSlice.reducer