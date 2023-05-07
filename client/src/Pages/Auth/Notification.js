import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoggedInNavbar from './LoggedInNavbar';
import { useParams } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Notification() {
    const { id } = useParams();
    const [notification, setNotification] = useState({});
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const navigate = useNavigate();
    useEffect(() => {
        axios(`http://localhost:5000/bankNotification/${id}`)
          .then((data) => {
            console.log(data);
            setNotification(data.data);
          })
          .catch((err) => console.log(err));
    }, []);
  return (
    <>
    <LoggedInNavbar/>
    <div className='notification'>
        <button className="backBtn" onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft className="icon" />
        </button>
        <div className='heading'>Email</div>
        <div className='mainCon'>
            <div className='intro'>To: <span>{notification?.bankName}</span></div>
            <div className='intro'>From: <span>{notification?.hospitalName}</span></div>
            <div className='intro'>Date: <span>{new Date(notification?.createdAt?.toString()).toDateString()}</span></div>
            <div className='intro'>Subject: <span>Urgent Request for 10 Bottles of {notification?.bloodType} Blood</span></div>
            <div className='intro1'>Dear {notification?.bankName} Team,</div>
            <div className='body'>I am writing on behalf of {notification?.hospitalName} to request {notification?.count} bottles of {notification?.bloodType} blood for a critically ill patient, in {notification?.days} day, who requires an immediate transfusion. We have exhausted our current stock and urgently need additional units to ensure the patient receives the care they need.We understand the importance of a timely response in situations like this and kindly request that you prioritize this request. If you have any questions or concerns, please do not hesitate to contact us.Thank you for your prompt attention to this matter. We appreciate your assistance in helping us provide the best possible care to our patients.</div>
            <div className='intro1'>Sincerely,</div>
            <div className='intro1'>{userData?.fname} {userData?.lname}</div>
            <div className='intro1'>Urgent Request for 10 Bottles of {notification?.bloodType} Blood</div>
            <img
              src={process.env.PUBLIC_URL + "/signature.png"}
              alt="logo"
              className="signature"
            />
            <div className='intro1'>{notification?.hospitalName}</div>
        </div>
    </div>
    </>
  )
}
