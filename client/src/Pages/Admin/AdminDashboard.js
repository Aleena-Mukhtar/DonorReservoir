import React, { useState, useEffect, useRef } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsDropletFill, BsStarFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { FaClipboardList, FaUsers, FaHospital, FaUserInjured } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AllDonors from "./AllDonors";
import PatientRequests from "./PatientRequests";
import LoggedInNavbar from "../Auth/LoggedInNavbar";
import AllBloodBanks from "./AllBloodBanks";
import AllPatients from "./AllPatients";

const FILTER_OPTIONS = ["All", "Pending", "Rejected", "Approved"];

export default function AdminDashboard() {
  const [btnClick, setBtnClick] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [filters, setFilters] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateToBottleStockPage = () => {
    navigate(`/bottlesStock`);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    sessionStorage.setItem("isLoggedIn",false);
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    navigate(`/`);
  }
  return (
    <>
    <LoggedInNavbar/>
    <div className="adminDashboard">
      <div className="heading">
        <div className="mainTitle">Admin Dashboard</div>
        <div className="subTitle">Manage requests, donors, blood banks and patients from one place</div>
      </div>
      <div className="mainContent">
        <div className="leftPanel">
          <div className="BtnDiv">
            <button
              className={btnClick === 0 ? "btn click" : "btn"}
              onClick={navigateToBottleStockPage}
            >
              <BsDropletFill className="btnIcon" />
              <span>Bottles Stock</span>
            </button>
            <button
              className={btnClick === 1 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(1)}
            >
              <FaClipboardList className="btnIcon" />
              <span>Blood Requests</span>
            </button>
            <button
              className={btnClick === 3 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(3)}
            >
              <FaUsers className="btnIcon" />
              <span>Donors</span>
            </button>
            <button
              className={btnClick === 4 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(4)}
            >
              <FaHospital className="btnIcon" />
              <span>Blood Banks</span>
            </button>
            <button
              className={btnClick === 5 ? "btn click" : "btn"}
              onClick={(e) => setBtnClick(5)}
            >
              <FaUserInjured className="btnIcon" />
              <span>Patients</span>
            </button>
          </div>
          <button
            className="logoutBtn"
            onClick={(e) => setShowModal(!showModal)}
          >
            <AiOutlineLogout className="icon" />
            <div className="label">Log Out</div>
          </button>
        </div>
        <div className="rightPanel">
          {
            btnClick === 6 ? null :
            <div className="upperCon">
              <button
                type="button"
                className={check ? "starBtn active" : "starBtn"}
                onClick={() => setCheck(!check)}
              >
                <BsStarFill className="starIcon" />
                <span className="text">Starred</span>
              </button>
              {btnClick === 3 || btnClick === 4 || btnClick === 5 ? null : (
                <div className="filterSelect" ref={filterRef}>
                  <button
                    type="button"
                    className="filterToggle"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <span>{filters}</span>
                    <BiChevronDown className={`filterIcon ${isFilterOpen ? "open" : ""}`} />
                  </button>
                  {isFilterOpen && (
                    <div className="filterMenu">
                      {FILTER_OPTIONS.map((el) => (
                        <div
                          key={el}
                          className={`filterOption ${filters === el ? "active" : ""}`}
                          onClick={() => {
                            setFilters(el);
                            setIsFilterOpen(false);
                          }}
                        >
                          {el}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          }
          <div className="tableCon">
            {btnClick === 1 ? (
              <PatientRequests filters={filters} check={check} />
            ) : btnClick === 3 ? (
              <AllDonors check={check} />
            ) : btnClick === 4 ? (
              <AllBloodBanks check={check} />
            ) : btnClick === 5 ? (
              <AllPatients check={check} />
            ) : null}
          </div>
        </div>
      </div>
      <div
        className="logoutModal"
        style={{ display: showModal ? "flex" : "none" }}
        onClick={(e) => setShowModal(false)}
      >
        <div className="logout">
          <div className="modalHeading">Confirm Logout</div>
          <div className="innerHeading">Are you sure you want to logout?</div>
          <div className="btnCon">
            <button className="cancelBtn" onClick={(e) => setShowModal(false)}>
              Cancel
            </button>
            <button className="okBtn" onClick={handleLogout}>OK</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
