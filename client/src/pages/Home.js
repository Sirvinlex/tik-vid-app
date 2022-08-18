import React from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';


const Home = () => {
  return (
    <Wrapper>
      <div className='container'>
        <Sidebar />
        <Posts />
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
background-color: white;
height: 100vh;
margin: 0px -10px -10px -10px;
.container{
  display: grid;
  grid-template-columns: 40% 60% ;
  grid-template-rows:  100%;
  margin: 0px 100px 0px 100px;
}
`

export default Home