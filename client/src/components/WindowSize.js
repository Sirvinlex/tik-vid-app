import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { resizeWindow } from '../features/searchSlice';

const WindowSize = () => {
    const dispatch = useDispatch();


useEffect(() =>{
    window.addEventListener('resize', getWindowSize);

    return () => {
      window.removeEventListener('resize', getWindowSize);
    };

}, [window])
const getWindowSize = () =>{
    const {innerWidth} = window;
    dispatch(resizeWindow(innerWidth))
}


  return (
    <div>
        {/* <h2>Width: {windowSize.innerWidth}</h2>
        
      <h2>Height: {windowSize.innerHeight}</h2> */}
    </div>
  )
}

export default WindowSize