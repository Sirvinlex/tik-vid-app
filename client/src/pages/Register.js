import React,{ useEffect } from 'react';
import styled from 'styled-components';
import FormInput from '../components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputs, logUser, regUser, registerForm, loginForm } from '../features/userSlice';
import { toast } from 'react-toastify';
import logo from '../logo/logo.png'


const Register = () => {

  const { name, email, password, login, user, loading } = useSelector((store) => store.user)
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
      if(email && password){
        dispatch(logUser({email, password}))
      }else{
        toast.error('Please fill all fields')
      }
       
    }else{
      if(name && email && password){
        dispatch(regUser({name, email, password}))
      }else{
        toast.error('Please fill all fields')
      }
    }
  }
  useEffect(() => {
    if (user.name && user._id) {
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  }, [user, navigate]);
  return (
    <Wrapper>
      <div className='main-div-container'>
        <Link to='/' className='home-btn' >Back to Home</Link>
        <div className='reg-container'>
          <div className='reg-main'>
            <hr />
              <img src={logo} alt='logo' className='logo' height={50} width={150} />
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
                  {loading ? (
                    <button disabled={loading} type='submit' className='reg-btn'>Loading...</button>
                  ) : (
                    <button disabled={loading} type='submit' className='reg-btn'>{login ? 'Login' : 'Register'}</button>
                  )}
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

.reg-main>h1{
  margin: -5px 0 0 150px;
  font-weight: 300;
}
.logo{
  color: #e63295;
  margin-left: 120px;
}
.logo-container{
}
.form{
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto auto;
  grid-row-gap: 15px;

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
@media (max-width: 1100px) {
   .reg-container{
    margin-left:130px;
   }
}
@media (max-width: 1000px) {
   .reg-container{
    margin-left:70px;
   }
}
@media (max-width: 900px) {
   .reg-container{
    margin-left:50px;
   }
   .home-btn{
    margin-left: 50px;
   }
}
@media (max-width: 850px) {
   .reg-container{
    margin-left:20px;
   }
   .home-btn{
    margin-left: 15px;
   }
}

@media (max-width: 850px) {
  .main-div-container{
    flex-direction: column;
    margin-left: 30px;
    width: fit-content;
  }
  .reg-container{
    width: 80vw;
  }
  .home-btn{
    width: 80vw;
    background-color: white;
    color: #e63295;
  }
  .reg-main>h1 {
    margin-left: 220px;
  }
  .logo{
    margin-left: 200px;
  }
  
}
@media (max-width: 750px) {
  .reg-main>h1 {
    margin-left: 170px;
  }
  
  .logo{
    margin-left: 150px;
  }
}
@media (max-width: 600px) {
  .reg-main{
    margin-left: 34px;
  }
  .reg-main>h1 {
    margin-left: 110px;
  }
  
  .logo{
    margin-left: 90px;
  }
}
`

export default Register