import React, { useEffect } from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../features/createPostSlice';
import { useLocation } from 'react-router-dom';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}


const Home = () => {
const { isLoading, page } = useSelector((store) => store.createPost);

const dispatch = useDispatch();
const query = useQuery();
// const pages = query.get('page') || page;
const pages = page
useEffect(() =>{
 dispatch(getPosts(pages))
}, [dispatch, pages]);

const { posts } = useSelector((store) => store.createPost)

  return (
    <Wrapper className={((posts?.result?.length === 0) || isLoading) && 'home-height'}>
      <div className='container'>
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
  /* display: grid;
  grid-template-columns: 30% 70% ;
  grid-template-rows:  auto; */
  margin: 0px 100px 0px 100px;
  position: relative;
}
`

export default Home