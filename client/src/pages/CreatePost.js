import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, handleInputs, getFiles } from '../features/createPostSlice';
import styled from 'styled-components';
import FileBase from 'react-file-base64';
import FormInput from '../components/FormInput';
import { toast } from 'react-toastify';

const CreatePost = () => {
const getUser = localStorage.getItem('user');
const localStorageUser = getUser ? JSON.parse(getUser) : null;
const creator = localStorageUser?._id;
const creatorName = localStorageUser?.name;
const { caption, topic, topicOptions, selectedFile, } = useSelector((store) => store.createPost)
const dispatch = useDispatch();
const navigate= useNavigate();
const handleChange = (e) =>{
 const name = e.target.name;
 const value = e.target.value;
 dispatch(handleInputs({value, name}));
};

const handleSubmit = (e) =>{
  e.preventDefault();
    if(localStorageUser){
      if(caption && topic && selectedFile){
      dispatch(createPost({caption, topic, selectedFile, creator, creatorName}));
    }else{
      toast.error('Please fill all fields');
    }
  }else{
    toast.warning('Register and/or Login  to create a Posts')
  }  
};

  return (
    <Wrapper className='create-post'>
      <div className='container'>
        <form onSubmit={handleSubmit} className='form-container'>
          <div className='file-container'> 
            <h2>UPload Video</h2>
            
            <h4>Select and upload video to your account</h4>
            <div className='file'>
              <p>Selected video should be <span>less than 14MB</span></p>
              <FileBase
                type='file'
                multiple={false}
                onDone={({base64}) => dispatch(getFiles({base64}))}
                
            />
            </div>
          </div>
          <div className='details-container'>
            {!localStorageUser && <h3 style={{color:'red'}}>Register and/or Login  to create a Posts</h3>}
            <FormInput  type='text' name='caption' value={caption} id='caption' labelText='Caption' handleChange={handleChange} />
            <label className='topic-label' htmlFor='topic'>Topic</label>
            <select className='form-input' name='topic' value={topic}  onChange={handleChange}>
              {topicOptions.map((itemValue, index) =>{
                return(
                  <option key={index} value={itemValue}>{itemValue}</option>
                )
              })}
            </select>
            <div className='btn-container'>
              <button className='post-btn' type='submit' >Post</button>
              <button className='back-home-btn' type='button' onClick={() => navigate('/')} >Back to Home</button>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
padding: 50px 0px 50px 0px;
margin-top: 100px;
p span{
  color: #e63295;
  font-weight: 600;
}
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

.btn-container{
  padding-top: 30px;
}

.post-btn{
  height: 40px;
  width: 150px;
  border-radius: 5px;
  background-color: #e63295;
  border: none;
  margin-right: 30px;
  color: white;
  cursor: pointer;
}
.back-home-btn{
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
  padding-left: 25px;
}
.file-container h4{
  color: #736f66;
  margin-top: -20px;
}
.file p{
  font-weight: 400;
  margin-top: 100px;
  color: #736f66;
}
.file{
  
}

@media (max-width: 917px) {
  .post-btn{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .back-home-btn{
    width: 100%;
  }
  }
  @media (max-width: 750px) {
  .container{
      background-color: white;
      border-radius: 10px;
      height: fit-content;
      width: 80%;
      margin-left: auto;
    }
    .file-container{
      padding-left: 100px;
      padding-right: 30px;
      margin-bottom: -50px;
    }
    .file{
      margin-top: -50px;
    }
   .form-container{
      height: 100%;
      display: grid;
      grid-template-columns: 100% ;
      grid-template-rows:  auto auto;
    }
  }
`

export default CreatePost