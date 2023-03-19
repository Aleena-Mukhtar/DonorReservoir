import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [btnClick, setBtnClick] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const navigateToEachPatientPage = () => {
    navigate(`/eachPatient`);
  };
  const navigateToEachBankPage = () => {
    navigate(`/eachBank`);
  };
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
              className={btnClick === 1 ? "btn click" : "btn"}
              onClick={navigateToBottleStockPage}
            >
              Details of Bottles
            </button>
            <button
              className={btnClick === 2 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(2)}
            >
              Patient Requests
            </button>
            <button
              className={btnClick === 3 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(3)}
            >
              Blood Bank
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
              <input className="checkbox" type="checkbox"></input>
            </div>
            <select className="select">
              <option>All</option>
              <option>Pending</option>
              <option>Rejected</option>
              <option>Approved</option>
            </select>
          </div>
          <div className="tableCon">
            <table className="table">
              <thead className="tableHeader">
                <th className="headText" align="left">
                  {btnClick === 2
                    ? "Patient Blood Requests"
                    : "Blood Bank Notifications"}
                </th>
              </thead>
              <tbody className="tableBody">
                <tr
                  className="eachRow"
                  onClick={
                    btnClick === 2
                      ? navigateToEachPatientPage
                      : navigateToEachBankPage
                  }
                >
                  <td className="rowText" align="center">
                    <div>
                      {btnClick === 2
                        ? "Patient with ID 123456 Requested for Blood Bottle(s)"
                        : "You got a reply From Aleena Donations Bank"}
                    </div>
                    <div className="detailsCon">
                      <div className="date">20 December, 2022</div>
                      <div className="time">8:50 pm</div>
                    </div>
                  </td>
                </tr>
                <tr
                  className="eachRow"
                  onClick={
                    btnClick === 2
                      ? navigateToEachPatientPage
                      : navigateToEachBankPage
                  }
                >
                  <td className="rowText" align="center">
                    <div>
                      {btnClick === 2
                        ? "Patient with ID 123456 Requested for Blood Bottle(s)"
                        : "You got a reply From Aleena Donations Bank"}
                    </div>
                    <div className="detailsCon">
                      <div className="date">20 December, 2022</div>
                      <div className="time">8:50 pm</div>
                    </div>
                  </td>
                </tr>
                <tr
                  className="eachRow"
                  onClick={
                    btnClick === 2
                      ? navigateToEachPatientPage
                      : navigateToEachBankPage
                  }
                >
                  <td className="rowText" align="center">
                    <div>
                      {btnClick === 2
                        ? "Patient with ID 123456 Requested for Blood Bottle(s)"
                        : "You got a reply From Aleena Donations Bank"}
                    </div>
                    <div className="detailsCon">
                      <div className="date">20 December, 2022</div>
                      <div className="time">8:50 pm</div>
                    </div>
                  </td>
                </tr>
                <tr
                  className="eachRow"
                  onClick={
                    btnClick === 2
                      ? navigateToEachPatientPage
                      : navigateToEachBankPage
                  }
                >
                  <td className="rowText" align="center">
                    <div>
                      {btnClick === 2
                        ? "Patient with ID 123456 Requested for Blood Bottle(s)"
                        : "You got a reply From Aleena Donations Bank"}
                    </div>
                    <div className="detailsCon">
                      <div className="date">20 December, 2022</div>
                      <div className="time">8:50 pm</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
