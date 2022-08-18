import { configureStore } from '@reduxjs/toolkit';
import createPostSlice from './features/createPostSlice';

export const store = configureStore({
    reducer:{
        createPost: createPostSlice,
    }
});