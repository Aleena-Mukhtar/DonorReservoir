import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { IoSend } from 'react-icons/io5';
import LoggedInNavbar from "../Auth/LoggedInNavbar";

const initialObj = {
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

export default function FilterDonors() {
  const [donors, setDonors] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bankName, setBankName] = useState('');
  const [data, setData] = useState(initialObj);
  const navigate = useNavigate();
  const { id } = useParams();
  const { type } = useParams();
  useEffect(() => {
    axios(`http://localhost:5000/donor/`)
      .then((data) => {
        setDonors(data.data.data.filter((el) => (el.bloodType === type)));
      })
      .catch((err) => console.log(err));
  }, []);

    const changeStatus = (Status) => {
        const data = {
            status: Status,
        };
        axios({
            url: `http://localhost:5000/bloodRequest/changeStatus/${id}`,
            method: "PUT",
            data: data,
            headers: {
                "content-type": "application/json",
            },
        })
        .then((res) => {
            if (res.data.success) {
                readRequest();
            } else {
                console.log(res);
            }
        })
        .catch((err) => console.log(err));
    };

    const readRequest = () => {
        const data = {
            read: true,
        };
        axios({
            url: `http://localhost:5000/bloodRequest/markAsRead/${id}`,
            method: "PUT",
            data: data,
            headers: {
                "content-type": "application/json",
            },
        })
        .then((res) => {
            if (res.data.success) {
            } else {
                console.log(res);
            }
        })
        .catch((err) => console.log(err));
    };

    const sendDonor = (ID) => {
        const data = {
            donorId: ID,
        };
        axios({
            url: `http://localhost:5000/bloodRequest/${id}`,
            method: "PUT",
            data: data,
            headers: {
                "content-type": "application/json",
            },
        })
        .then((res) => {
            if (res.data.success) {
                changeStatus('Approved');
                navigate(`/eachRequest/${id}`);
            } else {
                console.log(res);
            }
        })
        .catch((err) => console.log(err));
    };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSendEmail = (e) => {
    e.preventDefault();

    const config = {
      url: "http://localhost:5000/bankNotification/",
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
          navigate('/adminDashboard');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
    <LoggedInNavbar/>
    <div className="filterBanks filterDonors">
        <div className="BackButton">
            <button className="backBtn" onClick={() => navigate(-1)}>
                <HiOutlineArrowNarrowLeft className="icon" />
            </button>
        </div>
        <div className="heading">List of Donors willing to donate {type}</div>
        <div className="tableCon">
            <table className="table">
                <thead className="tableHeader">
                    <th className="headText" align="center">
                        Image
                    </th>
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
                        CNIC
                    </th>
                    <th className="headText" align="center">
                        Phone
                    </th>
                    <th className="headText" align="center">
                        Send
                    </th>
                </thead>
                <tbody className="tableBody">
                    {donors?.map((el) => (
                        <tr
                        className="eachRow1"
                        // onClick={() => navigateToEachDonorPage(el._id)}
                        key={el._id}
                        >
                            <td className="rowText" align="center">
                                <img src={el.img} alt="logo" className="DonorImg"/>
                            </td>
                            <td className="rowText" align="center">
                                {el.fname} {el.lname}
                            </td>
                            <td className="rowText" align="center">
                                {el.address}
                            </td>
                            <td className="rowText" align="center">
                                {el.email}
                            </td>
                            <td className="rowText" align="center">
                                {el.CNIC}
                            </td>
                            <td className="rowText" align="center">
                                {el.phone}
                            </td>
                            <td className="rowText" align="center">
                                <button className="sendBtn" onClick={() => sendDonor(el._id)}>
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
                    <div className="header">Bank Name: </div>
                    <input type="text" className="input" disabled={true} value={bankName}/>
                </div>
                <div className="fieldCon">
                    <div className="header">Blood Type: </div>
                    <input type="text" className="input" disabled={true} value={type}/>
                </div>
                <div className="fieldCon">
                    <div className="header">Bottle Count: </div>
                    <input type="number" className="input" name="count" onChange={(e) => handleChange(e)} value={data.count}/>
                </div>
                <div className="fieldCon">
                    <div className="header">Need Stock (In days): </div>
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