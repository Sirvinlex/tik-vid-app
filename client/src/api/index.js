import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000' });

export const fetchPosts = () => API.get('/posts')
export const createPosts = (post) => {
    API.post('/posts', post)
    console.log(post, 'Api')
};