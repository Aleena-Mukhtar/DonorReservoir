import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AllDonors from "./AllDonors";
import PatientRequests from "./PatientRequests";
import LoggedInNavbar from "../Auth/LoggedInNavbar";
import AllBloodBanks from "./AllBloodBanks";
import axios from "axios";
import AllPatients from "./AllPatients";

export default function AdminDashboard() {
  const [btnClick, setBtnClick] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [filterNotifications, setFilterNotifications] = useState([]);
  const [filters, setFilters] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    axios(`http://localhost:5000/adminNotification/`)
      .then((data) => {
        console.log(data);
        setFilterNotifications(data.data.filter((el) => el.read));
      })
      .catch((err) => console.log(err));
  }, []);

  const navigateToBottleStockPage = () => {
    navigate(`/bottlesStock`);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    sessionStorage.setItem("isLoggedIn",false);
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    navigate(`/`);
  }
  return (
    <>
    <LoggedInNavbar/>
    <div className="adminDashboard">
      <div className="heading">Admin Dashboard</div>
      <div className="mainContent">
        <div className="leftPanel">
          <div className="BtnDiv">
            <button
              className={btnClick === 0 ? "btn click" : "btn"}
              onClick={navigateToBottleStockPage}
            >
              Bottles Stock
            </button>
            <button
              className={btnClick === 1 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(1)}
            >
              Blood Requests
            </button>
            <button
              className={btnClick === 3 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(3)}
            >
              Donors
            </button>
            <button
              className={btnClick === 4 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(4)}
            >
              Blood Banks
            </button>
            <button
              className={btnClick === 5 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(5)}
            >
              Patients
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
          {
            btnClick === 6 ? null :
            <div className="upperCon">
              <div className="starBtn">
                <div className="text">Starred</div>
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={(e) => setCheck(!check)}
                ></input>
              </div>
              {btnClick === 3 || btnClick === 4 || btnClick === 5 ? null : (
                <select
                  className="select"
                  value={filters}
                  onChange={(e) => setFilters(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Approved">Approved</option>
                </select>
              )}
            </div> 
          }
          <div className="tableCon">
            {btnClick === 1 ? (
              <PatientRequests filters={filters} check={check} />
            ) : btnClick === 3 ? (
              <AllDonors check={check} />
            ) : btnClick === 4 ? (
              <AllBloodBanks check={check} />
            ) : btnClick === 5 ? (
              <AllPatients check={check} />
            ) : null}
          </div>
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
