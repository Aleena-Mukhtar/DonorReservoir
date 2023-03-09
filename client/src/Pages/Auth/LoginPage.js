import React from 'react'

export default function LoginPage() {
  return (
    <div className='login'>
        <div className='mainContent'>
            <div className='headingCon'>
                <div className='header'>Log In to</div>
                <div className='mainHeading'>Blood Reservoir</div>
            </div>
            <div className='fieldCon'>
                <div className='field'>Email</div>
                <input className='input' placeholder='' type='text'/>
            </div>
            <div className='fieldCon'>
                <div className='field'>Password</div>
                <input className='input' placeholder='' type='password'/>
            </div>
            <select className='select'>
                <option>Role</option>
                <option>Admin</option>
                <option>Patient</option>
                <option>Blood Bank</option>
            </select>
            <button className='Btn'>LOG IN</button>
        </div>
    </div>
  )
}
