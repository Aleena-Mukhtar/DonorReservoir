/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoggedInNavbar from "../Auth/LoggedInNavbar";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function BankNotifications() {
  const [notifications, setNotifications] = useState(null);
  const [notification, setNotification] = useState({});
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [read, setRead] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState({
    unitPrice: "",
    discount: "",
    shipping: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios(`http://localhost:5000/bankNotification/`)
      .then((data) => {
        setNotifications(data.data.filter(el => !el.read && el.bank_id === userData._id));
      })
      .catch((err) => console.log(err));
  }, [read]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  }

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
        setRead(true);
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
  };

  function validateDonor(donor) {

    const validationRules = {
      unitPrice: {
        required: true,
      },
      discount: {
        required: true,
      },
      shipping: {
        required: true,
      },
    };
  
    for (const field in validationRules) {
      if (validationRules.hasOwnProperty(field)) {
        const rules = validationRules[field];
        const value = donor[field];
  
        if (rules.required && (!value || value.trim() === '')) {
          alert(`${field} is required.`);
          return false;
        }
      }
    }
    return true;
  }

  const handleReply = (ID) => {
    setShowModal(true);
    setId(ID);
    axios(`http://localhost:5000/bankNotification/${ID}`)
    .then((data) => {
      setNotification(data.data);
    })
    .catch((err) => console.log(err));
  }

  const handleSendEmail = () => {
    const isDataValid = validateDonor(data);
    if(isDataValid){
      const data1 = {
        reply: data,
      };
      axios({
        url: `http://localhost:5000/bankNotification/sendReply/${id}`,
        method: "PUT",
        data: data1,
        headers: {
          "content-type": "application/json"
        }
      })
      .then(res => {
        if (res.data.success) {
          readRequest(id);
          navigate(`/invoice/${id}`);
        }
        else {
          console.log(res);
        }
      })
    }
  }

  return (
    <>
    <LoggedInNavbar/>
    <div className="bankNotifications">
      <button className="backBtn" onClick={() => navigate(-1)}>
        <HiOutlineArrowNarrowLeft className="icon" />
      </button>
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
              <tr className="eachRow" key={el._id}>
                <td className="rowText" align="center">
                  <div style={{fontWeight: el.read ? 'lighter' : 'bold'}}>The {el.hospitalName} Needs {el.bloodType} Blood Bottles Urgently!!</div>
                  <div className="detailsCon">
                    <button className="emailBtn" onClick={() => handleReply(el._id)}>Send Reply</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="logoutModal"
        style={{ display: showModal ? "flex" : "none" }}
      >
        <div className="logout">
          <div className="modalHeading">Email Reply Integration</div>
          <div className="innerHeading">Fill some data for reply Please:</div>
          <div className="OuterField">
            <div className="fieldCon">
              <div className="header">Hospital Name: <span style={{color: 'red'}}>*</span></div>
              <input type="text" className="input" disabled={true} value={notification?.hospitalName}/>
            </div>
            <div className="fieldCon">
              <div className="header">Blood Type: <span style={{color: 'red'}}>*</span></div>
              <input type="text" className="input" disabled={true} value={notification?.bloodType}/>
            </div>
          </div>
          <div className="OuterField">
            <div className="fieldCon">
              <div className="header">Bottle Count: <span style={{color: 'red'}}>*</span></div>
              <input type="number" className="input" name="count" onChange={(e) => handleChange(e)} disabled={true} value={notification?.count}/>
            </div>
            <div className="fieldCon">
              <div className="header">Need Stock (In days): <span style={{color: 'red'}}>*</span></div>
              <input type="number" className="input" name="days" onChange={(e) => handleChange(e)} disabled={true} value={notification?.days}/>
            </div>
          </div>
          <div className="OuterField">
            <div className="fieldCon">
              <div className="header">Price Per Unit (PKR): <span style={{color: 'red'}}>*</span></div>
              <input type="number" className="input" name="unitPrice" onChange={(e) => handleChange(e)} value={data.unitPrice}/>
            </div>
            <div className="fieldCon">
              <div className="header">discount (%): <span style={{color: 'red'}}>*</span></div>
              <input type="number" className="input" name="discount" onChange={(e) => handleChange(e)} value={data.discount}/>
            </div>
          </div>
          <div className="fieldCon">
            <div className="header">shipping (PKR): <span style={{color: 'red'}}>*</span></div>
            <input type="number" className="input ship" name="shipping" onChange={(e) => handleChange(e)} value={data.shipping}/>
          </div>
          <div className="btnCon">
            <button className="cancelBtn" onClick={(e) => setShowModal(false)}>
              Cancel
            </button>
            <button className="okBtn" onClick={handleSendEmail}>Send</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}