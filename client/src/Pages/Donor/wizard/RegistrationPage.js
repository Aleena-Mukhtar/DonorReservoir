import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { requestContext } from "./DonorContainer";

export default function RegistrationPage() {
  const { setTab, handleChange, setData, data } = useContext(requestContext);
  const navigate = useNavigate();
  function handleChangeImg(e) {
    console.log(e.target.files);
    setData({ ...data, img: URL.createObjectURL(e.target.files[0]) });
  }
  return (
    <div className="donorRegistration">
      <button className="backBtn" onClick={() => navigate(-1)}>
        <HiOutlineArrowNarrowLeft className="icon" />
      </button>
      <div className="mainHeading">Blood Reservoir</div>
      <div className="headingCon">
        <div className="header">Register Yourself as Donor</div>
        <div className="details">Save someone’s life in time of need</div>
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
            onChange={handleChangeImg}
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
        {/* you should put dropdown here tho */}
        <div className="fieldsDiv">
          <div className="fieldCon">
            <div className="field">Blood Type</div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.bloodType}
              name="bloodType"
              type="text"
            />
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
        <button className="Btn" onClick={() => setTab(2)}>
          Register Yourself
        </button>
      </div>
    </div>
  );
}
