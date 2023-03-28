import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function BottleDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {bloodType: 'AB+', quantity: '5', unitPrice: '150', totalPrice: '600'},
    {bloodType: 'AB-', quantity: '5', unitPrice: '150', totalPrice: '600'},
    {bloodType: 'A+', quantity: '5', unitPrice: '150', totalPrice: '600'},
    {bloodType: 'A-', quantity: '5', unitPrice: '150', totalPrice: '600'},
    {bloodType: 'B+', quantity: '5', unitPrice: '150', totalPrice: '600'},
    {bloodType: 'B-', quantity: '5', unitPrice: '150', totalPrice: '600'},
    {bloodType: 'O+', quantity: '5', unitPrice: '150', totalPrice: '600'},
    {bloodType: 'O-', quantity: '5', unitPrice: '150', totalPrice: '600'},
  ]);

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
                <td className="rowText" align="center">{el.bloodType}</td>
                <td className="rowText" align="center">{el.quantity}</td>
                <td className="rowText" align="center">{el.unitPrice}</td>
                <td className="rowText" align="center">{el.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
