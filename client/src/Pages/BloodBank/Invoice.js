import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoggedInNavbar from '../Auth/LoggedInNavbar';

export default function Invoice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reply, setReply] = useState({});

    useEffect(() => {
        axios(`${process.env.REACT_APP_API_URL}/bankNotification/${id}`)
        .then((data) => {
          setReply(data.data);
        })
        .catch((err) => console.log(err));
    }, [id]);

  return (
    <>
    <LoggedInNavbar/>
    <div className='Invoice'>
        <div className='heading'>Generated Invoice Attached with Your Reply</div>
        <div className='mainContent'>
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
                            Unit Price (PKR)
                        </th>
                        <th className="headText" align="center">
                            Total (PKR)
                        </th>
                    </thead>
                    <tbody className="tableBody">
                        <tr className="eachRow">
                            <td className="rowText" align="center">
                                {reply?.bloodType}
                            </td>
                            <td className="rowText" align="center">
                                {reply?.count}
                            </td>
                            <td className="rowText" align="center">
                                {reply?.reply?.unitPrice}
                            </td>
                            <td className="rowText" align="center">
                                {parseInt(reply?.count)  * parseInt(reply?.reply?.unitPrice)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="billDetails">
                <div className="details">
                    <div className="eachDetail">
                        <div className="header">SubTotal (PKR):</div>
                        <div className="value">{parseInt(reply?.count)  * parseInt(reply?.reply?.unitPrice)}</div>
                    </div>
                    <div className="eachDetail">
                        <div className="header">Discount (%):</div>
                        <div className="value">{reply?.reply?.discount}</div>
                    </div>
                    <div className="eachDetail">
                        <div className="header">Shipping (PKR):</div>
                        <div className="value">{reply?.reply?.shipping}</div>
                    </div>
                    <div className="eachDetail total">
                        <div className="header">Total (PKR):</div>
                        <div className="value">{((parseInt(reply?.count)  * parseInt(reply?.reply?.unitPrice)) - ((parseInt(reply?.count)  * parseInt(reply?.reply?.unitPrice)) * (parseFloat(reply?.reply?.discount)/100))) + parseInt(reply?.reply?.shipping)}</div>
                    </div>
                </div>
            </div>
        </div>
        <button className='doneBtn' onClick={(e) => navigate("/bankNotifications")}>Done</button>
    </div>
    </>
  )
}
