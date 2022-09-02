import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Navigate, useHistory, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ImVideoCamera } from 'react-icons/im';
import { AiOutlinePlus, AiOutlineLogout } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import FormInput from '../components/FormInput';
import { logoutAccount } from '../features/userSlice';




const Navbar = () => {
  const { toggleUser } = useSelector((store) => store.user)
  const getUser = localStorage.getItem('user');
  const localStorageUser = getUser ? JSON.parse(getUser) : null;
  const dispatch = useDispatch;
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () =>{
    dispatch(logoutAccount())
    navigate('/')
    
  }

  //  useEffect(() =>{
  //     navigate('/')
  //   }, [])

  return (
    <Wrapper>
      <div className='navbar-container'>
        <ImVideoCamera size={50} className='logo'/> <span className='logo-text'>TIK VID</span> 
        <input placeholder='' className='input' type='text' /> 
        {/* <FormInput type='text' page='navbar'/> */}
        <div className='btn-container'>
          <Link className='upload-link' to='create-post'><AiOutlinePlus /> Upload</Link>
          {toggleUser || localStorageUser ? (
             (
            <>
            <div className='user-icon'>{localStorageUser?.name.charAt(0)}</div>
            <button className='logout-btn' type='button' onClick={handleLogout}><AiOutlineLogout className='logout-icon' size={20}/></button>
            </>
          )
          ) : (
            <Link className='reg-link' to='register'>Login/Register</Link>
          )}
          </div>
          {/* {toggleUser && <span>Welcome {localStorageUser.name}</span>} */}
      </div>
      <hr />
    </Wrapper>
  )
}

const Wrapper = styled.div`
position: fixed;
right: 0;
left: 0;
top: 0;
z-index: 1;


background-color: white;
margin: -10px -10px 0px -10px;

.input {
    background-color: var(--backgroundColor);
    border: solid var(--backgroundColor);
    width: 300px;
    border-radius: 50px;
    margin-bottom: 10px;
}
.logo-container{
  
}
.logo-text{
  font-size: 20px;
  font-weight: 600;
  margin: 15px 0px 0px -215px;
  color: #e63295;
}
.logo{
  margin: 0px 0px 20px 10px;
  color: #e63295;
}

.navbar-container{
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
}

.btn-container{
  display: flex;
  /* justify-content: space-between; */
}
.user-icon{
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
  background-color: purple;
  color: white;
  text-align: center;
  padding-bottom: 3px;
  font-size: 30px;
  /* padding: 0px 10px 0px 10px; */
}
.logout-btn{
  margin-left: 30px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: solid 2px #91969e;
  background-color: white;
  box-shadow: 3px 3px  3px #91969e;
  cursor: pointer;
}
.logout-icon{
  color: red;
}
.upload-link{
  margin-right: 30px;
  background-color: white;
  border: solid 2px #91969e;
  text-decoration: none;
  color: black;
  font-weight: 500;
  height: 50px;
  width: 100px;
  text-align: center;
  padding-top:10px;
  margin-bottom: 10px;
  border-radius: 10px;

}
.reg-link{
  height: 50px;
  width: 130px;
  border: solid 2px #e63295;
  background-color: #e63295;
  border-radius: 10px;
  text-align: center;
  color: white;
  padding-top: 7px;
  text-decoration: none;
  font-weight: 500;
}
hr{
  margin: 0px 100px 0px 100px;
  background-color: var(--backgroundColor);
  border: none;
  height: 2px;
}

`

export default Navbar