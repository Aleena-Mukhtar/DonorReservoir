/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoggedInNavbar from "../Auth/LoggedInNavbar";

export default function BankNotifications() {
  const [notifications, setNotifications] = useState(null);
  const navigate = useNavigate();
  const navigateToFilterBankPage = (type, ID) => {
    console.log(type);
    navigate(`/filterBank/${type}/${ID}`);
  };
  
  useEffect(() => {
    axios(`http://localhost:5000/bankNotification/`)
      .then((data) => {
        console.log(data);
        setNotifications(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const readRequest = (ID) => {
    const data = {
      read: true,
    };
    axios({
      url: `http://localhost:5000/bankNotification/markAsRead/${ID}`,
      method: "PUT",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.success) {
        console.log(res.data.data.read);
        console.log("mark as read Successfully");
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
  };

  return (
    <>
    <LoggedInNavbar/>
    <div className="bankNotifications">
      <div className="heading">Urgent Blood Notifications</div>
      <div className="subHeading">These notifications must handle on urgent bases</div>
      <div className="tableCon">
        <table className="table">
          <thead className="tableHeader">
            <th className="headText" align="left">
              Blood Need Notifications
            </th>
          </thead>
          <tbody className="tableBody">
            {notifications?.map((el) => (
              <tr className="eachRow" onClick={(e) => navigateToFilterBankPage(el.bloodType, el._id)} key={el._id}>
                <td className="rowText" align="center">
                  <div style={{fontWeight: el.read ? 'lighter' : 'bold'}}>The {el.hospitalName} Needs {el.bloodType} Blood Bottles Urgently!!</div>
                  <div className="detailsCon">
                    <button className="emailBtn" onClick={() => readRequest(el._id)}>Send Reply</button>
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