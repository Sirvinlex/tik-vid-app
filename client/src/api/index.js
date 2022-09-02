import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000' });

export const fetchPosts = () => API.get('/posts')
export const createPosts = (post) => API.post('/posts', post)
export const deletePost = (id) => API.delete(`posts/${id}`)
export const registerUser = (regData) => API.post('/user/registerUser', regData)
export const loginUser = (loginData) => API.post('/user/loginUser', loginData)
export const postComment = (comments, id) => API.post(`/posts/${id}/postComment`, {comments})

