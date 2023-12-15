import React from 'react';
import { useSelector } from 'react-redux';
  

const PostToast = () => {
const { sendingPost } = useSelector((store) => store.createPost)
  return (
    <div> {sendingPost && <div className='post-toast'>Sending Post...</div>}</div>
    )
}

export default PostToast