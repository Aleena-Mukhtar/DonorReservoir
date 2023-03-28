import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllDonors(props) {
    console.log(props.Check);
    const [donors, setDonors] = useState([]);
    const navigate = useNavigate();
    const navigateToEachDonorPage = (ID) => {
        console.log(ID);
        navigate(`/eachDonor/${ID}`);
    };
    useEffect(() => {
        axios(`http://localhost:5000/donor/getAll/`)
        .then(data=>{
            console.log(data);
            if(props.Check){
                setDonors(donors.filter(donor => donor.star === props.Check));
            }
            else{
                setDonors(data.data.data);
            }
        })
        .catch(err=>console.log(err));
    }, [props.Check]);
    return (
        <div className='allDonors'>
            <table className="table">
                <thead className="tableHeader">
                    <th className="headText" align="center">Name</th>
                    <th className="headText" align="center">Email</th>
                    <th className="headText" align="center">Phone</th>
                    <th className="headText" align="center">Blood Type</th>
                </thead>
                <tbody className="tableBody">
                    {donors?.map((el) => (
                        <tr className="eachRow1" onClick={() => navigateToEachDonorPage(el._id)}>
                            <td className="rowText" align="center">{el.fname}</td>
                            <td className="rowText" align="center">{el.email}</td>
                            <td className="rowText" align="center">{el.phone}</td>
                            <td className="rowText" align="center">{el.bloodType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
