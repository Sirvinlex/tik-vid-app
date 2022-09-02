import React from 'react';
import styled from 'styled-components';

const SuggestedAccount = () => {
  return (
    <Wrapper>
      <hr/>
      <div>SuggestedAccount</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
hr{
  margin: 0px 10px 0px 10px;
  background-color: var(--backgroundColor);
  border: none;
  height: 2px;
}
`

export default SuggestedAccount