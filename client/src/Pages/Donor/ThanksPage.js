import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function ThanksPage() {
    const navigate = useNavigate();
    const navigateToHomePage = () => {
        navigate(`/`);
    };
  return (
    <div className='thanksPage'>
        <div className='MainContent'>
            <img className="MainPicture" src={process.env.PUBLIC_URL + '/MainImage.jpg'} alt="logo" />
            <div className='FormContent'>
                <BsCheckCircle className='icon'/>
                <div className='Msg'>Thank you!</div>
                <div className='details'>We are grateful for your help</div>
                <div className='more'>We’ll notify you soon about the details</div>
                <button className='Btn' onClick={navigateToHomePage}>Back to homepage</button>
            </div>
        </div>
    </div>
  )
}
