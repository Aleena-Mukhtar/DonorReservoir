import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function BankReplies() {
    const [notifications, setNotifications] = useState([1, 2, 3]);
    const navigate = useNavigate();
    const navigateToEachBankPage = () => {
        navigate(`/eachBank`);
    };
  return (
    <div className='bankReplies'>
        <table className="table">
            <thead className="tableHeader">
            <th className="headText" align="left">Blood Bank Notifications</th>
            </thead>
            <tbody className="tableBody">
                {
                    notifications?.map((el) => (
                        <tr
                        className="eachRow"
                        onClick={navigateToEachBankPage}
                    >
                        <td className="rowText" align="center">
                            <div>You got a reply From Aleena Donations Bank</div>
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
