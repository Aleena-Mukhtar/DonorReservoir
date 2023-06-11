import React, { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { requestContext } from "./BlooBankContainer";

export default function Wizard1() {
  const { setTab, handleChange, data } = useContext(requestContext);
  const isValid = () => {
    const isEmpty = [
      "bankName",
      "city",
      "address",
      "email",
      "phone",
      "password",
      "password2",
    ].every((key) => data[key] !== "");

    return !isEmpty;
  };

  function validateDonor(bank) {

    const validationRules = {
      bankName: {
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
      mobile: {
        validate: (value) => {
          const regex = /^\d{11}$/;
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
        const value = bank[field];
  
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
    if (bank['password'] !== bank['password2']) {
      alert("Password and confirm password must match.");
      return false;
    }
    return true;
  }

  function handleClick(data) {
    const isDataValid = validateDonor(data);
    if (isDataValid) setTab(2);
  }

  return (
    <div className="wizard1">
      <div className="MainContent">
        <div className="MainCon">
          <div className="MainHeading">Bank Information</div>
        </div>
        <div className="Formfields">
          <div className="fieldsDiv">
            <div className="fieldCon">
              <div className="field">Bank Name <span style={{color: 'red'}}>*</span></div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.bankName}
                name={"bankName"}
              />
            </div>
            <div className="fieldCon">
              <div className="field">City <span style={{color: 'red'}}>*</span></div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.city}
                name={"city"}
              />
            </div>
          </div>
          <div className="fieldsDiv">
            <div className="fieldCon">
              <div className="field">Address <span style={{color: 'red'}}>*</span></div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.address}
                name={"address"}
              />
            </div>
            <div className="fieldCon">
              <div className="field">Email (official email) <span style={{color: 'red'}}>*</span></div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.email}
                name={"email"}
              />
            </div>
          </div>
          <div className="fieldsDiv">
            <div className="fieldCon">
              <div className="field">Phone Number <span style={{color: 'red'}}>* (without dashes)</span></div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.phone}
                name={"phone"}
              />
            </div>
            <div className="fieldCon">
              <div className="field">Mobile Number <span style={{color: 'red'}}>* (without dashes)</span></div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.mobile}
                name={"mobile"}
              />
            </div>
          </div>
          <div className="fieldsDiv">
            <div className="fieldCon">
              <div className="field">Password <span style={{color: 'red'}}>*</span></div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="password"
                value={data.password}
                name={"password"}
              />
            </div>
            <div className="fieldCon">
              <div className="field">Confirm Password <span style={{color: 'red'}}>*</span></div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="password"
                value={data.password2}
                name={"password2"}
              />
            </div>
          </div>
          <div className="BtnCon">
            <button className="BackBtn" onClick={() => setTab(0)}>
              Back
            </button>
            <button 
              className="Btn" 
              onClick={() => handleClick(data)}
              disabled={isValid()}
              style={{ opacity: isValid() ? "0.8" : "1" }} 
            >
              Continue
              <BsArrowRight className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
