import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, createPost, handleInputs } from '../features/createPostSlice';
import styled from 'styled-components';


const CreatePost = () => {
const { caption, topic, topicOptions } = useSelector((store) => store.createPost)
const dispatch = useDispatch();
const handleChange = (e) =>{
 const name = e.target.name;
 const value = e.target.value;
 dispatch(handleInputs({value, name}));
};

const handleSubmit = (e) =>{
  e.preventDefault();
  dispatch(getPosts())
  dispatch(createPost({caption, topic}))
};
  return (
    <Wrapper className='create-post'>
      <div className='container'>
        <form onSubmit={handleSubmit} className='form-container'>
          <div className='file-container'> 
            <button  type='button' >Upload</button>
          </div>
          <div className='details-container'>
            <label htmlFor='caption'>Caption</label>
            <input className='input' type='text' name='caption' value={caption} id='caption' onChange={handleChange}/>

            <label className='topic-label' htmlFor='topic'>Topic</label>
            <select className='input' name='topic' value={topic} id='topic' onChange={handleChange}>
              {topicOptions.map((itemValue, index) =>{
                return(
                  <option key={index} value={itemValue}>{itemValue}</option>
                )
              })}
            </select>
            <div className='btn-container'>
              <button className='post-btn' type='submit' >Post</button>
              <button className='discard-btn' type='button' onClick='' >Discard</button>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
padding: 50px 0px 50px 0px;

.container{
  
  background-color: white;
  border-radius: 10px;
  height: 80vh;
  width: 80%;
  margin: 0 auto;
}
.form-container{
  height: 100%;
  display: grid;
  grid-template-columns: 25% 75% ;
  grid-template-rows:  100%;
}
.details-container{
  display: flex;
  flex-direction: column;
  padding: 100px 100px 50px 100px;
}
.input{
  border: solid 2px #ebe6e6;
  height: 40px;
  border-radius: 5px;
}
.btn-container{
  padding-top: 30px;
}

.post-btn{
  height: 40px;
  width: 150px;
  border-radius: 5px;
  background-color: #e63295;
  border-color: #e63295;
  margin-right: 30px;
  color: white;
  cursor: pointer;
}
.discard-btn{
  height: 40px;
  width: 150px;
  border-radius: 5px;
  background-color: white;
  border: solid 2px #ebe6e6;
  cursor: pointer;
}

.topic-label{
  padding-top: 30px;
}
.file-container{
  
}

`

export default CreatePost