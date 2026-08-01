import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard";
import BottleDetails from "./Admin/BottleDetails";
import EachPatientRequest from "./Admin/EachPatientRequest";
import EditProfile from "./Auth/EditProfile";
import Footer from "./Auth/Footer";
import Homepage from "./Auth/Homepage";
import LoginPage from "./Auth/LoginPage";
import Register from "./Auth/Register";
import BlooBankContainer from "./BloodBank/wizard/BlooBankContainer";
import BloodBankDashboard from "./BloodBank/BloodBankDashboard";
import DonorContainer from "./Donor/wizard/DonorContainer";
import EachDonor from "./Admin/EachDonor";
import EachBloodBank from "./Admin/EachBloodBank";
import FilterBanks from "./Admin/FilterBanks";
import BankNotifications from "./BloodBank/BankNotifications";
import AdminNotifications from "./Admin/AdminNotifications";
import Inbox from "./Auth/Inbox";
import Notification from "./Auth/Notification";
import Reply from "./Auth/Reply";
import Invoice from "./BloodBank/Invoice";
import EachShipment from "./BloodBank/EachShipment";
import PatientContainer from "./Patient/wizard/PatientContainer";
import PatientDashboard from "./Patient/PatientDashboard";
import EachPatient from "./Admin/EachPatient";
import FilterDonors from "./Admin/FilterDonors";
import About from "./Auth/About";
import Policy from "./Auth/Policy";
import Help from "./Auth/Help";
import ErrorPage from "./Auth/ErrorPage";

export default function Container() {
  const[login] = useState(sessionStorage.getItem("isLoggedIn") === "true" ? true : false);
  console.log(sessionStorage.getItem("isLoggedIn"));
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route 
            exact 
            path="/" 
            element={<Homepage />} 
          />
          <Route 
            exact 
            path="/login" 
            element={<LoginPage />} 
          />
          <Route 
            exact 
            path="/register" 
            element={<Register />} 
          />
          <Route 
            exact 
            path="/donorRegistration" 
            element={<DonorContainer />} 
          />
          <Route 
            exact 
            path="/bankSignup" 
            element={<BlooBankContainer />} 
          />
          <Route 
            exact 
            path="/editProfile" 
            element={login ? <EditProfile /> : <ErrorPage/>} 
          />
          <Route 
            exact 
            path="/adminDashboard" 
            element={login ? <AdminDashboard /> : <ErrorPage/>} 
          />
          <Route 
            exact 
            path="/eachRequest/:id" 
            element={login ? <EachPatientRequest /> : <ErrorPage/>} 
          />
          <Route 
            exact 
            path="/bottlesStock" 
            element={login ? <BottleDetails /> : <ErrorPage/>} 
          />
          <Route
            exact
            path="/bloodBankDashboard"
            element={login ? <BloodBankDashboard /> : <ErrorPage/>}
          />
          <Route
            exact
            path="/eachDonor/:id"
            element={login ? <EachDonor /> : <ErrorPage/>}
          />
          <Route
            exact
            path="/eachPatient/:id"
            element={login ? <EachPatient /> : <ErrorPage/>}
          />
          <Route
            exact
            path="/eachBank/:id"
            element={login ? <EachBloodBank /> : <ErrorPage/>}
          />
          <Route
            exact
            path="/filterBank/:type/:ID"
            element={login ? <FilterBanks /> : <ErrorPage/>}
          />
          <Route
            exact
            path="/bankNotifications"
            element={login ? <BankNotifications /> : <ErrorPage/>}
          />
          <Route
            exact
            path="/adminNotifications"
            element={login ? <AdminNotifications /> : <ErrorPage/>}
          />
          <Route
            exact
            path="/inbox"
            element={login ? <Inbox/> : <ErrorPage/>}
          />
          <Route
            exact
            path="/inbox/:id"
            element={login ? <Notification/> : <ErrorPage/>}
          />
          <Route
            exact
            path="/reply/:id"
            element={login ? <Reply/> : <ErrorPage/>}
          />
          <Route
            exact
            path="/invoice/:id"
            element={login ? <Invoice/> : <ErrorPage/>}
          />
          <Route
            exact
            path="/shipment/:id"
            element={login ? <EachShipment/> : <ErrorPage/>}
          />
          <Route 
            exact 
            path="/patientSignup" 
            element={<PatientContainer />} 
          />
          <Route
            exact
            path="/patientDashboard"
            element={login ? <PatientDashboard /> : <ErrorPage/>}
          />
          <Route
            exact
            path="/filterDonor/:id/:type"
            element={login ? <FilterDonors /> : <ErrorPage/>}
          />
          <Route
            exact
            path="/aboutUs"
            element={<About />}
          />
          <Route
            exact
            path="/PrivacyPolicy"
            element={<Policy />}
          />
          <Route
            exact
            path="/help"
            element={<Help />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
