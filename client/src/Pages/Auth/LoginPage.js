import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OPTIONS = ["Role", "Admin", "Patient", "Blood Bank"];

export default function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("Role");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    let url = "";
    if (role === "Admin") url = "/admin/login";
    else if (role === "Patient") url = "/Patient/login";
    else if (role === "Blood Bank") url = "/bloodBank/login";
    else if (role === "Patient") url = "/patient/login";
    axios.post(url, data).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        alert(res.data.message)
      } else {
        console.log("success");
        // sessionStorage.setItem("id",res.data.userData._id);
        // sessionStorage.setItem("role",role);
        sessionStorage.setItem("id",res.data.userData._id);
        sessionStorage.setItem("role",role);
        sessionStorage.setItem("userData",JSON.stringify(res.data.userData));
        sessionStorage.setItem("isLoggedIn",true);
        if(role === "Admin") navigate(`/adminDashboard`);
        else if(role === "Blood Bank") navigate(`/bloodBankDashboard`);
        else if(role === "Patient") navigate(`/patientDashboard`);
      }
    });
  };
  return (
    <div className="login">
      <div className="mainContent">
        <div className="headingCon">
          <div className="header">Log In to</div>
          <div className="mainHeading">Blood Reservoir</div>
        </div>
        <div className="fieldCon">
          <div className="field">Email</div>
          <input
            className="input"
            name="email"
            value={data.email}
            placeholder=""
            type="text"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="fieldCon">
          <div className="field">Password</div>
          <input
            className="input"
            name="password"
            placeholder=""
            type="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select"
        >
          {OPTIONS.map((el) => (
            <option value={el}>{el}</option>
          ))}
        </select>
        <button
          className="Btn"
          disabled={role === "Role"}
          onClick={handleSubmit}
        >
          LOG IN
        </button>
      </div>
    </div>
  );
}
