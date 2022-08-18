import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const Navbar = () => {
  return (
    <Wrapper>
      <div className='navbar-container'>
        <img className='logo-img' src='https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png' alt='logo' />
        <input placeholder='' className='input' type='text' onChange='' />
        <div className='btn-container'>
          <Link className='upload-link' to='create-post'>Upload</Link>
          <img className='user-img' src='https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png' alt='user-image' />
          <button className='logout-btn' type='button' onClick=''>Log</button>
        </div>
      </div>
      <hr />
    </Wrapper>
  )
}

const Wrapper = styled.div`
background-color: white;
margin: -10px -10px 0px -10px;
.logo-img{
  height: 40px;
  width: 100px;
}

.navbar-container{
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
}
.input{
  background-color:  var(--backgroundColor);
  border: solid  var(--backgroundColor);
  width: 300px;
  border-radius: 50px;
  margin-bottom: 10px;
}
.btn-container{
  display: flex;
  /* justify-content: space-between; */
}
.user-img{
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
  /* padding: 0px 10px 0px 10px; */
}
.logout-btn{
  margin-left: 30px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.upload-link{
  margin-right: 30px;
  background-color: white;
  border: solid 2px #91969e;
  text-decoration: none;
  color: #91969e;
  height: 50px;
  width: 100px;
  text-align: center;
  padding-top:10px;
  margin-bottom: 10px;

}
hr{
  margin: 0px 100px 0px 100px;
  background-color: var(--backgroundColor);
  border: none;
  height: 2px;
}

`

export default Navbar