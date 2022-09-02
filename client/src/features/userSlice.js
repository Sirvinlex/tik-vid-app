import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import axios from 'axios';

const initialState = {
    name: '',
    email: '',
    password: '',
    login: true,
    toggleUser: false,
    user: {},
};

// export const addUserToLocalStorage = (user) => {
//   localStorage.setItem('user', JSON.stringify(user));
// };

// export const removeUserFromLocalStorage = () => {
//   localStorage.removeItem('user');
// };

// export const getUserFromLocalStorage = () => {
//   const result = localStorage.getItem('user');
//   const user = result ? JSON.parse(result) : null;
//   return user;
// };
export const regUser = createAsyncThunk('register/user', async (regData, thunkAPI) =>{
    try {
        const {data} = await api.registerUser(regData);
        console.log(data, 'register data')
        return data
    } catch (error) {
        console.log(error)
    }

});

export const logUser = createAsyncThunk('login/user', async (loginData, thunkAPI) =>{
     try {
        const {data} = await api.loginUser(loginData);
        return data.result
    } catch (error) {
        console.log(error)
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        handleInputs: (state, {payload: {name, value}}) =>{
            state[name] = value;
        },
        registerForm: (state,) =>{
            state.login = false;
        },
        loginForm:(state) =>{
            state.login = true;
        },
        logoutAccount:(state) =>{
            state.toggleUser= false;
            localStorage.removeItem('user');
        },
    },
    extraReducers:{
        [regUser.pending]: (state, actions) => {
            
        },
        [regUser.fulfilled]: (state, actions) => {
            state.login = true;
            state.password = ''
        },
        [regUser.rejected]: (state, actions) => {
            
        },
        [logUser.pending]: (state, actions) => {
            
        },
        [logUser.fulfilled]: (state, {payload}) => {
            state.user= payload;
            localStorage.setItem('user', JSON.stringify(state.user));
            state.toggleUser= true;
        },
        [logUser.rejected]: (state, actions) => {
            
        },
    }
});

export const { handleInputs, registerForm, loginForm, logoutAccount } = userSlice.actions;

export default userSlice.reducer;