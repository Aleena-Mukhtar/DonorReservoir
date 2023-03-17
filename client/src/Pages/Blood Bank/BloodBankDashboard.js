import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';

export default function BloodBankDashboard() {
    const navigate = useNavigate();
    const [btnClick, setBtnClick] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigateToEachPatientPage = () => {
    navigate(`/eachPatient`);
  };
  const navigateToEachBankPage = () => {
    navigate(`/eachBank`);
  };
  const navigateToBottleStockPage = () => {
    navigate(`/bottlesStock`);
  };
  return (
    <div className='adminDashboard bloodBankDashboard'>
        <div className = "heading">Blood Bank Dashboard</div>
        <div className='mainContent'>
        <div className="leftPanel">
            <div className='BtnDiv'>
                <button className={btnClick === 1 ? 'btn click' : 'btn'} onClick={(e) => setBtnClick(1)}>Notifications</button>
                <button className={btnClick === 2 ? 'btn click' : 'btn'} onClick={(e) => setBtnClick(2)}>History</button>
            </div>
            <button className='logoutBtn' onClick={(e) => setShowModal(!showModal)}>
                <AiOutlineLogout className='icon'/>
                <div className='label'>Log Out</div>
            </button>
        </div>
        <div className='rightPanel'>
            <div className='tableCon'>
                {
                    btnClick === 1 ? 
                    <table className='table'>
                        <thead className='tableHeader'>
                            <th className='headText' align='left'>Blood Bank Notifications</th>
                        </thead>
                        <tbody className='tableBody'>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='eachRow'>
                                <td className='rowText' align='center'>
                                    <div>Hospital name request for A+ Blood Bottles</div>
                                    <div className='detailsCon'>
                                        <div className='date'>20 December, 2022</div>
                                        <div className='time'>8:50 pm</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> :
                    <table className='table'>
                        <thead className='tableHeader'>
                            <th className='headText' align='center'>Hospital Name</th>
                            <th className='headText' align='center'>Blood Type</th>
                            <th className='headText' align='center'>Quantity</th>
                            <th className='headText' align='center'>Date</th>
                            <th className='headText' align='center'>Time</th>
                            <th className='headText' align='center'>Total Price (Rupees)</th>
                        </thead>
                        <tbody className='tableBody'>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                            <tr className='eachRow1'>
                                <td className='rowText' align='center'>National Hospital</td>
                                <td className='rowText' align='center'>B+</td>
                                <td className='rowText' align='center'>5</td>
                                <td className='rowText' align='center'>22 December, 2022</td>
                                <td className='rowText' align='center'>8:50 pm</td>
                                <td className='rowText' align='center'>600</td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
        </div>
        </div>
        <div className='logoutModal' style={{display: showModal ? 'flex' : 'none'}} onClick={(e) => setShowModal(false)}>
        <div className='logout'>
            <div className='modalHeading'>Confirm Logout</div>
            <div className='innerHeading'>Are you sure you want to logout?</div>
            <div className='btnCon'>
            <button className='cancelBtn' onClick={(e) => setShowModal(false)}>Cancel</button>
            <button className='okBtn'>OK</button>
            </div>
        </div>
        </div>
    </div>
  )
}
