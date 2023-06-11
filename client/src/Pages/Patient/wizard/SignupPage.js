import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { requestContext } from "./PatientContainer"; 
import axios from "axios";

export default function SignupPage() {
  const { handleChange, setData, data } = useContext(requestContext);
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
    const response = await fetch("http://localhost:5000/patient/upload", requestOptions);
    const data = await response.json();
    return data;
  };

  const isValid = () => {
    const isEmpty = [
      "fname",
      "lname",
      "city",
      "address",
      "email",
      "phone",
      "phone2",
      "CNIC",
      "password",
      "password2",
    ].every((key) => data[key] !== "");

    return !isEmpty;
  };

  function validateDonor(patient) {

    const validationRules = {
      fname: {
        required: true,
      },
      lname: {
        required: true,
      },
      city: {
        required: true,
      },
      address: {
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
      password: {
        required: true,
      },
      password2: {
        required: true,
      },
    };
  
    for (const field in validationRules) {
      if (validationRules.hasOwnProperty(field)) {
        const rules = validationRules[field];
        const value = patient[field];
  
        if (rules.required && (!value || value.trim() === '')) {
          alert(`${field} is required.`);
          return false;
        }
  
        if (rules.validate && !rules.validate(value)) {
          alert(`Invalid ${field}.`);
          return false;
        }
      }
    }
    if (patient['password'] !== patient['password2']) {
      alert("Password and confirm password must match.");
      return false;
    }
    return true;
  }

  const handleSignup = (e) => {
    e.preventDefault();

    const isDataValid = validateDonor(data);
    if(isDataValid){
      const config = {
        url: "http://localhost:5000/patient/",
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
            navigate('/login');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div className="donorRegistration">
      <button className="backBtn" onClick={() => navigate(-1)}>
        <HiOutlineArrowNarrowLeft className="icon" />
      </button>
      <div className="mainHeading">Blood Reservoir</div>
      <div className="headingCon">
        <div className="header">After signing up you'll be able to make a blood request</div>
        <div className="details" style={{ color: "red" }}>
          We'll arrange a blood bottle on urgent basis for you.
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
                <div className="field">City <span style={{color: 'red'}}>*</span></div>
                <input
                    className="input"
                    onChange={(e) => handleChange(e)}
                    value={data.city}
                    name="city"
                    type="text"
                />
            </div>
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
                <div className="field">Email <span style={{color: 'red'}}>*</span></div>
                <input
                    className="input"
                    onChange={(e) => handleChange(e)}
                    value={data.email}
                    name="email"
                    type="text"
                />
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
        <div className="fieldsDiv">
            <div className="fieldCon">
                <div className="field">Password <span style={{color: 'red'}}>*</span></div>
                <input
                    className="input"
                    onChange={(e) => handleChange(e)}
                    value={data.password}
                    name="password"
                    type="password"
                />
            </div>
            <div className="fieldCon">
                <div className="field">Confirm Password <span style={{color: 'red'}}>*</span></div>
                <input
                    className="input"
                    onChange={(e) => handleChange(e)}
                    value={data.password2}
                    name="password2"
                    type="password"
                />
            </div>
        </div>
        <button
          className="Btn"
          onClick={handleSignup}
          disabled={isValid()}
          style={{ opacity: isValid() ? "0.8" : "1" }}
        >
            Signup
        </button>
      </div>
    </div>
  );
}