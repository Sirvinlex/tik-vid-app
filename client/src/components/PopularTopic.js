import React,{useEffect,} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { handleCategoryInput, resetCategory, resetSearch } from '../features/searchSlice';
import { useNavigate } from 'react-router-dom';
import { getPostsBySearch,  } from '../features/createPostSlice';


const PopularTopic = () => {
  const { topicOptions, isLoading } = useSelector((store) => store.createPost);
  const { search, category } = useSelector((store) => store.search)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
       if(search.trim() || category){
         dispatch(getPostsBySearch({search, category}));
         dispatch(resetSearch());
         dispatch(resetCategory())
         // navigate(`/posts/search?searchQuery=${ search || 'none'}&category=${ category || 'none' }`);
         }else{
         navigate('/');
       }

  }, [category])

  return (
    <Wrapper>
      <hr/>
      <h1>Popular topics</h1>
      <div className='topic-container'>
        {topicOptions.map((topic, index) =>{
              
          return(
            <button onClick={() =>{
              dispatch(handleCategoryInput(topic));
             }} className='topic-btn' type='button'  key={index}
             disabled={isLoading}
            >
              {topic}
            </button>
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