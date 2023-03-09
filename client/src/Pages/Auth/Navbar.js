import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isActive, setisActive] = useState(false);
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate(`/login`);
  };
  const navigateToHomePage = () => {
    navigate(`/`);
  };
  const navigateToRegister = () => {
    navigate(`/register`);
  };
  return (
    <div className='navbar'>
      <div className='navbarCon'>
        <img 
          className="Logo" 
          src={process.env.PUBLIC_URL + '/Logo.PNG'} 
          alt="logo"
          onClick={navigateToHomePage}
        /> 
        <form className='SearchCon'>
          <input className='input' placeholder='Search By Blood Group'/>
          <button type="submit" className='searchBtn'>
            <BiSearch className='icon'/>
          </button>
        </form>
        <div className='BtnCon'>
          <button className='search btn' onClick={() => setisActive(!isActive)}>
            <BiSearch className='icon'/>
          </button>
          <button className='btn' onClick={navigateToLoginPage}>Login</button>
          <button className='btn' onClick={navigateToRegister}>Register</button>
        </div>
      </div>
      <form className={isActive ? 'mobileSearch mobile' : 'mobileSearch'}>
        <input className='input' placeholder='Search By Blood Group'/>
        <button type="submit" className='searchBtn'>
          <BiSearch className='icon'/>
        </button>
      </form>
    </div>
  )
}
