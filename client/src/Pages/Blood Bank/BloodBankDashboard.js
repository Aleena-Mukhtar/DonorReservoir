import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BloodBankDashboard() {
    const navigate = useNavigate();
  return (
    <div className='bloodBankDashboard'>
        <div className='heading'>History and Blood Donation Report</div>
        <div className='tableCon'>
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
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>National Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>National Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>Punjab Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>Punjab Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>Punjab Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>National Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>National Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>National Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>National Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>National Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>National Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                    <tr className='eachRow'>
                        <td className='rowText' align='center'>National Hospital</td>
                        <td className='rowText' align='center'>B+</td>
                        <td className='rowText' align='center'>5</td>
                        <td className='rowText' align='center'>22 December, 2022</td>
                        <td className='rowText' align='center'>8:50 pm</td>
                        <td className='rowText' align='center'>600</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
