import axios from 'axios';

const API = axios.create({baseURL: 'https://tik-video-app.herokuapp.com/' });

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = (search, category) => API.get(`/posts/search?searchQuery=${search || 'none'}&category=${category || 'none'}`);
export const createPosts = (post) => API.post('/posts', post)
export const deletePost = (id) => API.delete(`posts/${id}`)
export const registerUser = (regData) => API.post('/user/registerUser', regData)
export const loginUser = (loginData) => API.post('/user/loginUser', loginData)
export const postComment = (comments, id) => API.post(`/posts/${id}/postComment`, {comments})
export const likePost = (postId, userId) => API.post(`/posts/${postId}/likePost`, {userId})
export const deleteComment = (id, index) => API.patch(`/posts/${id}/deleteComment`, {index})

