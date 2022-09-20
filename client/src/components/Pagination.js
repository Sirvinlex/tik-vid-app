import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { decreasePageCount, getPosts, increasePageCount } from '../features/createPostSlice';
import styled from 'styled-components';



// function useQuery(){
//     return new URLSearchParams(useLocation().search);
// }


  

const Pagination = () => {
  const { isLoading, page } = useSelector((store) => store.createPost);
  const dispatch = useDispatch();

// const dispatch = useDispatch();
// const query = useQuery();
// const pages = query.get('page') || 1;
  return (
    <Wrapper>
      <button className='page-btn' onClick={() =>{
         dispatch(decreasePageCount())
      }} type='button'>
        Previous Posts
      </button>
      <button className='page-btn' onClick={() => {
        dispatch(increasePageCount());
      }} type='button'>
        See more Posts
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin: 10px 0 0 100px;

.page-btn{
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
@media (max-width: 950px) {
  .page-btn{
    margin-left: 0px;
  }
}
@media (max-width: 510px) {
  .page-btn{
    margin-left: -15px;
  }
}
@media (max-width: 400px) {
  .page-btn{
    margin-left: -70px;
  }
}
`

export default Pagination