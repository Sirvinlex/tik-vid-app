import React, {useState} from 'react';
import { Link,  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineLogout } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { logoutAccount } from '../features/userSlice';
import { getPostsBySearch, } from '../features/createPostSlice';
import { handleMainSearchInput, resetCategory, resetSearch } from '../features/searchSlice';
import logo from '../logo/logo.png'



const Navbar = () => {
  const getUser = localStorage.getItem('user');
  const localStorageUser = getUser ? JSON.parse(getUser) : null;
  const { toggleUser } = useSelector((store) => store.user)
  const { windowSize } = useSelector((store) => store.search);
  const [popUp, setPopUp] = useState(false);

  let { search, category } = useSelector((store) => store.search)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () =>{
    dispatch(logoutAccount());
    setPopUp(false);
    navigate('/')
  }

  const handleUpload = () =>{
    if(localStorageUser){
      navigate('/create-post');
    }else{
      toast.warning('Register and/or Login to create a post')
    }
  }

 const handleChange = (e) =>{
  const value = e.target.value;
  dispatch(handleMainSearchInput(value));
 };

 const handleSearch = () =>{
  if(search.trim() || category){
    dispatch(getPostsBySearch({search, category}));
    dispatch(resetSearch());
    dispatch(resetCategory());
  }else{
    navigate('/');
  }
 };

  return (
    <Wrapper>
      <div className='navbar-container'>
        <img src={logo} alt='logo' className='logo' height={50} width={150} />
        <div>
          <input placeholder='Search Post' type='text' value={search} onChange={handleChange} />
          <button className='search-btn' onClick={handleSearch} type='button'>{windowSize <= 500 ? <BsSearch /> : 'Search'}</button>
        </div> 
        
        <div className='user-btn-container'>
          <div className='btn-container'>
            {(localStorageUser || toggleUser || (windowSize > 750)) && (
              <button className='upload-btn' type='button' onClick={handleUpload} >
              <AiOutlinePlus />Upload
            </button>
            )}
            {(localStorageUser || toggleUser) ? (
              (
              <>
                {(localStorageUser && (windowSize >= 750)) && <div className='user-icon'>{localStorageUser?.name.charAt(0)}</div>}
                {(localStorageUser && (windowSize >= 750)) && <button className='logout-btn' type='button' onClick={handleLogout}><AiOutlineLogout className='logout-icon' size={20}/></button>}
                {(localStorageUser && (windowSize < 750)) && <FaUserCircle size={35} onClick={() =>setPopUp((initialValue)=> !initialValue)} className='user' />}
              </>
            )
            ) : (
              <Link className='reg-link' to='register'>Login/Register</Link>
            )}
          </div>
          {(localStorageUser && (windowSize >= 750)) &&  <div className='user'><FaUserCircle />{' '} {localStorageUser.name}</div>}
          {popUp && (
            <div className='user-pop-up'>
              {localStorageUser  &&  <div className='pop-up-user'><FaUserCircle size={20} />{' '} {localStorageUser.name}</div>}
              {localStorageUser && <button className='logout-btn' type='button' onClick={handleLogout}>Logout</button>}
          </div>
          )}
        </div>
          
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

input {
    background-color: var(--backgroundColor);
    border: solid var(--backgroundColor);
    width: 300px;
    height: 40px;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    margin-bottom: 10px;
    text-align: center;
}
::-webkit-input-placeholder {
  text-align: center;
}

:-moz-placeholder {
  text-align: center;
}
.search-btn{
  height: 40px;
  width: 100px;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  border: none;
  color: white;
  background-color: #e63295;
  cursor: pointer;
  
}
.logo-text{
  font-size: 20px;
  font-weight: 600;
  margin: 15px 0px 0px -215px;
  color: #e63295;
}
.logo{
  margin: 0px 0px 20px 10px;
}

.navbar-container{
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
}
.user-btn-container{
  display: flex;
  flex-direction: column;
}
.user{
  margin-top: -7px;
  font-size: 15px;
  font-weight: 600;
}
.btn-container{
  display: flex;
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
.upload-btn{
  margin-right: 30px;
  background-color: white;
  border: solid 2px #91969e;
  text-decoration: none;
  color: black;
  font-weight: 500;
  font-size: 16px;
  height: 50px;
  width: 100px;
  text-align: center;
  padding-top:5px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
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
@media (max-width: 900px) {
  .search-btn{
    width: 80px;
  }
  input{
    width: 200px;
  }
}
@media (max-width: 750px) {
  height: 120px;

  .logo{
    width: 100px;
    height: 40px;
  }
  .user{
    margin-top: 5px;
    margin-right: 10px;
    cursor: pointer;
  }
  .user-pop-up{
    position: absolute;
    top: 65px;
    right: 15px;
    z-index: 1;
    height: 100px;
    width: 250px;
    background-color:var(--backgroundColor);
    border-radius: 10px;
  }
  .pop-up-user{
    margin-left: 10px;
    margin-top: 5px;
  }
  .logout-btn{
    border: none;
    background-color: inherit;
    box-shadow: none;
    margin-left: 10px;
    font-size: 18px;
  }
}
@media (max-width: 650px) {
  .search-btn{
    width: 50px;
  }
  input{
    width: 150px;
  }
  .reg-link{
    width: 100px;
    font-size: 13px;
    height: 40px;
  }
  .upload-btn{
    width: 60px;
    height: 40px;
    font-size: 12px;
  }
  
}
@media (max-width: 650px) {
  .search-btn{
    width: 50px;
  }
  input{
    width: 100px;
  }
}
@media (max-width: 500px) {
  .logo{
    width: 80px;
    height: 30px;
  }
  .search-btn{
    width: 50px;
    height: 30px;
  }
  input{
    width: 100px;
    height: 30px;
  }
  .upload-btn{
    margin-right: 7px;
  }
}

`

export default Navbar