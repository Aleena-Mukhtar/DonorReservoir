import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllBloodBanks({ check }) {
  const [banks, setBanks] = useState(null);
  const [filterBanks, setFilterBanks] = useState([]);
  const navigate = useNavigate();
  const navigateToEachDonorPage = (ID) => {
    navigate(`/eachBank/${ID}`);
  };
  useEffect(() => {
    axios(`http://localhost:5000/bloodBank/`)
      .then((data) => {
        setBanks(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (banks) {
      let _filteredData = banks;
      // agar star checked ha to sirf star waly ayen gy warna sb
      if (check) _filteredData = _filteredData.filter((el) => el.star);
      setFilterBanks(_filteredData);
    }
  }, [check, banks]);
  return (
    <div className="allDonors">
      <table className="table">
        <thead className="tableHeader">
          <th className="headText" align="center">
            Name
          </th>
          <th className="headText" align="center">
            Email
          </th>
          <th className="headText" align="center">
            Phone
          </th>
          <th className="headText" align="center">
            Address
          </th>
          <th className="headText" align="center">
            City
          </th>
        </thead>
        <tbody className="tableBody">
          {filterBanks?.map((el) => (
            <tr
              className="eachRow1"
              onClick={() => navigateToEachDonorPage(el._id)}
              key={el._id}
            >
              <td className="rowText" align="center">
                {el.bankName}
              </td>
              <td className="rowText" align="center">
                {el.email}
              </td>
              <td className="rowText" align="center">
                {el.phone}
              </td>
              <td className="rowText" align="center">
                {el.address}
              </td>
              <td className="rowText" align="center">
                {el.city}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}