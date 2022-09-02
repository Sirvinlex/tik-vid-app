import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import SuggestedAccount from './SuggestedAccount';
import PopularTopic from './PopularTopic';


const Sidebar = () => {
  return (
    <Wrapper>
        <Icon />
        <PopularTopic />
        <SuggestedAccount />
    </Wrapper>
  )
}

const Wrapper = styled.div`
/* border: solid black; */
/* height: 80vh; */
display: grid;
grid-template-columns: 100%;
grid-template-rows: 80px auto auto;
grid-row-gap: 10px;
height: fit-content;
overflow-y: auto;
position: fixed;
width: 28%;
`

export default Sidebar