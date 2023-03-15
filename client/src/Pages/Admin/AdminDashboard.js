import React, { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

export default function AdminDashboard() {
  const [btnClick, setBtnClick] = useState(false);
  return (
    <div className='adminDashboard'>
      <div className = "heading">Admin Dashboard</div>
      <div className='mainContent'>
        <div className="leftPanel">
          <div className='BtnDiv'>
            <button className={btnClick ? 'btn click' : 'btn'} onClick={(e) => setBtnClick(!btnClick)}>Details of Bottles</button>
            <button className={btnClick ? 'btn' : 'btn click'} onClick={(e) => setBtnClick(!btnClick)}>History</button>     
          </div>
          <button className='logoutBtn'>
            <AiOutlineLogout className='icon'/>
            <div className='label'>Log Out</div>
          </button>
        </div>
        <div className='rightPanel'>
          <div className='upperCon'>
            <div className='starBtn'>
              <div className='text'>Starred</div>
              <input className='checkbox' type='checkbox'></input>
            </div>
            <select className='select'>
              <option>All</option>
              <option>Pending</option>
              <option>Rejected</option>
              <option>Approved</option>
            </select>
          </div>
          <div className='tableCon'>
            <table className='table'>
              <thead className='tableHeader'>
                <th className='headText' align='center'>Donor ID</th>
                <th className='headText' align='center'>Name</th>
                <th className='headText' align='center'>CNIC</th>
                <th className='headText' align='center'>Blood Type</th>
                <th className='headText' align='center'>Date</th>
              </thead>
              <tbody className='tableBody'>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Aleena</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Alishbah</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Maniha</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Tanzeela</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Mahnoor</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Aleena</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Alishbah</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Maniha</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Tanzeela</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Mahnoor</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Aleena</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Alishbah</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Maniha</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Tanzeela</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
                <tr className='eachRow'>
                  <td className='rowText' align='center'>123456</td>
                  <td className='rowText' align='center'>Mahnoor</td>
                  <td className='rowText' align='center'>35202-1234567-0</td>
                  <td className='rowText' align='center'>O+</td>
                  <td className='rowText' align='center'>20 December, 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
