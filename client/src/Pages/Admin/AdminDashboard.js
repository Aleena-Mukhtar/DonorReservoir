import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className='adminDashboard'>
        <div className='heading'>Dashboard
        <div className='btn'>share</div>
        <Link to='/login'>login</Link>
        </div>
    </div>
  )
}
