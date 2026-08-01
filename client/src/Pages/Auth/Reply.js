import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoggedInNavbar from './LoggedInNavbar';
import { useParams } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Reply() {
    const { id } = useParams();
    const [notification, setNotification] = useState({});
    const [status, setStatus] = useState(false);
    const [showDenyModal, setShowDenyModal] = useState(false);
    const role = sessionStorage.getItem("role");
    const navigate = useNavigate();

    useEffect(() => {
      axios(`${process.env.REACT_APP_API_URL}/bankNotification/${id}`)
        .then((data) => {
          setNotification(data.data);
          if(data.data.status === 'Pending') setStatus(false);
          else setStatus(true);
        })
        .catch((err) => console.log(err));
    }, [status, id]);

    const updateStatus = (Status) => {
      const data = {
        status: Status,
      };
      axios({
        url: `${process.env.REACT_APP_API_URL}/bankNotification/updateStatus/${id}`,
        method: "PUT",
        data: data,
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success) {
          handleBloodBottles();
          setStatus(true);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
    };

    const handleBloodBottles = () => {
  
      const config = {
        url: `${process.env.REACT_APP_API_URL}/bloodBottle/`,
        method: "POST",
        data: JSON.stringify({
          bloodType: notification?.bloodType,
          count: notification?.count,
          unitPrice: notification?.reply?.unitPrice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(config)
        .then(function (response) {
          if (response.data.success) {
            alert('Shipment Record Added Successfuly');
          } else {
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  return (
    <>
    <LoggedInNavbar/>
    <div className='notification reply'>
      <button className="backBtn" onClick={() => navigate(-1)}>
        <HiOutlineArrowNarrowLeft className="icon" />
      </button>
      <div className='heading'>Email Reply</div>
      <div className='mainCon'>
        <div className='intro'>To: <span>{notification?.hospitalName}</span></div>
        <div className='intro'>From: <span>{notification?.bankName}</span></div>
        <div className='intro'>Date: <span>{new Date(notification?.updatedAt?.toString()).toDateString()}</span></div>
        <div className='intro'>Subject (Reply): <span>Urgent Request for 10 Bottles of {notification?.bloodType} Blood</span></div>
        <div className='intro1'>Dear {notification?.hospitalName} Team,</div>
        <div className='body'>Thank you for reaching out to us for the urgent request of 10 bottles of B+ blood for the patient in {notification?.hospitalName}. We understand the urgency of the matter and would like to assure you that we are doing everything possible to meet your request.
        <br/>Our team is currently processing your request, and we will dispatch the required blood units to your hospital as soon as possible. We will keep you updated on the expected delivery time.
        <br/>We appreciate your trust in our services and thank you for the opportunity to assist you in providing the best possible care for your patient.
        <br/>Please feel free to contact us if you have any further questions or concerns.</div>
        <div className='intro1'>Best regards,</div>
        <img
          src={process.env.PUBLIC_URL + "/signature.png"}
          alt="logo"
          className="signature"
        />
        <div className='intro1'>{notification?.bankName}</div>
        <div className='intro'>Request Status: <span style={{fontWeight: 'bold', color: notification?.status === 'Accepted' ? 'green' : 'red'}}>{notification?.status}</span></div>
      </div>
      <div className='Invoice'>
        <div className='heading'>Generated Invoice Attached with Your Reply</div>
        <div className='mainContent'>
          <div className="tableCon">
            <table className="table">
              <thead className="tableHeader">
                <th className="headText" align="center">
                  Blood Type
                </th>
                <th className="headText" align="center">
                  Quantity
                </th>
                <th className="headText" align="center">
                  Unit Price (PKR)
                </th>
                <th className="headText" align="center">
                  Total (PKR)
                </th>
              </thead>
              <tbody className="tableBody">
                <tr className="eachRow">
                  <td className="rowText" align="center">
                    {notification?.bloodType}
                  </td>
                  <td className="rowText" align="center">
                    {notification?.count}
                  </td>
                  <td className="rowText" align="center">
                    {notification?.reply?.unitPrice}
                  </td>
                  <td className="rowText" align="center">
                    {parseInt(notification?.count)  * parseInt(notification?.reply?.unitPrice)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            <div className="billDetails">
              <div className="details">
                <div className="eachDetail">
                  <div className="header">SubTotal (PKR):</div>
                  <div className="value">{parseInt(notification?.count)  * parseInt(notification?.reply?.unitPrice)}</div>
                </div>
                <div className="eachDetail">
                  <div className="header">Discount (%):</div>
                  <div className="value">{notification?.reply?.discount}</div>
                </div>
                <div className="eachDetail">
                  <div className="header">Shipping (PKR):</div>
                  <div className="value">{notification?.reply?.shipping}</div>
                </div>
                <div className="eachDetail total">
                  <div className="header">Total (PKR):</div>
                  <div className="value">{((parseInt(notification?.count)  * parseInt(notification?.reply?.unitPrice)) - ((parseInt(notification?.count)  * parseInt(notification?.reply?.unitPrice)) * (parseFloat(notification?.reply?.discount)/100))) + parseInt(notification?.reply?.shipping)}</div>
                </div>
              </div>
            </div>
        </div>
      </div>
      {
        role === 'Admin' && !status ? 
        <div className='btnCon'>
          <button className='btn aBtn' onClick={() => updateStatus('Accepted')}>Accept</button>
          <button className='btn rBtn' onClick={() => setShowDenyModal(true)}>Reject</button>
        </div> : null
      }
      <div className="logoutModal" style={{ display: showDenyModal ? "flex" : "none" }} onClick={(e) => setShowDenyModal(false)}>
        <div className="logout">
          <div className="modalHeading">Confirm Rejection</div>
          <div className="innerHeading">Are you sure you want to Reject this Shipment?</div>
          <div className="btnCon">
            <button className="cancelBtn" onClick={(e) => setShowDenyModal(false)}>
              Cancel
            </button>
            <button className="okBtn" onClick={() => updateStatus('Rejected')}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}