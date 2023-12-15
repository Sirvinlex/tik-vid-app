import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
   return (
    <Wrapper>
      <hr/>
      <p>Tik Video App is a social application for sharing short videos for you and your friends to view anytime and anywhere !!!</p>
      <hr className='hr'/>
      <h5>&copy; {year}  Tik Video App, all rights reserved</h5>
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin: 0px 20px 100px 20px;
hr{
  background-color: var(--backgroundColor);
  border: none;
  height: 2px;
}
@media (max-width: 750px) {
  margin: 0px -40px 0px -40px;
  .hr{
    display: none;
  }
  hr{
    margin: 0px -20px 0px -20px;
  }
}


`

export default Footer