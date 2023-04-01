import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BankReplies({ check, filters }) {
  const [notifications, setNotifications] = useState(null);
  const [filterNotifications, setFilterNotifications] = useState([]);
  const navigate = useNavigate();
  const navigateToEachBankPage = () => {
    navigate(`/eachBank`);
  };

  useEffect(() => {
    axios(`http://localhost:5000/donor/getAll/`)
      .then((data) => {
        console.log(data);
        setNotifications(data.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (notifications) {
      let _filteredData = notifications;
      console.log(_filteredData);
      if (filters !== "All") {
        // yahan pr all pending wagera wala filter lgy ga agar all ni ha
        _filteredData = notifications.filter((el) => el.status === filters);
      }
      // agar star checked ha to sirf star waly ayen gy warna sb
      if (check) _filteredData = _filteredData.filter((el) => el.star);
      setFilterNotifications(_filteredData);
    }
  }, [check, filters, notifications]);
  return (
    <div className="bankReplies">
      <table className="table">
        <thead className="tableHeader">
          <th className="headText" align="left">
            Blood Bank Notifications
          </th>
        </thead>
        <tbody className="tableBody">
          {filterNotifications?.map((el) => (
            <tr className="eachRow" onClick={navigateToEachBankPage}>
              <td className="rowText" align="center">
                <div>You got a reply From Aleena Donations Bank</div>
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
