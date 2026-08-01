import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const OPTIONS = ["Role", "Admin", "Patient", "Blood Bank"];

export default function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("Role");
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const roleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setIsRoleOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  function validateDonor(patient) {

    const validationRules = {
      email: {
        required: true,
        unique: true,
        validate: (value) => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(value);
        },
      },
      password: {
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
    return true;
  }

  const handleSubmit = () => {
    const isDataValid = validateDonor(data);
    if(isDataValid){
      let url = "";
      if (role === "Admin") url = "/admin/login";
      else if (role === "Patient") url = "/Patient/login";
      else if (role === "Blood Bank") url = "/bloodBank/login";
      else if (role === "Patient") url = "/patient/login";
      axios.post(url, data).then((res) => {
        if (res.data.error) {
          alert(res.data.message)
        } else {
          sessionStorage.setItem("id",res.data.userData._id);
          sessionStorage.setItem("role",role);
          sessionStorage.setItem("userData",JSON.stringify(res.data.userData));
          sessionStorage.setItem("isLoggedIn",true);
          if(role === "Admin") navigate(`/adminDashboard`);
          else if(role === "Blood Bank") navigate(`/bloodBankDashboard`);
          else if(role === "Patient") navigate(`/patientDashboard`);
        }
      });
    }
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
          <div className="passwordField">
            <input
              className="input"
              name="password"
              placeholder=""
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => handleChange(e)}
            />
            <button
              type="button"
              className="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        <div className="customSelect" ref={roleRef}>
          <button
            type="button"
            className={`selectToggle ${role !== "Role" ? "hasValue" : ""}`}
            onClick={() => setIsRoleOpen(!isRoleOpen)}
          >
            {role}
            <BiChevronDown className={`selectIcon ${isRoleOpen ? "open" : ""}`} />
          </button>
          {isRoleOpen && (
            <div className="selectMenu">
              {OPTIONS.map((el) => (
                <div
                  key={el}
                  className={`selectOption ${role === el ? "active" : ""}`}
                  onClick={() => {
                    setRole(el);
                    setIsRoleOpen(false);
                  }}
                >
                  {el}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className="Btn"
          disabled={role === "Role"}
          style={{ opacity: role === "Role" ? "0.8" : "1" }}
          onClick={handleSubmit}
        >
          LOG IN
        </button>
      </div>
    </div>
  );
}
