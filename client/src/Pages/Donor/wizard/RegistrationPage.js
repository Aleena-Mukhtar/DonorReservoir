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
      `Bearer ${sessionStorage.getItem("token")}`
    );

    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/donor/upload`, requestOptions);
    const data = await response.json();
    return data;
  };

  const isValid = () => {
    const isEmpty = [
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

  function validateDonor(donor) {

    const validationRules = {
      fname: {
        required: true,
      },
      email: {
        required: true,
        unique: true,
        validate: (value) => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(value);
        },
      },
      bloodType: {
        required: true,
        validate: (value) => {
          const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
          return validBloodTypes.includes(value);
        },
      },
      phone: {
        required: true,
        validate: (value) => {
          const regex = /^\d{11}$/;
          return regex.test(value);
        },
      },
      phone2: {
        required: true,
        validate: (value) => {
          const regex = /^\d{11}$/;
          return regex.test(value);
        },
      },
      CNIC: {
        required: true,
        validate: (value) => {
          const regex = /^\d{13}$/;
          return regex.test(value);
        },
      },
    };
  
    for (const field in validationRules) {
      if (validationRules.hasOwnProperty(field)) {
        const rules = validationRules[field];
        const value = donor[field];
  
        // Check if the field is required and empty
        if (rules.required && (!value || value.trim() === '')) {
          alert(`${field} is required.`);
          return false;
        }
  
        // Perform additional validations
        if (rules.validate && !rules.validate(value)) {
          alert(`Invalid ${field}.`);
          return false;
        }

      }
    }
    return true;
  }
  
  // function handleChangeImg(e) {
  //   console.log(e.target.files);
  //   setData({ ...data, img: URL.createObjectURL(e.target.files[0]) });
  // }

  const handleRegistration = (e) => {
    e.preventDefault();

    const isDataValid = validateDonor(data);
    if (isDataValid) {
      const config = {
        url: `${process.env.REACT_APP_API_URL}/donor/`,
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
    } else {
      console.log('invalid data');
    }
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
            <div className="field">First Name <span style={{color: 'red'}}>*</span></div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.fname}
              name="fname"
              type="text"
            />
          </div>
          <div className="fieldCon">
            <div className="field">Last Name <span style={{color: 'red'}}>*</span></div>
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
            <div className="field">Address <span style={{color: 'red'}}>*</span></div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.address}
              name="address"
              type="text"
            />
          </div>
          <div className="fieldCon">
            <div className="field">Email <span style={{color: 'red'}}>*</span></div>
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
            <div className="field">Phone Number <span style={{color: 'red'}}>* (without dashes)</span></div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.phone}
              name="phone"
              type="text"
            />
          </div>
          <div className="fieldCon">
            <div className="field">Another Phone Number <span style={{color: 'red'}}>* (without dashes)</span></div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.phone2}
              name="phone2"
              type="text"
            />
          </div>
        </div>
        <div className="fieldsDiv">
          <div className="fieldCon">
            <div className="field">Your Blood Type <span style={{color: 'red'}}>*</span></div>
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
            <div className="field">CNIC <span style={{color: 'red'}}>* (without dashes)</span></div>
            <input
              className="input"
              onChange={(e) => handleChange(e)}
              value={data.CNIC}
              name="CNIC"
              type="text"
            />
          </div>
        </div>
        <button
          className="Btn"
          onClick={handleRegistration}
          disabled={isValid()}
          style={{ opacity: isValid() ? "0.8" : "1" }}
        >
          Register Yourself
        </button>
      </div>
    </div>
  );
}
