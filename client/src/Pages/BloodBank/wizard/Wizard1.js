import React, { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { requestContext } from "./BlooBankContainer";

export default function Wizard1() {
  const { setTab, handleChange, data } = useContext(requestContext);
  return (
    <div className="wizard1">
      <div className="MainContent">
        <div className="MainCon">
          <div className="MainHeading">Personal Information</div>
        </div>
        <div className="Formfields">
          <div className="fieldsDiv">
            <div className="fieldCon">
              <div className="field">Bank Name</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.bankName}
                name={"bankName"}
              />
            </div>
            <div className="fieldCon">
              <div className="field">City</div>
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
              <div className="field">Address</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.address}
                name={"address"}
              />
            </div>
            <div className="fieldCon">
              <div className="field">Email</div>
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
              <div className="field">Phone Number 1</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.phone}
                name={"phone"}
              />
            </div>
            <div className="fieldCon">
              <div className="field">Phone Number 2</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.phone2}
                name={"phone2"}
              />
            </div>
          </div>
          <div className="fieldsDiv">
            <div className="fieldCon">
              <div className="field">Password</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="password"
                value={data.password}
                name={"password"}
              />
            </div>
            <div className="fieldCon">
              <div className="field">Confirm Password</div>
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
            <button className="Btn" onClick={() => setTab(2)}>
              Continue
              <BsArrowRight className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
