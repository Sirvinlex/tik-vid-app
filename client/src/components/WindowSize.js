import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { resizeWindow } from '../features/searchSlice';

const WindowSize = () => {
    const dispatch = useDispatch();


useEffect(() =>{
    window.addEventListener('resize', getWindowSize);

    return () => {
      window.removeEventListener('resize', getWindowSize);
    };

}, [window.innerWidth])

const getWindowSize = () =>{
    const {innerWidth} = window;
    dispatch(resizeWindow(innerWidth))
}

}

export default WindowSize