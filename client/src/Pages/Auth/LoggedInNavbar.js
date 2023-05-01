import React, { useState, useEffect } from 'react';
import { BiSearch, BiBell } from 'react-icons/bi';
import { MdOutlineMailOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { GoPrimitiveDot } from 'react-icons/go';
import axios from "axios";

export default function LoggedInNavbar() {
  const [isActive, setisActive] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [filterNotifications, setFilterNotifications] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    let url;
    if(role === "Blood Bank") url = `http://localhost:5000/bankNotification/`;
    else if(role === "Admin") url = `http://localhost:5000/adminNotification/`;
    axios(url)
      .then((data) => {
        console.log(data);
        setFilterNotifications(data.data.filter(el => !el.read));
      })
      .catch((err) => console.log(err));
  }, []);
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
  const handleClick = () => {
    if(role === "Blood Bank") navigate('/bankNotifications');
    else if(role === "Admin") navigate('/adminNotifications');
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
            <button className='notificationBtn' onClick={handleClick}>
              <MdOutlineMailOutline className='icon'/>
              {filterNotifications.length === 0 ? null : <GoPrimitiveDot className="dotIcon"/>}
            </button>
            <button className='notificationBtn' onClick={handleClick}>
              <BiBell className='icon'/>
              {filterNotifications.length === 0 ? null : <GoPrimitiveDot className="dotIcon"/>}
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
