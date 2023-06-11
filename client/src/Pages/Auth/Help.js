import React from 'react';
import LoggedInNavbar from './LoggedInNavbar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function Help() {
    const navigate = useNavigate();
    const login = sessionStorage.getItem("isLoggedIn");
  return (
    <>
    {
        login === 'true' ? <LoggedInNavbar/> : <Navbar/>
    }
    <div className='about policy'>
        <button className="backBtn" onClick={() => navigate(-1)}>
            <HiOutlineArrowNarrowLeft className="icon" />
        </button>
        <div className='mainHeading'>Help Center</div>
        <div className='heading'>Common Questions:</div>
        <div className='detail'>Welcome to our Help Center! We are here to assist you with any questions or concerns you may have. Below are some commonly asked questions and answers that may provide the information you are looking for. If you don't find what you need, please don't hesitate to contact us directly using the provided contact details.</div>
        <ol>
            <li className='info'>How can I navigate through the Blood Management System?</li>
            <ul>
                <li>To navigate through the Blood Management System, you can use the menu options located at the top of the screen. Each menu item corresponds to a different section or functionality within the system. Simply click on the desired menu item to access the corresponding page.</li>
            </ul>
            <li className='info'>How do I create a new user account?</li>
            <ul>
                <li>To create a new user account, click on the "Sign Up" button located on the login page. You will be prompted to provide some necessary information, such as your name, email address, and desired password. Follow the on-screen instructions to complete the account creation process.</li>
            </ul>
            <li className='info'>What should I do if I forget my password?</li>
            <ul>
                <li> If you forget your password, click on the "Forgot Password" link on the login page. You will be prompted to enter your email address associated with your account. Follow the instructions sent to your email to reset your password.</li>
            </ul>
            <li className='info'>How can I update my personal information?</li>
            <ul>
                <li>To update your personal information, log in to your account and navigate to the "Profile" or "Edit Profile" section. There, you will find options to modify your name, contact details, and other relevant information. Make the necessary changes and save them to update your profile.</li>
            </ul>
            <li className='info'>How can I contact support for further assistance?</li>
            <ul>
                <li>If you need further assistance or have specific inquiries, please feel free to reach out to our support team. You can contact us via phone at <span style={{color: 'red'}}>042-2233377 / 042-2233377</span> or email us at <span style={{color: 'red'}}>bloodReservoir@gmail.com</span>. Our dedicated support staff will respond to your inquiries as soon as possible.</li>
            </ul>
        </ol> 
        <div className='detail'>Remember, we are here to help you at every step of your journey with the Blood Management System. If you have any other questions or need assistance with a specific feature, don't hesitate to ask. Your satisfaction is our top priority.</div> 
        <div className='detail'>Thank you for choosing our Blood Management System!</div>
        <div className='detail' style={{color: 'red'}}>Blood Reservoir Management Hospital</div>
    </div>
    </>
  )
}