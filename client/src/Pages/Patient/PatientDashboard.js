import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import LoggedInNavabr from '../Auth/LoggedInNavbar';
import axios from "axios";
import BloodRequest from "./BloodRequest";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [btnClick, setBtnClick] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axios(`http://localhost:5000/bloodRequest/`)
      .then((data) => {
        console.log(data);
        setHistory(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    sessionStorage.setItem("isLoggedIn",false);
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    navigate(`/`);
  }

  return (
    <>
    <LoggedInNavabr/>
    <div className="adminDashboard bloodBankDashboard patientDashboard">
      <div className="heading">Blood Bank Dashboard</div>
      <div className="mainContent">
        <div className="leftPanel">
          <div className="BtnDiv">
            <button
              className={btnClick === 1 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(1)}
            >
              Inbox
            </button>
            <button
              className={btnClick === 2 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(2)}
            >
              Make Request
            </button>
          </div>
          <button
            className="logoutBtn"
            onClick={(e) => setShowModal(!showModal)}
          >
            <AiOutlineLogout className="icon" />
            <div className="label">Log Out</div>
          </button>
        </div>
        <div className="rightPanel">
          {btnClick === 1 ?
            (
              <div className='mainContainer'>
                {history.map((ele, index) => (
                  <div className='innerCon' key={index}>
                    <div className='con1'>
                      <div className='inner1'>
                        <div 
                          className='header'
                          style={{fontWeight: ele.read ? 'normal' : 'bold'}}
                        >
                        {
                          ele.read ? <HiOutlineMailOpen className='mailIcon' color='green'/> : <HiOutlineMail className='mailIcon'/>
                        }
                        To: {ele.hospitalName} for {ele.bloodType}
                      </div>
                      <div 
                        className='date' 
                        style={{fontWeight: ele.read ? 'normal' : 'bold'}}
                      >
                        {new Date(ele?.createdAt.toString()).toDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            ) : 
            btnClick === 2 ? <BloodRequest/> :
            null}
        </div>
      </div>
      <div
        className="logoutModal"
        style={{ display: showModal ? "flex" : "none" }}
        onClick={(e) => setShowModal(false)}
      >
        <div className="logout">
          <div className="modalHeading">Confirm Logout</div>
          <div className="innerHeading">Are you sure you want to logout?</div>
          <div className="btnCon">
            <button className="cancelBtn" onClick={(e) => setShowModal(false)}>
              Cancel
            </button>
            <button className="okBtn" onClick={handleLogout}>OK</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}