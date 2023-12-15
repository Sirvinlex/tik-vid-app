import React from 'react';
import { AiOutlineHome } from "react-icons/ai";
import styled from 'styled-components';

const Icon = () => {
  return (
    <Wrapper>
      <div className='icon-container'><AiOutlineHome className='icon' size={40}/> <span className='icon-text'>For You</span></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`

.icon-text{
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: #e63295;
}
.icon{
  margin: 0px 10px -5px 0px;
  color: #e63295;
}
.icon-container{
  margin-left: 20px;
  margin-top: 25px;
}
@media (max-width: 750px) {
  height: 110px;
  margin-top: 5px ;
}

`
export default Icon