import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: '',
    category: '',
    windowSize: window.innerWidth, 
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        handleMainSearchInput: (state, action) =>{
            state.search = action.payload;
        },
        handleCategoryInput: (state, action) =>{
            state.category = action.payload;
        },
        resetSearch: (state) =>{
            state.search= '';
        },
         resetCategory:(state) =>{
            state.category= '';
        },
        resizeWindow:(state, {payload}) =>{
            state.windowSize= payload;
        },
        
    },
    
});

export const { handleMainSearchInput, handleCategoryInput, resetSearch, resetCategory, resizeWindow } = searchSlice.actions;
export default searchSlice.reducer;