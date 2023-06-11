import React from 'react';
import { RiAdminLine, RiUserLocationLine } from 'react-icons/ri';
import { BiDonateBlood } from 'react-icons/bi';
import { MdOutlineBloodtype } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate(`/login`);
  };
  const navigateToDonorTermsPage = () => {
    navigate(`/donorRegistration`);
  };
  const navigateToBankTermsPage = () => {
    navigate(`/bankSignup`);
  };
  const navigateToPatientTermsPage = () => {
    navigate(`/patientSignup`);
  };
  return (
    <div className='register'>
        <div className='mainContent'>
            <div className='headingCon'>
                <div className='header'>Sign up to</div>
                <div className='mainHeading'>Blood Reservoir</div>
            </div>
            <button className='signinBtn' onClick={navigateToLoginPage}>
                <RiAdminLine className='icon'/>
                Login as an Admin
            </button>
            <button className='signinBtn' onClick={navigateToPatientTermsPage}>
                <RiUserLocationLine className='icon'/>
                Sign up as Patient
            </button>
            
            <button className='signinBtn' onClick={navigateToBankTermsPage}>
                <MdOutlineBloodtype className='icon'/>
                Sign up as Blood Bank
            </button>
            <button className='signinBtn' onClick={navigateToDonorTermsPage}>
                <BiDonateBlood className='icon'/>
                Register Yourself as Donor
            </button>
            <div className='text'>Already have an account?
                <Link to='/login' className='link'>Log in</Link>
            </div>
        </div>
    </div>
  )
}
