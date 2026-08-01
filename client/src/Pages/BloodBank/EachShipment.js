import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { SlBasketLoaded } from "react-icons/sl";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import LoggedInNavbar from "../Auth/LoggedInNavbar";

export default function EachShipment() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [shipment, setShipment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/bankNotification/${id}`)
      .then((data) => {
        setShipment(data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
    navigate(`/`);
  };
  return (
    <>
      <LoggedInNavbar />
      <div className="eachDonor">
        <button className="backBtn" onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft className="icon" />
        </button>
        <div className="editProfile">
          <div className="con1">
            <div className="innerCon">
              <div className="mainHeading">Blood Bank</div>
              <div className="userContent">
                <SlBasketLoaded className="icon" />
                <div className="label">Shipment Info</div>
              </div>
            </div>
            <button
              className="logoutBtn"
              onClick={(e) => setShowLogoutModal(!showLogoutModal)}
            >
              <AiOutlineLogout className="icon" />
              <div className="label">Log Out</div>
            </button>
          </div>
            <div className="editProfileContent">
                <div className="formFields">
                    <div className="fieldsDiv">
                        <div className="fieldCon">
                            <div className="field">Bank Name :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={shipment?.bankName}
                            />
                        </div>
                        <div className="fieldCon">
                            <div className="field">Hospital Name :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={shipment?.hospitalName}
                            />
                        </div>
                    </div>
                    <div className="fieldsDiv">
                        <div className="fieldCon">
                            <div className="field">Blood Type :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={shipment?.bloodType}
                            />
                        </div>
                        <div className="fieldCon">
                            <div className="field">Bottle Count :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={shipment?.count}
                            />
                        </div>
                    </div>
                    <div className="fieldsDiv">
                        <div className="fieldCon">
                            <div className="field">Number of Days :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={shipment?.days}
                            />
                        </div>
                        <div className="fieldCon">
                            <div className="field">Unit Price (PKR) :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={shipment?.reply?.unitPrice}
                            />
                        </div>
                    </div>
                    <div className="fieldsDiv">
                        <div className="fieldCon">
                            <div className="field">Discount (%) :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={shipment?.reply?.discount}
                            />
                        </div>
                        <div className="fieldCon">
                            <div className="field">Total Price (PKR) :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={((parseInt(shipment?.count)  * parseInt(shipment?.reply?.unitPrice)) - ((parseInt(shipment?.count)  * parseInt(shipment?.reply?.unitPrice)) * (parseFloat(shipment?.reply?.discount)/100))) + parseInt(shipment?.reply?.shipping)}
                            />
                        </div>
                    </div>
                    <div className="fieldsDiv">
                        <div className="fieldCon">
                            <div className="field">Shipment (PKR) :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={shipment?.reply?.shipping}
                            />
                        </div>
                        <div className="fieldCon">
                            <div className="field">Shipment Status :</div>
                            <input
                                className="input"
                                type="text"
                                disabled={true}
                                value={shipment?.status}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="logoutModal"
                style={{ display: showLogoutModal ? "flex" : "none" }}
                onClick={(e) => setShowLogoutModal(false)}
            >
                <div className="logout">
                <div className="modalHeading">Confirm Logout</div>
                <div className="innerHeading">
                    Are you sure you want to logout?
                </div>
                <div className="btnCon">
                    <button
                        className="cancelBtn"
                        onClick={(e) => setShowLogoutModal(false)}
                    >
                        Cancel
                    </button>
                    <button className="okBtn" onClick={handleLogout}>
                        OK
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}