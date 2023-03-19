import React, { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { requestContext } from "./BlooBankContainer";

export default function Wizard2() {
  const { setTab, handleChange, setData, data } = useContext(requestContext);

  function handleChangeImg(e) {
    console.log(e.target.files);
    setData({ ...data, adminImg: URL.createObjectURL(e.target.files[0]) });
  }
  return (
    <div className="wizard1 wizard2">
      <div className="MainContent">
        <div className="MainCon">
          <div className="MainHeading">Admin Information</div>
        </div>
        <div className="Formfields">
          <div className="ImageField">
            <label htmlFor="image">
              {data.adminImg ? (
                <img src={data.adminImg} alt="logo" className="upload-img" />
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
                type="text"
                value={data.adminFname}
                name="adminFname"
              />
            </div>
            <div className="fieldCon">
              <div className="field">Last Name</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.adminLname}
                name="adminLname"
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
                value={data.adminAddress}
                name="adminAddress"
              />
            </div>
            <div className="fieldCon">
              <div className="field">Email</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.adminEmail}
                name="adminEmail"
              />
            </div>
          </div>
          <div className="fieldsDiv">
            <div className="fieldCon">
              <div className="field">Phone</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.adminPhone}
                name="adminPhone"
              />
            </div>
            <div className="fieldCon">
              <div className="field">CNIC</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.adminCNIC}
                name="adminCNIC"
              />
            </div>
          </div>
          <div className="BtnCon">
            <button className="BackBtn" onClick={() => setTab(1)}>
              Back
            </button>
            <button className="Btn" onClick={() => setTab(3)}>
              Continue
              <BsArrowRight className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
