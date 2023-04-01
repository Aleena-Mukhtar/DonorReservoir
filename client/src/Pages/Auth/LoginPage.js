import React, { useState } from "react";
import axios from "axios";

const OPTIONS = ["Role", "Admin", "Patient", "Blood Bank"];

export default function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("Role");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    let url = "";
    if (role === "Admin") url = "/admin/login";
    else if (role === "Patient") url = "/Patient/login";
    else if (role === "Blood Bank") url = "/bank/login";
    axios.post(url, data).then((res) => {
      console.log(res);
      if (!res.err) {
        console.log(res.err);
      } else {
        console.log("success");
        //then naviagte to page
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
