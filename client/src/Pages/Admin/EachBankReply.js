import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";

export default function EachBankReply() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [starred, setStarred] = useState(false);
  const [status, setStatus] = useState("notSet");
  const [data, setData] = useState(null);
  useEffect(() => {
    // get data
  }, []);
  return (
    <div className="eachPatientRequest eachBankReply">
      <button className="backBtn" onClick={(e) => navigate(-1)}>
        <HiOutlineArrowNarrowLeft className="icon" />
      </button>
      <div className="heading">Blood Bank Details</div>
      <div className="MainContent">
        <div className="leftPanel">
          <div className="imgDiv">
            <img
              src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
              alt="logo"
              className="patient-img"
            />
          </div>
          <div className="BtnCon">
            <button
              className="starBtn btn"
              style={{ backgroundColor: starred ? "#b81d1d" : "#FFFFFF" }}
              onClick={(e) => setStarred(!starred)}
            >
              <BsFillStarFill
                className="icon"
                style={{ color: starred ? "#FFFFFF" : "#b81d1d" }}
              />
            </button>
            <button
              className="deleteBtn btn"
              onClick={(e) => setShowDeleteModal(!showDeleteModal)}
            >
              <MdDelete className="icon" />
            </button>
            {status === "notSet" ? (
              <>
                <button
                  className="RBtn denyBtn btn1"
                  onClick={(e) => setShowDenyModal(!showDenyModal)}
                >
                  Reject
                </button>
                <button
                  className="ABtn btn1"
                  onClick={(e) => setStatus("accept")}
                >
                  Accept
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="rightPanel">
          <div className="DetailCon">
            <div className="header">Bank ID:</div>
            <div className="text">123456</div>
          </div>
          <div className="DetailCon">
            <div className="header">Date:</div>
            <div className="text">22 December, 2023</div>
          </div>
          <div className="DetailCon">
            <div className="header">Time:</div>
            <div className="text">8:50 pm</div>
          </div>
          <div className="DetailCon">
            <div className="header">Bank Name:</div>
            <div className="text">First Last Name</div>
          </div>
          <div className="DetailCon">
            <div className="header">Bank Address:</div>
            <div className="text">
              House # 12, Street # 34 Block A Lahore Punjab
            </div>
          </div>
          <div className="DetailCon">
            <div className="header">Bank Admin Name:</div>
            <div className="text">First Second Name</div>
          </div>
          <div className="DetailCon">
            <div className="header">Bank Admin CNIC:</div>
            <div className="text">35202-1234567-0</div>
          </div>
          <div className="DetailCon">
            <div className="header">Phone Number 1: </div>
            <div className="text">12345678910</div>
          </div>
          <div className="DetailCon">
            <div className="header">Phone Number 2: </div>
            <div className="text">12345678910</div>
          </div>
          <div className="DetailCon">
            <div className="header">Email: </div>
            <div className="text">bank@gmail.com</div>
          </div>
          {status === "reject" ? (
            <div className="DetailCon">
              <div className="header">Request Status: </div>
              <div className="text Dstatus">Rejected</div>
            </div>
          ) : status === "accept" ? (
            <div className="DetailCon">
              <div className="header">Request Status: </div>
              <div className="text Astatus">Accepted</div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="heading">Invoice Details</div>
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
              Unit Price (Rupees)
            </th>
            <th className="headText" align="center">
              Total (Rupees)
            </th>
          </thead>
          <tbody className="tableBody">
            <tr className="eachRow">
              <td className="rowText" align="center">
                B+
              </td>
              <td className="rowText" align="center">
                5
              </td>
              <td className="rowText" align="center">
                150
              </td>
              <td className="rowText" align="center">
                600
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="billDetails">
        <div className="details">
          <div className="eachDetail">
            <div className="header">SubTotal:</div>
            <div className="value">0.0</div>
          </div>
          <div className="eachDetail">
            <div className="header">Discount:</div>
            <div className="value">0.0</div>
          </div>
          <div className="eachDetail">
            <div className="header">Tax:</div>
            <div className="value">0.0</div>
          </div>
          <div className="eachDetail">
            <div className="header">Shipping:</div>
            <div className="value">0.0</div>
          </div>
          <div className="eachDetail total">
            <div className="header">Total (Rupees):</div>
            <div className="value">0.0</div>
          </div>
        </div>
      </div>
      <div
        className="logoutModal"
        style={{ display: showDeleteModal ? "flex" : "none" }}
        onClick={(e) => setShowDeleteModal(false)}
      >
        <div className="logout">
          <div className="modalHeading">Confirm Delete</div>
          <div className="innerHeading">
            Are you sure you want to delete this request?
          </div>
          <div className="btnCon">
            <button
              className="cancelBtn"
              onClick={(e) => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button className="okBtn">OK</button>
          </div>
        </div>
      </div>
      <div
        className="logoutModal"
        style={{ display: showDenyModal ? "flex" : "none" }}
        onClick={(e) => setShowDenyModal(false)}
      >
        <div className="logout">
          <div className="modalHeading">Confirm Rejection</div>
          <div className="innerHeading">
            Are you sure you want to Reject this Shipment?
          </div>
          <div className="btnCon">
            <button
              className="cancelBtn"
              onClick={(e) => setShowDenyModal(false)}
            >
              Cancel
            </button>
            <button className="okBtn" onClick={(e) => setStatus("reject")}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
