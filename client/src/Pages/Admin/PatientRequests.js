/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PatientRequests({ check, filters }) {
  const [requests, setRequests] = useState(null);
  const [filterRequests, setFilterRequests] = useState([]);
  const navigate = useNavigate();
  const navigateToEachPatientPage = (ID) => {
    navigate(`/eachRequest/${ID}`);
  };

  useEffect(() => {
    axios(`http://localhost:5000/bloodRequest/`)
      .then((data) => {
        console.log(data);
        setRequests(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (requests) {
      let _filteredData = requests;
      console.log(_filteredData);
      requests.forEach(ele => {
        ele.time = DisplayCurrentTime(new Date(ele.createdAt.toString()));
      });
      if (filters !== "All") {
        _filteredData = requests.filter((el) => el.status === filters);
      }
      if (check) _filteredData = _filteredData.filter((el) => el.star);
      setFilterRequests(_filteredData);
    }
  }, [check, filters, requests]);

  function DisplayCurrentTime(date) {
    console.log(date);
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return ( hours + ":" + minutes + " " + am_pm);
  }

  return (
    <div className="patientRequests">
      <table className="table">
        <thead className="tableHeader">
          <th className="headText" align="left">
            Patient Blood Requests History
          </th>
        </thead>
        <tbody className="tableBody">
          {filterRequests?.map((el) => (
            <tr className="eachRow" onClick={() => navigateToEachPatientPage(el._id)} key={el._id}>
              <td className="rowText" align="center" style={{fontWeight: el.read ? 'normal' : 'bold'}}>
                <div>Patient Requested {el.count} Blood Bottles of {el.bloodType}</div>
                <div className="detailsCon">
                  <div className="date">{new Date(el.createdAt.toString())?.toDateString()}</div>
                  <div className="time">{el.time}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
