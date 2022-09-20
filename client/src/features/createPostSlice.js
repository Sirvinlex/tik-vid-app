import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({baseURL: 'http://localhost:5000' })
const initialState = {
    caption: '',
    topic: 'Development',
    selectedFile: '',
    topicOptions: ['Development', 'Comedy', 'Food', 'Gaming', 'Animals', 'Sports', 'Dance', 'Beauty'],
    posts: [],
    currentPage: '',
    numberOfPages: '',
    isLoading: false,
    searching: false,
    page: 1,
    showAltLike: false,
    likeDelay:false,
    toggleLike: '',
};
export const getPosts = createAsyncThunk('getPosts/allPosts', async (page, thunkAPI) =>{

    // let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    
  try {
    const {data} = await api.fetchPosts(page); 
    console.log(data)
    return data
    
  } catch (error) {
    console.log(error)
  }
});

export const getPostsBySearch = createAsyncThunk('getPosts/bySearch', async (searchData, thunkAPI) =>{
    try {
        const { search, category } = searchData;
        const {data} = await api.fetchPostsBySearch(search, category); 
        return data;
    } catch (error) {
        
    }
});

export const createPost = createAsyncThunk('post/createPost', async (post, thunkAPI) =>{
    try {
        await api.createPosts(post);
        thunkAPI.dispatch(getPosts());
        return 
    } catch (error) {
        console.log(error);
    }
});

export const postComment = createAsyncThunk('post/postComment', async (commentData, thunkAPI) =>{
    
    try {
        const {id, finalComment} = commentData
        const {data} = await api.postComment(finalComment, id);
        return data
    } catch (error) {
        
    }
});

export const deleteComment = createAsyncThunk('post/deleteComment', async (deleteCommentData, thunkAPI) =>{
    try {
        const { id, index } = deleteCommentData;
        const {data} = await api.deleteComment(id, index);
        return data;
    } catch (error) {
        
    }
});

export const likePost = createAsyncThunk('post/likePost', async (likePostData, thunkAPI) =>{
    try {
        const {postId, userId} = likePostData;
        const {data} = await api.likePost(postId, userId);
        return data
    } catch (error) {
        
    }
});

export const deletePost = createAsyncThunk('post/createPost', async (id, thunkAPI) =>{
    try {
        const {data} = await api.deletePost(id);
               
        return data;
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
        increasePageCount:(state) =>{
            if(state.page === state.numberOfPages){
                state.page = 1;
            }else{
                state.page = state.page + 1
            }
        },
        decreasePageCount:(state) =>{
            if(state.page === 1){
                state.page= state.numberOfPages
            }else{
                state.page= state.page - 1
            }
        },
        addToggleLike:(state, {payload}) =>{
            state.toggleLike= payload;
        },
        removeToggleLike:(state) =>{
            state.toggleLike='';
        }
        
    },
    extraReducers: {
        [getPosts.pending]: (state, actions) => {
            state.isLoading= true;

        },
        [getPosts.fulfilled]: (state, {payload}) => {
            state.posts= payload.result;
            state.numberOfPages= payload.numberOfPages;
            state.currentPage= payload.currentPage;
            state.isLoading=false;
            state.searching= false;
        },
        [getPosts.rejected]: (state, actions) => {

        },
    
        [getPostsBySearch.pending]: (state, actions) => {
            state.isLoading= true;
        },
         [getPostsBySearch.fulfilled]: (state, {payload}) => {
            state.posts= payload;
            state.isLoading=false;
            if(payload.result.length === 0) toast.warning('No post match your query');
            state.searching= true;
        },
    
        // [createPost.pending]: (state, actions) => {

        // },
        [createPost.fulfilled]: (state, {payload}) => {
            state.caption = ''
            toast.success('Post successfully created');
            
        },
        [createPost.rejected]: (state, actions) => {

        },
        [likePost.pending]: (state, {payload}) => {
            state.showAltLike= true;
            state.likeDelay= true;
        },
        [likePost.fulfilled]: (state, {payload}) => {
            state.posts= state.posts.map((post) => post._id === payload._id ? payload : post);
            state.showAltLike= false;
            state.likeDelay= false;
        },
        [postComment.pending]: () => {
            toast.warning('Uploading comment...')
        },
        [postComment.fulfilled]: (state, {payload}) => {
            state.posts= state.posts.map((post) => post._id === payload._id ? payload : post);
            toast.success('Comment successfully added');
        },
        
        [deletePost.fulfilled]: (state, {payload}) => {
            state.posts= state.posts.filter((post) => post._id !== payload.id);
            toast.success('Post deleted successfully !');
        },
        [deleteComment.pending]: (state, {payload}) => {
            toast.warning('Deleting your comment...');
        },
        [deleteComment.fulfilled]: (state, {payload}) => {
            state.posts= state.posts.map((post) => post._id === payload._id ? payload : post);
            toast.success('Comment successfully deleted !')
        },
    },
    
      
});

export const { handleInputs, getFiles, increasePageCount, decreasePageCount, addToggleLike, removeToggleLike } = createPostSlice.actions;
export default createPostSlice.reducer;