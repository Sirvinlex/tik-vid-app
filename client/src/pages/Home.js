import React, { useEffect } from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../features/createPostSlice';


const Home = () => {
const dispatch = useDispatch();
const { isLoading } = useSelector((store) => store.createPost)
  
useEffect(() =>{
 dispatch(getPosts())
}, [dispatch]);

const { posts } = useSelector((store) => store.createPost)

  return (
    <Wrapper className={(posts.length === 0 && isLoading) && 'home-height'}>
      <div className='container'>
        <Sidebar />
        <Posts />
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
background-color: white;

margin: 80px -10px -10px -10px;
.container{
  /* display: grid;
  grid-template-columns: 30% 70% ;
  grid-template-rows:  auto; */
  margin: 0px 100px 0px 100px;
  position: relative;
}
`

export default Home