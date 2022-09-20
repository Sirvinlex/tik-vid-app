import React,{useEffect, useState} from 'react';
import styled from 'styled-components';

const Footer = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
   useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};

}

  return (
    <Wrapper>
      <hr/>
      {/* <div>Footer</div> */}
      <div>
      <h2>Width: {windowSize.innerWidth}</h2>

      <h2>Height: {windowSize.innerHeight}</h2>
      <h2>Height: {windowSize.innerHeight}</h2>
      <h2>Height: {windowSize.innerHeight}</h2>
      <h2>Height: {windowSize.innerHeight}</h2>
      <h2>Height: {windowSize.innerHeight}</h2>
      <h2>Height: {windowSize.innerHeight}</h2>
      <h2>Height: {windowSize.innerHeight}</h2>
      <h2>Height: {windowSize.innerHeight}</h2>
      <h2>Height: {windowSize.innerHeight}</h2>
    </div>
    
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

export default Footer