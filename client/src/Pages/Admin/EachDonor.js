import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowLeft, HiIdentification } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaUserCheck, FaAddressBook } from "react-icons/fa";
import { BsCalendar2DateFill, BsTelephoneOutboundFill } from "react-icons/bs";
import {
  MdOutlineAccessTimeFilled,
  MdEmail,
  MdBloodtype,
} from "react-icons/md";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import axios from "axios";

export default function EachDonor() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [starred, setStarred] = useState(false);
  const [star, setStar] = useState(true);
  const [time, setTime] = useState("");
  const [donor, setDonor] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios(`http://localhost:5000/donor/get/${id}`)
      .then((data) => {
        console.log(data);
        setDonor(data.data.data[0]);
        setStar(data.data.data[0]?.star);
        DisplayCurrentTime(new Date(data.data.data[0]?.createdAt.toString()));
      })
      .catch((err) => console.log(err));
  }, [starred]);
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
      url: `http://localhost:5000/donor/delete/${id}`,
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
  const starDonor = (e) => {
    e.preventDefault();
    const data = {
      star: !star,
    };
    axios({
      url: `http://localhost:5000/donor/starDonor/${id}`,
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
          setStarred(res.data.data.star);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="eachDonor">
      <div className="topDiv">
        <button className="backBtn" onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft className="icon" />
        </button>
        <div className="imgDiv">
          {donor?.img === "" ? (
            <img
              src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
              alt="logo"
              className="donor-img"
            />
          ) : (
            <img src={donor?.img} alt="logo" className="donor-img" />
          )}
        </div>
      </div>
      <div className="MainContent">
        <div className="nameDiv">
          <div className="name">
            {donor?.fname} {donor?.lname}
          </div>
          <div className="BtnCon">
            <button className="starBtn btn" onClick={starDonor}>
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
        <div className="rightPanel">
          <div className="DetailCon">
            <div className="header">
              <FaUserCheck className="icon colorIcon" />
            </div>
            <div className="text">{donor?._id}</div>
          </div>
          <div className="DetailCon">
            <div className="header">
              <BsCalendar2DateFill className="icon" />
            </div>
            <div className="text">
              {new Date(donor?.createdAt?.toString())?.toDateString()}
            </div>
          </div>
          <div className="DetailCon">
            <div className="header">
              <MdOutlineAccessTimeFilled className="icon colorIcon" />
            </div>
            <div className="text">{time}</div>
          </div>
          <div className="DetailCon">
            <div className="header">
              <FaAddressBook className="icon" />
            </div>
            <div className="text">{donor?.address}</div>
          </div>
          <div className="DetailCon">
            <div className="header">
              <HiIdentification className="icon colorIcon" />
            </div>
            <div className="text">{donor?.CNIC}</div>
          </div>
          <div className="DetailCon">
            <div className="header">
              <BsTelephoneOutboundFill className="icon" />
            </div>
            <div className="text">{donor?.phone}</div>
          </div>
          <div className="DetailCon">
            <div className="header">
              <BsTelephoneOutboundFill className="icon colorIcon" />
            </div>
            <div className="text">{donor?.phone2}</div>
          </div>
          <div className="DetailCon">
            <div className="header">
              <MdEmail className="icon" />
            </div>
            <div className="text">{donor?.email}</div>
          </div>
          <div className="DetailCon">
            <div className="header">
              <MdBloodtype className="icon colorIcon" />
            </div>
            <div className="text">{donor?.bloodType}</div>
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
  );
}
