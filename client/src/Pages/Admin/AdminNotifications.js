/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoggedInNavbar from "../Auth/LoggedInNavbar";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(null);
  const [patientNotifications, setPatientNotifications] = useState(null);
  const [read, setread] = useState(false);
  const navigate = useNavigate();
  const navigateToFilterBankPage = (type, ID) => {
    navigate(`/filterBank/${type}/${ID}`);
  };
  
  useEffect(() => {
    axios(`http://localhost:5000/adminNotification/`)
      .then((data) => {
        setNotifications(data.data);
      })
    .catch((err) => console.log(err));
    axios(`http://localhost:5000/bloodRequest/`)
      .then((data) => {
        setPatientNotifications(data.data.filter((el) => (!el.read)));
      })
    .catch((err) => console.log(err));
  }, [read]);

  const readRequest = (Type, ID) => {
    setread(true);
    const data = {
      read: true,
    };
    axios({
      url: `http://localhost:5000/adminNotification/markAsRead/${ID}`,
      method: "PUT",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.success) {
        navigateToFilterBankPage(Type, ID);
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
  };

  const readPatientRequest = (ID) => {
    setread(true);
    const data = {
      read: true,
    };
    axios({
      url: `http://localhost:5000/bloodRequest/markAsRead/${ID}`,
      method: "PUT",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.success) {
        navigate(`/eachRequest/${ID}`);
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
  };

  return (
    <>
    <LoggedInNavbar/>
    <div className="bankNotifications adminNotifications">
      <button className="backBtn" onClick={() => navigate(-1)}>
        <HiOutlineArrowNarrowLeft className="icon" />
      </button>
      <div className="heading">Urgent Blood Notifications</div>
      <div className="subHeading">These notifications must handle on urgent bases</div>
      <div className="tableCon">
        <table className="table">
          <thead className="tableHeader">
            <th className="headText" align="left">
              Blood Requests From Patients
            </th>
          </thead>
          <tbody className="tableBody">
            {patientNotifications?.map((el) => (
              <tr className="eachRow eachRow1" key={el._id} onClick={() => readPatientRequest(el._id)}>
                <td className="rowText" align="center">
                  <div style={{fontWeight: el.read ? 'lighter' : 'bold'}}>The Patient Needs {el.bloodType} Blood Bottles Urgently!!</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="tableCon">
        <table className="table">
          <thead className="tableHeader">
            <th className="headText" align="left">
              Blood Shortage Notifications
            </th>
          </thead>
          <tbody className="tableBody">
            {notifications?.map((el) => (
              <tr className="eachRow" key={el._id}>
                <td className="rowText" align="center">
                  <div style={{fontWeight: el.read ? 'lighter' : 'bold'}}>We Need {el.bloodType} Blood Bottles Urgently!!</div>
                  <div className="detailsCon">
                    <button className="emailBtn" onClick={() => readRequest(el.bloodType, el._id)}>Send Email</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>    
    </div>
    </>
  );
}