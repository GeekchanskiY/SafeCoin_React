import { createSlice } from '@reduxjs/toolkit'

export const JWTSlice = createSlice({
  name: 'JWT',
  initialState: {
    authentificated: false,
    token: null,
    refresh: null,
    expires_in: null
  },
  reducers: {
    refresh: (state) => {
        const url = "http://127.0.0.1:8000/api/auth/token/refresh/"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                refresh: state.refresh,
            })
          };
        let now = new Date()
        console.log(state.refresh)
        let should_i_update = (new Date(state.expires_in) > now.getTime() - (20*1000))
        console.log(should_i_update)
        if (should_i_update == true){
            fetch(url, requestOptions)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    state.authentificated = true;
                    state.token = result.access;
                    state.expires_in = new Date(now.getTime() + (20 * 60 * 1000)) 
                })
        }
    },
    auth: async (state, action) => {
        let now = new Date()
        const url = "http://127.0.0.1:8000/api/auth/token/"
        console.log(action)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: action.payload.email,
                password: action.payload.password
            })
          };
        let response = await fetch(url, requestOptions)
        if (response.ok) {
            response = await response.json()
            console.log(response)
            state.authentificated = true;
            state.token = response.access;
            state.expires_in = new Date(now.getTime() + (20 * 60 * 1000)).toString()
            state.refresh = response.refresh
        } else {
            state.authentificated = false;
            state.token = null;
            state.expires_in = null
            state.refresh = null
        }
        
        
            
    },
  },
})

// Action creators are generated for each case reducer function
export const { refresh, auth } = JWTSlice.actions

export default JWTSlice.reducer