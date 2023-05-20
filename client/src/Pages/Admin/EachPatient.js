import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineStar, AiFillStar, AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import LoggedInNavbar from "../Auth/LoggedInNavbar";

export default function EachPatient() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [star, setStar] = useState(true);
  const [time, setTime] = useState("");
  const [patient, setPatient] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios(`http://localhost:5000/patient/${id}`)
        .then((data) => {
            console.log(data);
            setPatient(data.data.data[0]);
            setStar(data.data.data[0]?.star);
            DisplayCurrentTime(new Date(data.data.data[0]?.createdAt.toString()));
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
        url: `http://localhost:5000/patient/${id}`,
        method: "DELETE",
    };
    axios(config)
        .then((data) => {
            if (data.data.success) {
                console.log(data.data.message);
                navigate(`/adminDashboard`);
            } else {
                console.log(data.data.message);
            }
        })
        .catch((err) => console.log(err));
  }
  const starPatient = (e) => {
    e.preventDefault();
    const data = {
        star: !star,
    };
    axios({
        url: `http://localhost:5000/patient/starPatient/${id}`,
        method: "PUT",
        data: data,
        headers: {
            "content-type": "application/json",
        },
    })
        .then((res) => {
            if (res.data.success) {
                console.log(res.data.data.star);
                console.log("Starred Successfully");
                setStar(res.data.data.star);
                setPatient(data.data.data);
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
              <div className="mainHeading">Patient Profile</div>
              <div className="userContent">
                <BiUser className="icon" />
                <div className="label">User Info</div>
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
                {patient?.img === "" ? (
                  <img
                    src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                    alt="logo"
                    className="edit-img"
                  />
                ) : (
                  <img src={patient?.img} alt="logo" className="edit-img" />
                )}
                <div className="detailCon">
                  <div className="nameDiv">
                    <div className="nameCon">
                      {patient?.fname} {patient?.lname}
                    </div>
                    <div className="address">
                      {new Date(patient?.createdAt?.toString())?.toDateString()}
                    </div>
                  </div>
                  <div className="BtnCon">
                    <button className="starBtn btn" onClick={starPatient}>
                      {star ? (
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
                <div className="fieldsDiv">
                    <div className="fieldCon">
                        <div className="field">First Name</div>
                        <input
                            className="input"
                            type="text"
                            disabled={true}
                            value={patient?.fname}
                        />
                    </div>
                    <div className="fieldCon">
                        <div className="field">Last Name</div>
                        <input
                            className="input"
                            type="text"
                            disabled={true}
                            value={patient?.lname}
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
                            value={patient?.address}
                        />
                    </div>
                    <div className="fieldCon">
                        <div className="field">City</div>
                        <input
                            className="input"
                            type="text"
                            disabled={true}
                            value={patient?.city}
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
                            value={patient?.phone}
                        />
                    </div>
                    <div className="fieldCon">
                        <div className="field">Mobile Number</div>
                        <input
                            className="input"
                            type="text"
                            disabled={true}
                            value={patient?.phone2}
                        />
                    </div>
                </div>
                <div className="fieldsDiv">
                    <div className="fieldCon">
                        <div className="field">CNIC</div>
                        <input
                            className="input"
                            type="text"
                            disabled={true}
                            value={patient?.CNIC}
                        />
                    </div>
                    <div className="fieldCon">
                        <div className="field">Email</div>
                        <input
                            className="input"
                            type="text"
                            disabled={true}
                            value={patient?.email}
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
                Are you sure you want to delete this donor's data?
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