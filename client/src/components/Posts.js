import React,{useState} from 'react';
import { Link,  useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { CardMedia } from '@material-ui/core';
import { AiOutlineSend } from 'react-icons/ai';
import { BsFillHeartFill, BsHeart, BsArrowLeft } from 'react-icons/bs'
import { FaRegCommentAlt, FaTimesCircle } from 'react-icons/fa'
import Loading from '../components/Loading';
import { addToggleLike, deleteComment, deletePost, likePost, postComment, removeToggleLike } from '../features/createPostSlice';
import FormInput from './FormInput';
import moment from 'moment';
import Pagination from './Pagination';
import { getPosts } from '../features/createPostSlice';
import Footer from './Footer';






const Posts = () => {
  const getUser = localStorage.getItem('user');
  const localStorageUser = getUser ? JSON.parse(getUser) : null;
  const { posts, isLoading, searching, showAltLike, likeDelay, toggleLike } = useSelector((store) => store.createPost);
  const { windowSize } = useSelector((store) => store.search);
  const [comment, setComment] = useState('');
  const [toggleCommentPage, setToggleCommentPage] = useState('');
  // const [toggleLike, setToggleLike] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeletePost = (id) =>{
    dispatch(deletePost(id));
  };

  const handleLikeCounts = (postId, uniqueId) =>{
    const userId = localStorageUser?._id
    if(localStorageUser){
      dispatch(likePost({postId, userId}));
      if(toggleLike === ''){
        dispatch(addToggleLike(uniqueId));
      }else{
        dispatch(removeToggleLike());
      }
      //  setToggleLike((prevState) =>{
      //   if (prevState === ''){
      //     setToggleLike(uniqueId)
      //   }else{
      //     setToggleLike('')
      //   }
      //  } );
console.log(toggleLike, 'toggle')
      
      // console.log(toggleLike)
    }else{
      toast.warning('Register and/or Login to react to posts')
    }

  };

  const handleDeleteComment = (id, index) =>{
    dispatch(deleteComment({id, index}))
  };

  const handleShowComment = (id) =>{
    setToggleCommentPage(id)
  }

 

  const handleChange = (e) =>{
    setComment(e.target.value);
    
  };

  const handleSubmit = (id) =>{
    const finalComment = `${localStorageUser.name}:${localStorageUser._id}:${comment}`
    if(comment && localStorageUser){
      dispatch(postComment({id, finalComment}))
    }else{
      toast.warning('Register and/or Login your account to comment on your favorite posts')
    }
    setComment('');
  };

   if(isLoading){
    return  <Loading />
  };
  
  return (
    <Wrapper className={isLoading && 'small-screen-width'}>
      {searching && (
        <button onClick={() => dispatch(getPosts())} className='all-posts-btn'><BsArrowLeft  /> {' '} All Posts</button>
      )}
      {posts?.map((post) =>{
        return(
          <div key={post?._id} >
            <div className='user-caption'>
              <div className='post-creator-icon'>{post?.creatorName?.charAt(0)}</div>
                <span><h2>{post?.creatorName}</h2> <h3>{post.caption} <span id='created-at'>{moment(post.createdAt).fromNow()}</span></h3></span>
            </div>
            {/* <CardMedia className='media-container' component='video' image={post.selectedFile} autoPlay controls /> */}

            <video className='media-container'controls>
	           {/* <source type="video/webm" src="data:video/webm;base64,GkXfowEAAAAAAAAfQoaBAUL3gQFC8......jVOrhB9DtnVTrIMQTPc="/> */}
	            <source type="video/mp4" src={post.selectedFile}/>
            </video>
            <div className='btn-container'>
              {/* <button onClick={() => handleLikeCounts(post._id, post)} className='like-btn' type='button'>
                {(post.likes.includes(localStorageUser?._id) ) ? <BsFillHeartFill className='like-icon' size={20} /> 
                  : <BsHeart className='like-icon' size={20} />}{' '}{post.likes.length}
              </button> */}
              
            <button onClick={(e) => {
              e.target.value = post._id
              const uniqueId = e.target.value
              handleLikeCounts(post._id, uniqueId)
              }} className='like-btn' type='button' disabled={likeDelay}>
                {showAltLike ? (
                <div>
                  {((toggleLike === post._id) ? <BsFillHeartFill className='like-icon' size={20} /> 
                  : <BsHeart className='like-icon' size={20} />)}{' '}{post.likes.includes(localStorageUser?._id) ? post.likes.length - 1 : post.likes.length + 1}
                </div>) :(
                  <div>
                    {(post.likes.includes(localStorageUser?._id) ) ? <BsFillHeartFill className='like-icon' size={20} /> 
                     : <BsHeart className='like-icon' size={20} />}{' '}{post.likes.length}
                  </div>
                )} 
                
              </button>

             <div className='comment-delete-btn-container'>
                <button className='show-comment-btn' type='button' onClick={() => handleShowComment(post?._id)}>
                  <FaRegCommentAlt size={13} />{' '}{post?.comments?.length}{' '}{post?.comments?.length <= 1 ? 'Comment' : 'Comments'}
                </button>
                 { post?.creator === localStorageUser?._id && (
                  <button onClick={() => handleDeletePost(post._id)} className='delete-btn' type='button'>Delete</button>
                ) }
             </div>
            </div>
              
              {(post._id === toggleCommentPage) && (
                <div className={localStorageUser ? 'comment-container' : 'comment-container-2'}>
                  <button className='close-comment-btn' onClick={() => setToggleCommentPage('')} type='button'>
                    <FaTimesCircle size={40} />
                  </button>
                  <div >
                      {localStorageUser? (
                        <div className='comment-form-container'>
                          <form onSubmit={(e) => e.preventDefault()}>
                            <FormInput  type='text' name='comments' value={comment} id='comments'  
                            handleChange={handleChange} 
                            placeholder='Write a Comment'
                            />
                          </form>
                          <button onClick={() => handleSubmit(post._id)} className='send-comment-btn' type='button'><AiOutlineSend size={30}/></button>
                        </div>
                      ): (
                          <h3>Register and/or Login your account to comment on your favorite posts</h3>
                      )}
                  </div>

                  <div className='comments'>
                    
                    {post.comments.map((c, index) =>{
                      return (
                        <div  key={index}>
                          <div className='render-comments'>
                            <div><strong>{c.split(':')[0]}</strong></div>
                            <div className='main-comment'>{c.split(':')[2]}</div>
                          </div>
                          
                            {(c.split(':')[1] === localStorageUser?._id) && (
                              <div className='delete-comment-btn_container'>
                                <button className='delete-comment-btn' onClick={() => handleDeleteComment(post?._id, index)} type='button'>
                                  Delete
                                </button>
                               </div>
                            )}
                        </div>
                      )
                   })}
                  </div>
                </div>
              )}
               
              <hr/>
             
          </div>
        )
      })}
      {!searching && <Pagination />}
      {(searching && posts?.result?.length > 0) && (
        <button onClick={() => dispatch(getPosts())} className='all-posts-btn' type='button'><BsArrowLeft  /> {' '} All Posts</button>
      )}

    {windowSize <= 750 && <Footer />}
    </Wrapper>
  )
};

const Wrapper = styled.div`
width: 70%;
margin-left: 380px;
/* position: relative; */

.all-posts-btn{
  margin: 20px 0 20px 20px;
  height: 40px;
  width: 150px;
  border-radius: 5px;
  background-color: white;
  border: solid #e63295;
  color: #e63295;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}
.comment-container{
  background-color: var(--backgroundColor);
  position: fixed;
  right: 60px;
  left: 475px;
  top: 90px;
  height: 90%;
  border-radius: 10px;
  z-index: 1;
  overflow-y: auto;
  padding: 10px 10px 10px 10px;
}
.comment-container-2{
  background-color: var(--backgroundColor);
  position: fixed;
  right: 60px;
  left: 475px;
  top: 80px;
  height: 90%;
  border-radius: 10px;
  z-index: 1;
  overflow-y: auto;
  padding: 10px 10px 10px 10px;
}
.comment-form-container{
  display: flex;
  margin-bottom: 15px;
}
.send-comment-btn{
  border: none;
  cursor: pointer;
}
.close-comment-btn{
  position: fixed;
  right: 80px;
  top: 95px;
  z-index: 1;
  cursor: pointer;
}
.comments{
  margin-bottom: 20px;
}
.show-comment-btn{
  border: none;
  background-color: white;
  cursor: pointer;
}
.render-comments{
  background-color: white;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  width: fit-content;
}
.main-comment{
  margin-top: -10px;
}
.delete-comment-btn{
  border: none;
  cursor: pointer;
  font-size: 12px;
}
.delete-comment-btn_container{
  margin-top: -10px;
}
.media-container {
  padding: 20px 20px 20px 20px;
  margin: 0 0 50px 100px;
  height: 500px;
  width: 600px;
  border-radius: 30px;
  background-color: black;
}
.post-creator-icon{
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin: 20px 0 0 20px;
  background-color: purple;
  text-align: center;
  color: white;
  font-size: 40px;
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
  cursor: pointer;
  font-size: 17px;

}
.like-icon{
  color: #e63295;
}
.comment-btn{
  
}
.delete-btn{
  background-color: white;
  border: none;
  cursor: pointer;
}
hr{
  margin: 0px 20px 0px 20px;
  background-color: var(--backgroundColor);
  border: none;
  height: 2px;
}
/* .btn-container{
 margin: -40px 120px 20px 120px;
 display: flex;
 justify-content: space-between;
} */
@media (max-width: 1250px) {
    width: 80%;
    margin-left: 300px;
    .comment-container{
      left: 400px ;
      right: 35px;
    }
    .comment-container-2{
      left: 400px ;
      right: 35px;
    }
    .close-comment-btn{
      right: 50px;
    }
  }
@media (max-width: 1150px) {
    width: 80%;
    margin-left: 250px;
     .comment-container{
      left: 300px ;
    }
    .comment-container-2{
      left: 300px ;
    }
  }
@media (max-width: 1100px) {
    width: 80%;
    margin-left: 200px;
    .media-container {
      width: 500px;
    }
    
  }
@media (max-width: 950px) {
    margin-left: 150px;
    .media-container {
      width: 400px;
    }
    .btn-container{
      width: 280px;
    }
     .comment-container{
      left: 267px ;
    }
    .comment-container-2{
      left: 267px ;
    }
    
  }
  @media (max-width: 950px) {
    .media-container {
      width: 300px;
    }
  }
   @media (max-width: 750px) {
    margin-left: 0px;
    /* margin-top: -50px ; */
    width: 100%;
    .media-container{
      width:100%;
      margin-left: 0px;
    }
    .user-caption{
      margin-left: 0px;
    }
    .post-creator-icon{
      height: 40px;
      width: 40px;
      font-size: 25px;
      margin-left: 0px;
    }
    .btn-container{
      width:100%;
      margin-left: 0px;
    }
     .comment-container{
      left: 45px ;
      top: 80px;
    }
    .comment-container-2{
      left: 45px ;
      top: 80px;
    }
    .footer{
      display: block;
    }
    
    
  }
`

export default Posts