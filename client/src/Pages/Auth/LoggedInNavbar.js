import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function LoggedInNavbar() {
  const [isActive, setisActive] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();
  const navigateToHomePage = () => {
    navigate(`/`);
  };
  const navigateToEditPage = () => {
    navigate(`/editProfile`);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    sessionStorage.setItem("isLoggedIn",false);
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    navigate(`/`);
  }
  return (
    <div className='navbar loggedInNavbar'>
      <div className='navbarCon'>
        <img 
          className="Logo"
          src={process.env.PUBLIC_URL + '/Logo.PNG'}
          alt="logo"
          onClick={() => {navigateToHomePage(); setisEdit(false)}}
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
            {userData?.img === "" ? (
              <img
                src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                alt="logo"
                className="ProfileLogo"
                onClick={() => setisEdit(!isEdit)}
              />
            ) : (
              <img src={userData?.img} alt="logo" className="ProfileLogo" onClick={() => setisEdit(!isEdit)}/>
            )}
            <div className='editMenu' style={{display: isEdit ? 'flex' : 'none'}}>
                <button className='editBtn' onClick={() => {navigateToEditPage(); setisEdit(false)}}>Edit Profile</button>
                <button className='editBtn'>Help</button>
                <button className='editBtn' onClick={handleLogout}>Log Out</button>
            </div>
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
