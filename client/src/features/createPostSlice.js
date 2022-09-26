import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import { toast } from 'react-toastify';

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
    sendingComment: false,
    sendingPost: false,
    isLikePending: false,
};
export const getPosts = createAsyncThunk('getPosts/allPosts', async (page, thunkAPI) =>{
    
  try {
    const {data} = await api.fetchPosts(page); 
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

export const deletePost = createAsyncThunk('post/deletePost', async (id, thunkAPI) =>{
    try {
        await api.deletePost(id);
               
        return id;
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
        },
        
        
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
            state.posts= payload.result;
            state.isLoading=false;
            if(payload.result.length === 0) toast.warning('No post match your query');
            state.searching= true;
        },
        [createPost.pending]: (state, {payload}) => {
            state.caption = '';
            state.sendingPost= true;
        },
        [createPost.fulfilled]: (state, {payload}) => {
            state.sendingPost=false;
            toast.success('Post successfully created');
            state.caption = '';
            
        },
        [postComment.pending]: (state) => {
            state.sendingComment=true;
        },
        [postComment.fulfilled]: (state, {payload}) => {
            state.posts= state.posts.map((post) => post._id === payload._id ? payload : post);
            toast.success('Comment successfully added');
            state.sendingComment=false;
        },
        [deleteComment.pending]: (state, {payload}) => {
            toast.warning('Deleting your comment...');
        },
        [deleteComment.fulfilled]: (state, {payload}) => {
            state.posts= state.posts.map((post) => post._id === payload._id ? payload : post);
            toast.success('Comment successfully deleted !')
        },
        [likePost.pending]: (state) => {
            state.isLikePending=true;
        },
        [likePost.fulfilled]: (state, {payload}) => {
            state.posts= state.posts.map((post) => post._id === payload._id ? payload : post);
            state.isLikePending=false;
        },
        
        [deletePost.fulfilled]: (state, {payload}) => {
            state.posts= state.posts.filter((post) => post._id !== payload);
            toast.success('Post successfully deleted !')
        },
        
    },
    
});

export const { handleInputs, getFiles, increasePageCount, decreasePageCount, addToggleLike, removeToggleLike, } = createPostSlice.actions;
export default createPostSlice.reducer;