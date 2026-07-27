import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllPatients({ check }) {
  const [patients, setPatients] = useState(null);
  const [filterPatients, setFilterPatients] = useState([]);
  const navigate = useNavigate();
  const navigateToEachPatientPage = (ID) => {
    navigate(`/eachPatient/${ID}`);
  };
  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/patient/`)
      .then((data) => {
        setPatients(data.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (patients) {
      let _filteredData = patients;
      if (check) _filteredData = _filteredData.filter((el) => el.star);
      setFilterPatients(_filteredData);
    }
  }, [check, patients]);
  return (
    <div className="allDonors">
      <table className="table">
        <thead className="tableHeader">
          <th className="headText" align="center">
            First Name
          </th>
          <th className="headText" align="center">
            Email
          </th>
          <th className="headText" align="center">
            Phone
          </th>
          <th className="headText" align="center">
            CNIC
          </th>
          <th className="headText" align="center">
            City
          </th>
        </thead>
        <tbody className="tableBody">
          {filterPatients?.length === 0 ? (
            <tr className="emptyRow">
              <td className="emptyText" colSpan={5}>No patients to show yet</td>
            </tr>
          ) : (
            filterPatients?.map((el) => (
              <tr
                className="eachRow1"
                onClick={() => navigateToEachPatientPage(el._id)}
                key={el._id}
              >
                <td className="rowText" align="center">
                  {el.fname}
                </td>
                <td className="rowText" align="center">
                  {el.email}
                </td>
                <td className="rowText" align="center">
                  {el.phone}
                </td>
                <td className="rowText" align="center">
                  {el.CNIC}
                </td>
                <td className="rowText" align="center">
                  {el.city}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}