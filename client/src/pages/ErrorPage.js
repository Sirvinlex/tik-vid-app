import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className='error-container'>
        <h1>Oops !!!  Not What you are looking for?</h1>
        <button className='back-home-btn' type='button' onClick={() => navigate('/')} >Back to Home</button>
      </div>
    </Wrapper>
  )
}

const Wrapper= styled.div`
margin-top: 50px;
padding-top: 150px;
background-color: white;
height: 100vh;
margin-left: -10px;
margin-right: -10px;

.error-container{
  text-align: center;
}
.back-home-btn{
  height: 40px;
  width: 150px;
  border-radius: 5px;
  background-color:white;
  border: solid 2px #e63295;
  cursor: pointer;
  color: #e63295;
}
h1{
  color: #e63295;
}
`

export default ErrorPage