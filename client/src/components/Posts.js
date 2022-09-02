import React,{useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { CardMedia } from '@material-ui/core';
import { AiFillDelete } from 'react-icons/ai';
import { BsFillHeartFill } from 'react-icons/bs'
import Loading from '../components/Loading';
import { deletePost, likePost, postComment } from '../features/createPostSlice';
import FormInput from './FormInput';



const Posts = () => {
  const getUser = localStorage.getItem('user');
  const localStorageUser = getUser ? JSON.parse(getUser) : null;
  const { posts, isLoading, } = useSelector((store) => store.createPost);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleDeletePost = (id) =>{
    dispatch(deletePost(id));
  };

  const handleLikeCounts = (postId) =>{
    dispatch(likePost(postId, localStorageUser._id))

  };

  if(isLoading){
    return  <Loading />
  };

  const handleChange = (e) =>{
    setComment(e.target.value);
    
  };

  const handleSubmit = (id) =>{
    
    const finalComment = `${localStorageUser.name}:${localStorageUser._id}:${comment}`
    if(comment) dispatch(postComment({id, finalComment}))
    setComment('');
  };
  return (
    <Wrapper>
      {posts.map((post) =>{
        return(
          <div key={post._id}>
            <div className='user-caption'>
              <img className='user-img' src='https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png' alt='user-image' />
              <span><h2>Alex Vin</h2> <h3>{post.caption} <span id='created-at'>{post.createdAt}</span></h3></span>
            </div>
            <CardMedia className='media' component='video' image={post.selectedFile} /*autoPlay*/ controls />
            <div className='btn-container'>
              <button onClick={() => handleLikeCounts(post._id)} className='delete-btn' type='button'><BsFillHeartFill size={20}/>2</button>
              <button onClick={() => handleDeletePost(post._id)} className='like-btn' type='button'><AiFillDelete size={20}/>Delete</button>
            </div>
            {post.comments.map((c, i) =>{
              return (
                <div key={i}>
                  <div><strong>{c.split(':')[0]}</strong></div>
                  <div>{c.split(':')[2]}</div>
                </div>
              )
            })}
            <hr/>
            <div>
              <form onSubmit={(e) =>{
                e.preventDefault();
                handleSubmit(post._id)
              }}>
                <FormInput  type='text' name='comments' value={comment} id='comments' labelText='Write a Comment' handleChange={handleChange} />
                <button type='submit'>send</button>
              </form>
            </div>
            <hr />
          </div>
        )
      })}
    </Wrapper>
  )
};

const Wrapper = styled.div`
/* border: solid black; */
/* height: 80vh; */
width: 70%;
margin-left: 380px;
.media {
  padding: 20px 20px 20px 20px;
  margin: 0 0 50px 100px;
  height: 500px;
  width: 600px;
  border-radius: 30px;
  background-color: black;
}
.user-img{
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin: 20px 0 0 20px;
}
.user-caption{
  display: flex;

}
.user-caption span{
  margin-left: 20px;
}

#created-at{
  font-size: 11px;
}

.user-caption span h3{
  margin-top: -20px;
  font-weight: 500;
  text-transform: capitalize;
}
.btn-container{
 margin: -40px 120px 20px 120px;
 display: flex;
 justify-content: space-between;
}
.like-btn{
  background-color: white;
  border: none;

}
.delete-btn{
  background-color: white;
  border: none;
}
hr{
  margin: 0px 20px 0px 20px;
  background-color: var(--backgroundColor);
  border: none;
  height: 2px;
}
`

export default Posts