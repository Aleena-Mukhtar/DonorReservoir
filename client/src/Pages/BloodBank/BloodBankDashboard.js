import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import LoggedInNavabr from '../Auth/LoggedInNavbar';
import BankNotifications from "./BankNotifications";
import { GoPrimitiveDot } from 'react-icons/go';
import axios from "axios";

export default function BloodBankDashboard() {
  const navigate = useNavigate();
  const [btnClick, setBtnClick] = useState(1);
  const [showModal, setShowModal] = useState(false);
  // const [filterNotifications, setFilterNotifications] = useState([]);
  const [history, setHistory] = useState([1, 2, 3, 5, 6, 7]); //isko empty array krna ha example k liy 123 likha ha
  useEffect(() => {
    // axios(`http://localhost:5000/bankNotification/`)
    //   .then((data) => {
    //     console.log(data);
    //     setFilterNotifications(data.data.filter((el) => el.read));
    //   })
    //   .catch((err) => console.log(err));
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
    <div className="adminDashboard bloodBankDashboard">
      <div className="heading">Blood Bank Dashboard</div>
      <div className="mainContent">
        <div className="leftPanel">
          <div className="BtnDiv">
            {/* <div className="NotificationDiv">
              <button
                className={btnClick === 1 ? "btn click" : "btn"}
                onClick={(e) => setBtnClick(1)}
              >
                Notifications
              </button>
              {filterNotifications ? <GoPrimitiveDot className="icon"/> : null}
            </div> */}
            <button
              className={btnClick === 2 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(2)}
            >
              History
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
          <div className="tableCon">
            {btnClick === 1 ? null
            : (
              <table className="table">
                <thead className="tableHeader">
                  <th className="headText" align="center">
                    Hospital Name
                  </th>
                  <th className="headText" align="center">
                    Blood Type
                  </th>
                  <th className="headText" align="center">
                    Quantity
                  </th>
                  <th className="headText" align="center">
                    Date
                  </th>
                  <th className="headText" align="center">
                    Time
                  </th>
                  <th className="headText" align="center">
                    Total Price (Rupees)
                  </th>
                </thead>
                <tbody className="tableBody">
                  {history.map((el) => (
                    <tr className="eachRow1">
                      <td className="rowText" align="center">
                        National Hospital
                      </td>
                      <td className="rowText" align="center">
                        B+
                      </td>
                      <td className="rowText" align="center">
                        5
                      </td>
                      <td className="rowText" align="center">
                        22 December, 2022
                      </td>
                      <td className="rowText" align="center">
                        8:50 pm
                      </td>
                      <td className="rowText" align="center">
                        600
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
