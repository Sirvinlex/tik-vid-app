import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000' })
const initialState = {
    caption: '',
    topic: '',
    topicOptions: ['Development', 'Comedy', 'Food', 'Gaming', 'Animals', 'Sports', 'Dance', 'Beauty'],
    posts: {}
};

export const getPosts = createAsyncThunk('getPosts/allPosts', async (_, thunkAPI) =>{

    // let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    
  try {
    const {data} = await api.fetchPosts();
    console.log(data, 'fetch posts')
    return data
    
    //  const resp = await API.get('/posts');
    // const resp = await customFetch.get(url)
    // return resp.data;
    
  } catch (error) {
    console.log(error)
  }
});

export const createPost = createAsyncThunk('post/createPost', async (post, thunkAPI) =>{
    try {
        console.log(post, 'slice')
         await api.createPosts(post);
        return 
    } catch (error) {
        console.log(error);
    }
});

const createPostSlice = createSlice({
    name: 'createPost',
    initialState,
    reducers:{
        handleInputs: (state, {payload: {name, value}}) =>{
            state[name] =value;
        }
    },
    extraReducers: {
        [getPosts.pending]: (state, actions) => {

        },
        [getPosts.fulfilled]: (state, {payload}) => {
            state.posts= payload
        },
        [getPosts.rejected]: (state, actions) => {

        },
        [createPost.pending]: (state, actions) => {

        },
        [createPost.fulfilled]: (state, {payload}) => {
            
        },
        [createPost.rejected]: (state, actions) => {

        },
    },
    
      
});

export const { handleInputs } = createPostSlice.actions;
export default createPostSlice.reducer;