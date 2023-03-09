import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from './Admin/AdminDashboard';
import EditProfile from './Auth/EditProfile';
import Footer from './Auth/Footer';
import Homepage from './Auth/Homepage';
import LoggedInNavbar from './Auth/LoggedInNavbar';
import LoginPage from './Auth/LoginPage';
import Navbar from './Auth/Navbar';
import Register from './Auth/Register';
import BlooBankContainer from './Blood Bank/BlooBankContainer';
import DonorContainer from './Donor/DonorContainer';

export default function Container() {
  return (
    <div className='container'>
      <Router>
        {/* <Navbar/> */}
        <LoggedInNavbar/>
        <Routes>
          <Route exact path='/' element={<Homepage/>} />
          <Route exact path='/login' element={<LoginPage/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/donorRegistration' element={<DonorContainer/>} />
          <Route exact path='/bankSignup' element={<BlooBankContainer/>} />
          <Route exact path='/editProfile' element={<EditProfile/>} />
          <Route exact path='/adminDashboard' element={<AdminDashboard/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}
