import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import LoggedInNavabr from '../Auth/LoggedInNavbar';
import axios from "axios";

export default function BloodBankDashboard() {
  const navigate = useNavigate();
  const [btnClick, setBtnClick] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  useEffect(() => {
    axios(`http://localhost:5000/bankNotification/`)
      .then((data) => {
        setHistory(data.data.filter(el => (el.bank_id === userData._id)));
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
    <div className="adminDashboard bloodBankDashboard">
      <div className="heading">Blood Bank Dashboard</div>
      <div className="mainContent">
        <div className="leftPanel">
          <div className="BtnDiv">
            <button
              className={btnClick === 1 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(1)}
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
            {btnClick === 1 ?
            (
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
                    Status
                  </th>
                  <th className="headText" align="center">
                    Date
                  </th>
                  <th className="headText" align="center">
                    Total Price (PKR)
                  </th>
                </thead>
                <tbody className="tableBody">
                  {history?.map((el) => (
                    <tr className="eachRow1" onClick={(e) => navigate(`/shipment/${el._id}`)}>
                      <td className="rowText" align="center">
                        {el?.hospitalName}
                      </td>
                      <td className="rowText" align="center">
                        {el?.bloodType}
                      </td>
                      <td className="rowText" align="center">
                        {el?.count}
                      </td>
                      <td className="rowText" align="center" style={{fontWeight: 'bold', color: el?.status === 'Accepted' ? 'green' : 'red'}}>
                        {el?.status}
                      </td>
                      <td className="rowText" align="center">
                        {new Date(el?.updatedAt.toString()).toDateString()}
                      </td>
                      <td className="rowText" align="center">
                        {((parseInt(el?.count)  * parseInt(el?.reply?.unitPrice)) - ((parseInt(el?.count)  * parseInt(el?.reply?.unitPrice)) * (parseFloat(el?.reply?.discount)/100))) + parseInt(el?.reply?.shipping)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
