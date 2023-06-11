import React, { useState, useEffect, useRef } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineStar, AiFillStar, AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import LoggedInNavbar from "../Auth/LoggedInNavbar";

export default function EachBloodBank() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [starred, setStarred] = useState(false);
  const [time, setTime] = useState("");
  const [bank, setbank] = useState({});
  const bankSection = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    axios(`http://localhost:5000/bloodBank/${id}`)
      .then((data) => {
        setbank(data.data);
        DisplayCurrentTime(new Date(data.data?.createdAt.toString()));
      })
      .catch((err) => console.log(err));
  }, []);

  function DisplayCurrentTime(date) {
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    setTime(hours + ":" + minutes + " " + am_pm);
  }

  function handleDelete() {
    var config = {
      url: `http://localhost:5000/bloodBank/${id}`,
      method: "DELETE",
    };
    axios(config)
      .then((data) => {
        if (data.data.success) {
          navigate(`/adminDashboard`);
        } else {
          console.log(data.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  const starbank = (e) => {
    e.preventDefault();
    const data = {
      star: !bank?.star,
    };
    axios({
      url: `http://localhost:5000/bloodBank/starBank/${id}`,
      method: "PUT",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.data.success) {
          setbank(res.data.data);
          setStarred(res.data.data.star);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
    navigate(`/`);
  };

  const scrollDown = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <>
      <LoggedInNavbar />
      <div className="eachDonor eachBank">
        <button className="backBtn" onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft className="icon" />
        </button>
        <div className="editProfile">
          <div className="con1">
            <div className="innerCon">
              <div className="mainHeading">Bank Profile</div>
              <div className="userContent">
                <BiUser className="icon" />
                <div className="label">Admin Info</div>
              </div>
              <div
                className="userContent"
                onClick={() => scrollDown(bankSection)}
              >
                <BiUser className="icon" />
                <div className="label">Bank Info</div>
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
            <div className="upperProfileCon">
              <div className="pictureCon">
                {bank?.img === "" ? (
                  <img
                    src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                    alt="logo"
                    className="edit-img"
                  />
                ) : (
                  <img src={bank?.img} alt="logo" className="edit-img" />
                )}
                <div className="detailCon">
                  <div className="nameDiv">
                    <div className="nameCon">
                      {bank?.lname} {bank?.fname}
                    </div>
                    <div className="address">
                      {new Date(bank?.createdAt?.toString())?.toDateString()}
                    </div>
                  </div>
                  <div className="BtnCon">
                    <button className="starBtn btn" onClick={starbank}>
                      {bank?.star ? (
                        <AiFillStar className="icon" />
                      ) : (
                        <AiOutlineStar className="icon" />
                      )}
                    </button>
                    <button
                      className="deleteBtn btn"
                      onClick={(e) => setShowDeleteModal(!showDeleteModal)}
                    >
                      <MdDelete className="icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="formFields">
              <div className="heading">Admin Information :</div>
              <div className="fieldsDiv">
                <div className="fieldCon">
                  <div className="field">First Name</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.fname}
                  />
                </div>
                <div className="fieldCon">
                  <div className="field">Last Name</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.lname}
                  />
                </div>
              </div>
              <div className="fieldsDiv">
                <div className="fieldCon">
                  <div className="field">Address</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.adminAddress}
                  />
                </div>
                <div className="fieldCon">
                  <div className="field">Email</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.adminEmail}
                  />
                </div>
              </div>
              <div className="fieldsDiv">
                <div className="fieldCon">
                  <div className="field">Phone Number</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.adminPhone}
                  />
                </div>
                <div className="fieldCon">
                  <div className="field">CNIC</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.adminCNIC}
                  />
                </div>
              </div>
              <div className="heading" ref={bankSection}>
                Blood Bank Information :
              </div>
              <div className="fieldsDiv">
                <div className="fieldCon">
                  <div className="field">Bank Name</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.bankName}
                  />
                </div>
                <div className="fieldCon">
                  <div className="field">Bank Address</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.address}
                  />
                </div>
              </div>
              <div className="fieldsDiv">
                <div className="fieldCon">
                  <div className="field">Bank Email</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.email}
                  />
                </div>
                <div className="fieldCon">
                  <div className="field">Blood Types Available</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.bloodTypes}
                  />
                </div>
              </div>
              <div className="fieldsDiv">
                <div className="fieldCon">
                  <div className="field">Phone Number</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.phone}
                  />
                </div>
                <div className="fieldCon">
                  <div className="field">Mobile Number</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.mobile}
                  />
                </div>
              </div>
              <div className="fieldsDiv">
                <div className="fieldCon">
                  <div className="field">City</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.city}
                  />
                </div>
                <div className="fieldCon">
                  <div className="field">Password</div>
                  <input
                    className="input"
                    type="text"
                    disabled={true}
                    value={bank?.password}
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
          <div
            className="logoutModal"
            style={{ display: showDeleteModal ? "flex" : "none" }}
            onClick={(e) => setShowDeleteModal(false)}
          >
            <div className="logout">
              <div className="modalHeading">Confirm Delete</div>
              <div className="innerHeading">
                Are you sure you want to delete this bank's data?
              </div>
              <div className="btnCon">
                <button
                  className="cancelBtn"
                  onClick={(e) => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="okBtn" onClick={handleDelete}>
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
