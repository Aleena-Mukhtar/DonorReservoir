import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AllDonors from "./AllDonors";
import BankReplies from "./BankReplies";
import PatientRequests from "./PatientRequests";

export default function AdminDashboard() {
  const [btnClick, setBtnClick] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [filters, setFilters] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // get data
  }, []);
  const navigateToBottleStockPage = () => {
    navigate(`/bottlesStock`);
  };
  return (
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
              Patient Requests
            </button>
            <button
              className={btnClick === 2 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(2)}
            >
              Blood Bank
            </button>
            <button
              className={btnClick === 3 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(3)}
            >
              Donors
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
          <div className="upperCon">
            <div className="starBtn">
              <div className="text">Starred</div>
              <input
                className="checkbox"
                type="checkbox"
                onChange={(e) => setCheck(!check)}
              ></input>
            </div>
            {btnClick === 3 ? null : (
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
          <div className="tableCon">
            {btnClick === 1 ? (
              <PatientRequests filters={filters} check={check} />
            ) : btnClick === 2 ? (
              <BankReplies filters={filters} check={check} />
            ) : btnClick === 3 ? (
              <AllDonors check={check} />
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
            <button className="okBtn">OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
