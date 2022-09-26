import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import Footer from './Footer';
import PopularTopic from './PopularTopic';
import { useSelector } from 'react-redux';


const Sidebar = () => {
  return (
    <Wrapper>
        <Icon />
        <PopularTopic />
        <div className='footer'><Footer /></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
display: grid;
grid-template-columns: 100%;
grid-template-rows: 80px auto auto;
grid-row-gap: 10px;
height: 100vh;
position: fixed;
overflow-y: auto;
overflow-x: hidden;
width: 28%;

@media (max-width: 1250px) {
    width: 20%;
  }
@media (max-width: 850px) {
grid-template-rows: 100px auto auto;
}
@media (max-width: 750px) {
  position: static;
  display: inline;
  width: 100%;
  .footer{
    display: none;
  }

}
`

export default Sidebar