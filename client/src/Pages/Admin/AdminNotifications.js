/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(null);
  const navigate = useNavigate();
  const navigateToFilterBankPage = (type) => {
    console.log(type);
    navigate(`/filterBank/${type}`);
  };
  
  useEffect(() => {
    axios(`http://localhost:5000/adminNotification/`)
      .then((data) => {
        console.log(data);
        setNotifications(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="patientRequests adminNotifications">
      <table className="table">
        <thead className="tableHeader">
          <th className="headText" align="left">
            Blood Need Notifications
          </th>
        </thead>
        <tbody className="tableBody">
          {notifications?.map((el) => (
            <tr className="eachRow" onClick={(e) => navigateToFilterBankPage(el.bloodType)} key={el._id}>
              <td className="rowText" align="center">
                <div style={{fontWeight: el.read ? 'lighter' : 'bold'}}>We Need {el.bloodType} Blood Bottles Urgently!!</div>
                <div className="detailsCon">
                  <button className="emailBtn">Send Email</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}