import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000' })
const initialState = {
    caption: '',
    topic: 'Development',
    selectedFile: '',
    topicOptions: ['Development', 'Comedy', 'Food', 'Gaming', 'Animals', 'Sports', 'Dance', 'Beauty'],
    posts: [],
    isLoading: false
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

export const postComment = createAsyncThunk('post/postComment', async (commentData, thunkAPI) =>{
    
    try {
        const {id, finalComment} = commentData
        const {data} = await api.postComment(finalComment, id);
        thunkAPI.dispatch(getPosts())        
        return data
    } catch (error) {
        
    }
});

export const likePost = createAsyncThunk('post/likePost', async (likePostData, thunkAPI) =>{
    try {
        console.log(likePostData)
    } catch (error) {
        
    }
});

export const deletePost = createAsyncThunk('post/createPost', async (id, thunkAPI) =>{
    try {
        const {data} = await api.deletePost(id);
        thunkAPI.dispatch(getPosts())        
        return data 
    } catch (error) {
        
    }
});

const createPostSlice = createSlice({
    name: 'createPost',
    initialState,
    reducers:{
        handleInputs: (state, {payload: {name, value}}) =>{
            state[name] =value;
        },
        getFiles: (state, {payload}) =>{
            state.selectedFile= payload.base64;
        },
        
    },
    extraReducers: {
        [getPosts.pending]: (state, actions) => {
            state.isLoading= true

        },
        [getPosts.fulfilled]: (state, {payload}) => {
            state.isLoading= true
            state.posts= payload
            state.isLoading=false
        },
        [getPosts.rejected]: (state, actions) => {

        },
        [createPost.pending]: (state, actions) => {

        },
        [createPost.fulfilled]: (state, {payload}) => {
            state.caption = ''
            
        },
        [createPost.rejected]: (state, actions) => {

        },
        [postComment.fulfilled]: (state, {payload}) => {
            
        },
    },
    
      
});

export const { handleInputs, getFiles, handleCommentInput } = createPostSlice.actions;
export default createPostSlice.reducer;