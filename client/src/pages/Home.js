import React, { useEffect } from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../features/createPostSlice';
import WindowSize from '../components/WindowSize';



const Home = () => {
const { isLoading, page } = useSelector((store) => store.createPost);
const dispatch = useDispatch();
const pages = page
useEffect(() =>{
 dispatch(getPosts(pages))
}, [dispatch, pages]);

const { posts } = useSelector((store) => store.createPost)

  return (
    <Wrapper className={((posts.length === 0) || isLoading) && 'home-height'}>
      <div className='container'>
        <WindowSize/>
        <Sidebar />
        <Posts />
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
background-color: white;
@media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    
  }

margin: 80px -10px -10px -10px;
.container{
  margin: 0px 100px 0px 100px;
  position: relative;
}
`
export default Home