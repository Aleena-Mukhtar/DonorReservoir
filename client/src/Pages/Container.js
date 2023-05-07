import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard";
import BottleDetails from "./Admin/BottleDetails";
import EachBankReply from "./Admin/EachBankReply";
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

export default function Container() {
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
            element={<EditProfile />} 
          />
          <Route 
            exact 
            path="/adminDashboard" 
            element={<AdminDashboard />} 
          />
          <Route 
            exact 
            path="/eachPatient" 
            element={<EachPatientRequest />} 
          />
          <Route 
            exact 
            path="/eachBank" 
            element={<EachBankReply />} 
          />
          <Route 
            exact 
            path="/bottlesStock" 
            element={<BottleDetails />} 
          />
          <Route
            exact
            path="/bloodBankDashboard"
            element={<BloodBankDashboard />}
          />
          <Route
            exact
            path="/eachDonor/:id"
            element={<EachDonor />}
          />
          <Route
            exact
            path="/eachBank/:id"
            element={<EachBloodBank />}
          />
          <Route
            exact
            path="/filterBank/:type/:ID"
            element={<FilterBanks />}
          />
          <Route
            exact
            path="/bankNotifications"
            element={<BankNotifications />}
          />
          <Route
            exact
            path="/adminNotifications"
            element={<AdminNotifications />}
          />
          <Route
            exact
            path="/inbox"
            element={<Inbox/>}
          />
          <Route
            exact
            path="/inbox/:id"
            element={<Notification/>}
          />
          <Route
            exact
            path="/reply/:id"
            element={<Reply/>}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
