import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoggedInNavbar from "../Auth/LoggedInNavbar";

export default function BottleDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios(`http://localhost:5000/bloodBottle/`)
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <LoggedInNavbar/>
    <div className="bottleDetails">
      <button className="backBtn" onClick={(e) => navigate(-1)}>
        <HiOutlineArrowNarrowLeft className="icon" />
      </button>
      <div className="heading">Available Blood Bottles Stock</div>
      <div className="tableCon">
        <table className="table">
          <thead className="tableHeader">
            <th className="headText" align="center">
              Blood Type
            </th>
            <th className="headText" align="center">
              Quantity
            </th>
            <th className="headText" align="center">
              Unit Price (Rupees)
            </th>
            <th className="headText" align="center">
              Total (Rupees)
            </th>
          </thead>
          <tbody className="tableBody">
            {data.map((el) => (
              <tr className="eachRow">
                <td className="rowText" align="center">
                  {el?.bloodType}
                </td>
                <td className="rowText" align="center">
                  {el?.count}
                </td>
                <td className="rowText" align="center">
                  {el.unitPrice}
                </td>
                <td className="rowText" align="center">
                  {(parseInt(el?.unitPrice) * parseInt(el?.count))}
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
