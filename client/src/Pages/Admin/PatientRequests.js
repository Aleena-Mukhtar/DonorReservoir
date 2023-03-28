import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function PatientRequests() {
    const [requests, setRequests] = useState([1, 2, 3]);
    const navigate = useNavigate();
    const navigateToEachPatientPage = () => {
        navigate(`/eachPatient`);
    };
  return (
    <div className='patientRequests'>
        <table className="table">
            <thead className="tableHeader">
            <th className="headText" align="left">Patient Blood Requests</th>
            </thead>
            <tbody className="tableBody">
                {
                    requests?.map((el) => (
                        <tr
                        className="eachRow"
                        onClick={navigateToEachPatientPage}
                    >
                        <td className="rowText" align="center">
                            <div>
                                Patient with ID 123456 Requested for Blood
                                Bottle(s)
                            </div>
                            <div className="detailsCon">
                                <div className="date">20 December, 2022</div>
                                <div className="time">8:50 pm</div>
                            </div>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}
