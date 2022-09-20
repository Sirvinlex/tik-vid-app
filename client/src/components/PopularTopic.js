import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { handleCategoryInput, resetSearch } from '../features/searchSlice';
import { useNavigate } from 'react-router-dom';
import { getPostsBySearch } from '../features/createPostSlice';
import WindowSize from './WindowSize';


const PopularTopic = () => {
  const { topicOptions } = useSelector((store) => store.createPost);
  const { search, category } = useSelector((store) => store.search)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleClick = (topic) =>{
    dispatch(handleCategoryInput(topic))
    
    
    if(search.trim() || category){
    dispatch(getPostsBySearch({search, category}));
    dispatch(resetSearch());
    
    // navigate(`/posts/search?searchQuery=${ search || 'none'}&category=${ category || 'none' }`);

  }else{
    navigate('/');
  }
  
  };

   
  return (
    <Wrapper>
      <hr/>
      <WindowSize/>
      <h1>Popular topics</h1>
      <h3>Double click the buttons to search popular posts</h3>
      <div className='topic-container'>
        {topicOptions.map((topic, index) =>{
          return(
            <button onClick={() => handleClick(topic)} className='topic-btn' type='button'  key={index}>{topic}</button>
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin: 0px 20px 0px 20px;
.topic-container{
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  
}
.topic-btn{
  background-color: white;
  color: black;
  border: solid 2px #91969e;
  text-align: center;
  height: 40px;
  width: fit-content;
  border-radius: 50px;
  font-weight: 540;
  font-size: 17px ;
  margin: 5px;
  cursor: pointer;
}

h1{
  color: #91969e;
}

h3{
  color: #91969e;
  font-weight: 540;
}

hr{
  margin: 0px 10px 0px 0px;
  background-color: var(--backgroundColor);
  border: none;
  height: 2px;
}
@media (max-width: 850px) {
  margin-left: 2px;
}
@media (max-width: 750px) {
  margin-top: -20px ;
  .topic-btn{
    font-size: 11px;
    height: 30px;
  }
}

`
export default PopularTopic