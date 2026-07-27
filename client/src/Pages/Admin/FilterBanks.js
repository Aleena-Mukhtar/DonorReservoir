import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { IoSend } from 'react-icons/io5';
import LoggedInNavbar from "../Auth/LoggedInNavbar";

const initialObj = {
    bank_id: "",
    bankName: "",
    hospitalName: "",
    count: "",
    days: "",
    bloodType: "",
    reply: {
        unitPrice: "",
        discount: "",
        shipping: "",
        read: false,
    },
};

export default function FilterBanks() {
  const [banks, setBanks] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bankName, setBankName] = useState('');
  const [data, setData] = useState(initialObj);
  const navigate = useNavigate();
  const { type, ID } = useParams();
  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/bloodBank/`)
      .then((data) => {
        setBanks(data.data.filter((el) => el.bloodTypes.includes(type)));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEmail = (name, ID) => {
    setBankName(name);
    setShowModal(true);
    setData({ ...data, hospitalName: 'Blood Reservoir Management Hospital', bloodType: type, bankName: name, bank_id: ID });
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  }

  function validateDonor(patient) {

        const validationRules = {
            hospitalName: {
                required: true,
            },
            bankName: {
                required: true,
            },
            bloodType: {
                required: true,
            },
            count: {
                required: true,
            },
            days: {
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
        }
        }
        return true;
    }


  const handleSendEmail = (e) => {
    e.preventDefault();

    const isDataValid = validateDonor(data);
    if(isDataValid){
        const config = {
            url: `${process.env.REACT_APP_API_URL}/bankNotification/`,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
        };
    
        axios(config)
        .then(function (response) {
            if (response.data.error) {
            alert(response.data.message);
            } else {
            alert('Email Send Successfully!');
            setShowModal(false);
            handleNotificationDelete();
            navigate('/adminDashboard');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }

    const handleNotificationDelete = () => {
        const config = {
        url: `${process.env.REACT_APP_API_URL}/adminNotification/${ID}`,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        };

        axios(config)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

  return (
    <>
    <LoggedInNavbar/>
    <div className="filterBanks">
        <div className="BackButton">
            <button className="backBtn" onClick={() => navigate(-1)}>
                <HiOutlineArrowNarrowLeft className="icon" />
            </button>
        </div>
        <div className="heading">List of Blood Banks contain {type}</div>
        <div className="tableCon">
            <table className="table">
                <thead className="tableHeader">
                    <th className="headText" align="center">
                        Name
                    </th>
                    <th className="headText" align="center">
                        Address
                    </th>
                    <th className="headText" align="center">
                        Email
                    </th>
                    <th className="headText" align="center">
                        City
                    </th>
                    <th className="headText" align="center">
                        Send Email
                    </th>
                </thead>
                <tbody className="tableBody">
                    {banks?.map((el) => (
                        <tr
                        className="eachRow1"
                        //   onClick={() => navigateToEachDonorPage(el._id)}
                        key={el._id}
                        >
                            <td className="rowText" align="center">
                                {el.bankName}
                            </td>
                            <td className="rowText" align="center">
                                {el.address}
                            </td>
                            <td className="rowText" align="center">
                                {el.email}
                            </td>
                            <td className="rowText" align="center">
                                {el.city}
                            </td>
                            <td className="rowText" align="center">
                                <button className="sendBtn" onClick={() => handleEmail(el.bankName, el._id)}>
                                    <IoSend className="icon"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div
            className="logoutModal"
            style={{ display: showModal ? "flex" : "none" }}
        >
            <div className="logout">
                <div className="modalHeading">Blood Request Integration</div>
                <div className="innerHeading">Fill some data for blood request Please:</div>
                <div className="fieldCon">
                    <div className="header">Bank Name: <span style={{color: 'red'}}>*</span></div>
                    <input type="text" className="input" disabled={true} value={bankName}/>
                </div>
                <div className="fieldCon">
                    <div className="header">Blood Type: <span style={{color: 'red'}}>*</span></div>
                    <input type="text" className="input" disabled={true} value={type}/>
                </div>
                <div className="fieldCon">
                    <div className="header">Bottle Count: <span style={{color: 'red'}}>*</span></div>
                    <input type="number" className="input" name="count" onChange={(e) => handleChange(e)} value={data.count}/>
                </div>
                <div className="fieldCon">
                    <div className="header">Need Stock (In days): <span style={{color: 'red'}}>*</span></div>
                    <input type="number" className="input" name="days" onChange={(e) => handleChange(e)} value={data.days}/>
                </div>
                <div className="btnCon">
                    <button className="cancelBtn" onClick={(e) => setShowModal(false)}>
                        Cancel
                    </button>
                    <button className="okBtn" onClick={handleSendEmail}>Send</button>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}