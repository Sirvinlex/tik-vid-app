import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as api from '../api';

const initialState = {
    name: '',
    email: '',
    password: '',
    login: true,
    user: {},
    toggleUser: false,
    loading: false,
};


export const regUser = createAsyncThunk('register/user', async (regData, thunkAPI) =>{
    try {
        const {data} = await api.registerUser(regData);
        return data.message
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.message);
    }

});

export const logUser = createAsyncThunk('login/user', async (loginData, thunkAPI) =>{
    try {
        const {data} = await api.loginUser(loginData);
        console.log(data, 'login')
        return data.result
    } catch (error) {
        console.log(error)
        
        return  thunkAPI.rejectWithValue(error.response.data.message);
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
            const getUser = localStorage.getItem('user');
            const localStorageUser = getUser ? JSON.parse(getUser) : null;
            toast.success(`Goodbye ${localStorageUser?.name}`)
            localStorage.removeItem('user');
            state.user= {};
            state.toggleUser= false;
            state.creator= '';
             
        },
    },
    extraReducers:{
        [regUser.pending]: (state, actions) => {
            state.loading=true;
            
        },
        [regUser.fulfilled]: (state, actions) => {
            state.login = true;
            state.password = '';
            state.loading=false;
            toast.success(actions.payload);
        },
        [regUser.rejected]: (state, actions) => {
            toast.error(actions.payload)
        },
        [logUser.pending]: (state, actions) => {
            state.loading=true;
        },
        [logUser.fulfilled]: (state, {payload}) => {
            state.user= payload;
            localStorage.setItem('user', JSON.stringify(state.user));
            state.toggleUser= true;
            state.navigateToHome= true;
            state.loading=false;
            toast.success(`Welcome ${state?.user?.name}`)
        },
        [logUser.rejected]: (state, actions) => {
            toast.error(actions.payload);
            state.navigateToHome= false;
            
        },
    }
});

export const { handleInputs, registerForm, loginForm, logoutAccount } = userSlice.actions;

export default userSlice.reducer;