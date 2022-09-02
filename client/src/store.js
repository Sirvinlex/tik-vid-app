import { configureStore } from '@reduxjs/toolkit';
import createPostSlice from './features/createPostSlice';
import userSlice from './features/userSlice';

export const store = configureStore({
    reducer:{
        createPost: createPostSlice,
        user: userSlice,
    }
});