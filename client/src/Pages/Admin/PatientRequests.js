/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PatientRequests({ check, filters }) {
  const [requests, setRequests] = useState(null);
  const [filterRequests, setFilterRequests] = useState([]);
  const navigate = useNavigate();
  const navigateToEachPatientPage = () => {
    navigate(`/eachPatient`);
  };

  useEffect(() => {
    axios(`http://localhost:5000/donor/getAll/`)
      .then((data) => {
        console.log(data);
        setRequests(data.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (requests) {
      let _filteredData = requests;
      console.log(_filteredData);
      if (filters !== "All") {
        // yahan pr all pending wagera wala filter lgy ga agar all ni ha
        _filteredData = requests.filter((el) => el.status === filters);
      }
      // agar star checked ha to sirf star waly ayen gy warna sb
      if (check) _filteredData = _filteredData.filter((el) => el.star);
      setFilterRequests(_filteredData);
    }
  }, [check, filters, requests]);
  return (
    <div className="patientRequests">
      <table className="table">
        <thead className="tableHeader">
          <th className="headText" align="left">
            Patient Blood Requests
          </th>
        </thead>
        <tbody className="tableBody">
          {filterRequests?.map((el) => (
            <tr className="eachRow" onClick={navigateToEachPatientPage}>
              <td className="rowText" align="center">
                <div>Patient with ID 123456 Requested for Blood Bottle(s)</div>
                <div className="detailsCon">
                  <div className="date">20 December, 2022</div>
                  <div className="time">8:50 pm</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
