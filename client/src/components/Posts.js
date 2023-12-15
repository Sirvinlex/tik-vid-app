import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeft } from 'react-icons/bs'
import Loading from '../components/Loading';
import Pagination from './Pagination';
import { getPosts } from '../features/createPostSlice';
import Footer from './Footer';
import MainPosts from './MainPosts';

const Posts = () => {
  const { posts, isLoading, searching } = useSelector((store) => store.createPost);
  const dispatch = useDispatch();
    
if(isLoading){
    return  <Loading />
  };
  
  return (
    <Wrapper>
      {searching && (
        <button onClick={() => dispatch(getPosts())} className='all-posts-btn'><BsArrowLeft  /> {' '} All Posts</button>
      )}
      {posts?.map((post) =>{
        return <MainPosts post={post} key={post._id} />
      })}
      {!searching && <Pagination />}
      {(searching && posts?.length > 0) && (
        <button onClick={() => dispatch(getPosts())} className='all-posts-btn' type='button'><BsArrowLeft  /> {' '} All Posts</button>
      )}

      <div className='footer'><Footer /></div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
width: 70%;
margin-left: 380px;

.all-posts-btn{
  margin: 20px 0 20px 20px;
  height: 40px;
  width: 150px;
  border-radius: 5px;
  background-color: white;
  border: solid #e63295;
  color: #e63295;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}

@media (max-width: 1250px) {
    width: 80%;
    margin-left: 300px;
  }
@media (max-width: 1150px) {
    width: 80%;
    margin-left: 250px;
  }
@media (max-width: 1100px) {
    width: 80%;
    margin-left: 200px;
   }
@media (max-width: 950px) {
    margin-left: 200px;
    }
  
@media (max-width: 750px) {
    margin-left: 0px;
    width: 100%;
    .footer{
      display: block;
    }
   }
@media (min-width: 751px) {
  .footer{
    display: none;
  }

}
`

export default Posts