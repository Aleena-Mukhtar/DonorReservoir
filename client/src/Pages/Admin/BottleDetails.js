import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function BottleDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState([1, 2, 3]); //isko empty array krna ha example k liy 123 likha ha

  useEffect(() => {
    // get data
  }, []);
  return (
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
                  AB+
                </td>
                <td className="rowText" align="center">
                  5
                </td>
                <td className="rowText" align="center">
                  150
                </td>
                <td className="rowText" align="center">
                  600
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
