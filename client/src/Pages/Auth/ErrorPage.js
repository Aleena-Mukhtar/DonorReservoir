import React from 'react';
import LoggedInNavbar from './LoggedInNavbar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function ErrorPage() {
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
        <div className='mainHeading'>404 Page - Page Not Found</div>
        <div className='detail'>Oops! It seems like you've reached a dead end. The page you are looking for cannot be found. Don't worry; we're here to help you get back on track. Here are a few things you can try:</div>
        <ol>
            <li className='info'>Double-check the URL: </li>
            <ul>
                <li>Please ensure that you have entered the correct web address. A small mistake in typing the URL could lead to this error. Verify the spelling, capitalization, and punctuation, and try again.</li>
            </ul>
            <li className='info'>Go back to the previous page:</li>
            <ul>
                <li>You can use your browser's back button to return to the previous page and continue your browsing experience.</li>
            </ul>
            <li className='info'>Visit our Homepage: </li>
            <ul>
                <li> If you're not sure where to go or what you're looking for, you can always start fresh by visiting our homepage. There, you'll find links to various sections and features of our website.</li>
            </ul>
            <li className='info'>Contact Us: </li>
            <ul>
                <li> If you believe this is an error or you need further assistance, please feel free to contact our support team. We are available to help you and address any concerns you may have. You can reach us via phone a <span style={{color: 'red'}}>042-2233377 / 042-2233377</span> or email us at <span style={{color: 'red'}}>bloodReservoir@gmail.com</span>.</li>
            </ul>
        </ol> 
        <div className='detail'>We apologize for any inconvenience this may have caused. Our team is constantly working to improve our website and ensure a smooth browsing experience for all our visitors. Thank you for your understanding.</div> 
        <div className='detail' style={{color: 'red'}}>Blood Reservoir Management Hospital</div>
    </div>
    </>
  )
}