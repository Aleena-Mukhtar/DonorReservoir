import React from 'react';

export default function Navbar() {
  return (
    <div className='navbar'>
      Navbar
      <img class="Logo" src={process.env.PUBLIC_URL + '/patient-image.jpg'} alt="logo" /> 
      <div className='navClass'>
        Logo
      </div>
    </div>
  )
}
