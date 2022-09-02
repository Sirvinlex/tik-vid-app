import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const PopularTopic = () => {
  const { topicOptions } = useSelector((store) => store.createPost)

  return (
    <Wrapper>
      <hr/>
      <h3>Popular topics</h3>
      <div className='topic-container'>
        {topicOptions.map((topic, index) =>{
          return(
            <button className='topic-btn' type='button'  key={index}>{topic}</button>
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
`
export default PopularTopic