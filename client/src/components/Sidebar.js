import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import SuggestedAccount from './SuggestedAccount';
import PopularTopic from './PopularTopic';


const Sidebar = () => {
  return (
    <Wrapper>
        <Icon />
        <SuggestedAccount />
        <PopularTopic />

    </Wrapper>
  )
}

const Wrapper = styled.div`
border: solid black;
/* height: 80vh; */
`

export default Sidebar