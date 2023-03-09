import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate(`/login`);
  };
  const navigateToBankTermsPage = () => {
    navigate(`/bankSignup`);
  };
  const navigateToDonorTermsPage = () => {
    navigate(`/donorRegistration`);
  };
  return (
    <div className='homepage'>
      <div className='MainCon'>
        <img className="MainPicture" src={process.env.PUBLIC_URL + '/MainImage.jpg'} alt="logo" />
        <div className='DetailDiv'>
          <div className='heading'>GIVE SOMEONE A GIFT OF LIFE</div>
          <div className='detail'>Every other day people are in rare need of blood in emergencies. We provide you ease as much as possible so you don’t have to worry at that already stressful time.</div>
          <button className='learnBtn'>
            LEARN MORE
            <BsArrowRight className='icon'/>
          </button>
        </div>
      </div>
      <div className='BankCon'>
        <div className='heading'>BECOME A PART OF US</div>
        <div className='detail'>Join us as Blood Bank for providing blood and become the part of our community </div>
        <button className='Btn' onClick={navigateToBankTermsPage}>Coordinate as Blood Bank</button>
      </div>
      <div className='adminCon'>
        <img className="AdminPicture" src={process.env.PUBLIC_URL + '/AdminImage.jpg'} alt="logo" />
        <div className='DetailCon'>
          <div className='text'>
            <ul>
              <li>Register yourself as an Admin using an email provided by hospital.</li>
              <li>After registering yourself as an admin, you have certain responsibilities and rules & regulations that you have to follow.</li>
              <li>Make sure that an email address that you'll provide for signup, should be valid because we'll send a verification code on that email. Without that code you won't be able to signup.</li>
            </ul>
          </div>
          <div className='AdminBtnCon'>
            <button className='Btn' onClick={navigateToLoginPage}>Login as Admin</button>
          </div>
        </div>
      </div>
      <div className='adminCon donorCon'>
        <div className='DetailCon'>
          <div className='text'>
            <ul>
              <li>Register yourself as donor for helping patient in time of need.</li>
              <li>We'll send an email or call you when we need blood in emergency situations. So, please provide a valid phone number or email address.</li>
              <li>So, GO AHEAD and become someone's hope in time of need and save lives.</li>
            </ul>
          </div>
          <div className='AdminBtnCon'>
            <button className='Btn' onClick={navigateToDonorTermsPage}>Register Yourself as Donor</button>
          </div>
        </div>
        <img className="AdminPicture" src={process.env.PUBLIC_URL + '/DonorImage.jpg'} alt="logo" />
      </div>
      <div className='adminCon patientCon'>
        <img className="AdminPicture" src={process.env.PUBLIC_URL + '/PatientImage.jpg'} alt="logo" />
        <div className='DetailCon'>
          <div className='text'>
            <ul>
              <li>Need blood bottles? Click "Sign Up as a patient" for signing up as patient and make request for that.</li>
              <li>After making request, it will entertain first in any case and bottle will be given to you.</li>
              <li>By this you don't have to wait or move door to door for blood bottles in time of need and you will get that from same hospital.</li>
              <li>On the basis of this reciept will be generated and given to you.</li>
            </ul>
          </div>
          <div className='AdminBtnCon'>
            <button className='Btn'>Sign Up as Patient</button>
          </div>
        </div>
      </div>
    </div>
  )
}
