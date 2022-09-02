import React from 'react';
import styled from 'styled-components';
import {ImVideoCamera} from 'react-icons/im'
import FormInput from '../components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputs, logUser, regUser, registerForm, loginForm } from '../features/userSlice';




const Register = () => {
  const { name, email, password, login } = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleLogin = () =>{
    if(login){
      dispatch(registerForm());
    }else{
      dispatch(loginForm());
    }
  };

  const handleChange = (e) =>{
    const value = e.target.value;
    const name = e.target.name;
    dispatch(handleInputs({value, name}))
  };
  const handleSubmit = (e) =>{
    e.preventDefault();

    if(login){
       dispatch(logUser({email, password}))
       navigate('/')
    }else{
      dispatch(regUser({name, email, password}))
    }
    // login ? (
    //   dispatch(logUser({email, password}))
    //   navigate('/')
    // ) : (
    //   dispatch(regUser({name, email, password}))
    // )
    
  }
  return (
    <Wrapper>
      <div className='main-div-container'>
        <Link to='/' className='home-btn' >Back to home</Link>
        <div className='reg-container'>
          <div><h3></h3></div>
          <div className='reg-main'>
            <hr />
              <ImVideoCamera size={50} className='logo'/> <span className='logo-text'>TIK VID</span>
              <h1>{login ? 'Login' : 'Register'}</h1>
              <div className='form-container'>
                <form onSubmit={handleSubmit} className='form'>
                  {login ? (
                    <>
                    <FormInput  type='email' name='email' value={email} id='email' labelText='Email' handleChange={handleChange} />
                    <FormInput  type='password' name='password' value={password} id='password' labelText='Password' handleChange={handleChange} />
                    </>
                  ) : (
                    <>
                    <FormInput  type='text' name='name' value={name} id='name' labelText='Full Name' handleChange={handleChange} />
                    <FormInput  type='email' name='email' value={email} id='email' labelText='Email' handleChange={handleChange} />
                    <FormInput  type='password' name='password' value={password} id='password' labelText='Password' handleChange={handleChange} />
                    </>
                  )}
                  <button type='submit' className='reg-btn'>{login ? 'Login' : 'Register'}</button>
                  <p>
                    {login ? "Don't have an account?" : "Already have an account?"} <span></span>
                    <button className='toggle-btn' type='button' onClick={handleToggleLogin}>{!login? 'Login' : 'Register'}</button>
                  </p>
                </form>
              </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
background-color: var(--backgroundColor);
z-index: 2;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
.main-div-container{
  display: flex;
}
.home-btn{
  margin: 45px 0px 0px 80px;
  height: 40px;
  width: 150px;
  border-radius: 5px;
  background-color: #e63295; 
  border: solid 2px #e63295;
  color: white;
  cursor: pointer; 
  text-decoration: none;
  text-align: center;
  padding-top: 4px;
}
.home-btn-container{
  
  
}
.reg-container{
  margin: 50px 0px 0px 215px;
  width: 500px;
  background-color: white;
  height: 100vh;
  border-radius: 10px;
}
.reg-main{
  /* margin: 50px 0px 50px 100px; */
  /* margin-top: 50px; */
  margin-left: 55px;
  margin-top: 50px;
  width: 80%;
  height: 80vh;
  background-color: white;
  box-shadow: 3px 3px  3px 3px var(--backgroundColor);
  border-radius: 10px;
}
.reg-container h3{
  height: 5px;
  
}
hr{
  background-color: #e63295;
  border: none;
  height: 5px;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
}
.logo-text{
  font-size: 20px;
  font-weight: 600;
  /* margin-top: -30px; */
  /* margin: 15px 0px 0px -215px; */
  color: #e63295;
  padding-bottom: 20px;
}
.reg-main>h1{
  margin: -5px 0 0 150px;
  font-weight: 300;
}
.logo{
  /* margin: 0px 0px 20px 10px; */
  color: #e63295;
  margin-left: 150px;
  /* margin-top: 100px; */
}
.logo-container{
  /* margin: 20px 0 0 150px; */
}
.form{
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto auto;
  grid-row-gap: 15px;

  /* flex-direction: column; */
  
}
.form-container{
  padding: 0 15px 0 15px;
}
.reg-btn{
  height: 40px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #e63295;
  border: none ;
  color: white;
  cursor: pointer;
}
.toggle-btn{
  height: 40px;
  background-color: inherit;
  border: none ;
  color: #e63295;
  cursor: pointer;
}

`

export default Register