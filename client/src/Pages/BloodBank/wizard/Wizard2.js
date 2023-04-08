import React, { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { requestContext } from "./BlooBankContainer";

export default function Wizard2() {
  const { setTab, handleChange, setData, data } = useContext(requestContext);
  const isValid = () => {
    const isEmpty = [
      "img",
      "fname",
      "lname",
      "adminAddress",
      "adminEmail",
      "adminPhone",
      "adminCNIC",
    ].every((key) => data[key] !== "");

    return !isEmpty;
  };

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
    const response = await fetch("/donor/upload", requestOptions);
    const data = await response.json();
    return data;
  };

  return (
    <div className="wizard1 wizard2">
      <div className="MainContent">
        <div className="MainCon">
          <div className="MainHeading">Admin Information</div>
        </div>
        <div className="Formfields">
          <div className="ImageField">
            <label htmlFor="image">
              {data?.img ? (
                  <img src={data?.img} alt="logo" className="upload-img" />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                    alt="logo"
                    className="upload-img"
                  />
                )
              }
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
                type="text"
                value={data.fname}
                name="fname"
              />
            </div>
            <div className="fieldCon">
              <div className="field">Last Name</div>
              <input
                className="input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={data.lname}
                name="lname"
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
              <div className="field">Email (personal email)</div>
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
              <div className="field">Phone Number</div>
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
            <button 
              className="Btn" 
              onClick={() => setTab(3)}
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
