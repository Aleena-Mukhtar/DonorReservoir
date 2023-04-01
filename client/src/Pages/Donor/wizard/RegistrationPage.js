import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { requestContext } from "./DonorContainer";
import axios from "axios";

export default function RegistrationPage() {
  const { setTab, handleChange, setData, data } = useContext(requestContext);
  const navigate = useNavigate();

  async function uploadImg(e) {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    let res = await Singleupload(formdata);
    if (res.success) {
      console.log(res.url);
      setData({ ...data, img: res.url });
    } else {
    }
  }

  const Singleupload = async (formdata) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
    };
    const response = await fetch("/donor/upload", requestOptions);
    const data = await response.json();
    return data;
  };

  const isValid = () => {
    const isEmpty = [
      "img",
      "fname",
      "lname",
      "address",
      "email",
      "phone",
      "phone2",
      "CNIC",
      "bloodType",
    ].every((key) => data[key] !== "");

    return !isEmpty;
  };

  // function handleChangeImg(e) {
  //   console.log(e.target.files);
  //   setData({ ...data, img: URL.createObjectURL(e.target.files[0]) });
  // }

  const handleRegistration = (e) => {
    e.preventDefault();

    const config = {
      url: "http://localhost:5000/donor/donor",
      method: "POST",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.error) {
          alert(response.data.message);
        } else {
          setTab(2);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="donorRegistration">
      <button className="backBtn" onClick={() => navigate(-1)}>
        <HiOutlineArrowNarrowLeft className="icon" />
      </button>
      <div className="mainHeading">Blood Reservoir</div>
      <div className="headingCon">
        <div className="header">Register Yourself as Donor</div>
        <div className="details" style={{ color: "red" }}>
          Save someone’s life in time of need
        </div>
      </div>
      <div className="mainContent">
        <div className="ImageField">
          <label htmlFor="image">
            {data.img ? (
              <img src={data.img} alt="logo" className="upload-img" />
            ) : (
              <img
                src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                alt="logo"
                className="upload-img"
              />
            )}
          </label>
          <input
            type="file"
            id="image"
            accept=".png, .jpg, .jpeg"
            name="img"
            onChange={(e) => uploadImg(e)}
            style={{ display: "none" }}
          />
        </div>
        <div className="fieldsDiv">
          <div className="fieldCon">
            <div className="field">First Name</div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.fname}
              name="fname"
              type="text"
            />
          </div>
          <div className="fieldCon">
            <div className="field">Last Name</div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.lname}
              name="lname"
              type="text"
            />
          </div>
        </div>
        <div className="fieldsDiv">
          <div className="fieldCon">
            <div className="field">Address</div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.address}
              name="address"
              type="text"
            />
          </div>
          <div className="fieldCon">
            <div className="field">Email</div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.email}
              name="email"
              type="text"
            />
          </div>
        </div>
        <div className="fieldsDiv">
          <div className="fieldCon">
            <div className="field">Phone Number</div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.phone}
              name="phone"
              type="number"
            />
          </div>
          <div className="fieldCon">
            <div className="field">Another Phone Number</div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.phone2}
              name="phone2"
              type="number"
            />
          </div>
        </div>
        <div className="fieldsDiv">
          <div className="fieldCon">
            <div className="field">Your Blood Type</div>
            <select
              className="select input"
              onChange={(e) => handleChange(e)}
              value={data.bloodType}
              name="bloodType"
            >
              <option>Choose BloodType</option>
              <option value="AB+" className="option">
                AB+
              </option>
              <option value="AB-">AB-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="fieldCon">
            <div className="field">CNIC</div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.CNIC}
              name="CNIC"
              type="number"
            />
          </div>
        </div>
        <button
          className="Btn"
          onClick={handleRegistration}
          disabled={isValid()}
        >
          Register Yourself
        </button>
      </div>
    </div>
  );
}
