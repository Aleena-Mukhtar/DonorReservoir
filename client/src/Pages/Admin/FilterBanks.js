import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { IoSend } from 'react-icons/io5';
import LoggedInNavbar from "../Auth/LoggedInNavbar";

export default function FilterBanks(props) {
  const [banks, setBanks] = useState(null);
  const navigate = useNavigate();
  const { type } = useParams();
  console.log(type);
  useEffect(() => {
    axios(`http://localhost:5000/bloodBank/`)
      .then((data) => {
        setBanks(data.data.filter((el) => el.bloodTypes.includes(type)));
      })
      .catch((err) => console.log(err));
  }, []);
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
                    <th className="headText" align="center"></th>
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
                                <button className="sendBtn">
                                    <IoSend className="icon"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
  );
}