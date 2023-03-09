import React from 'react';
import { Link } from 'react-router-dom';
import { BiCopyright } from 'react-icons/bi';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='Footer'>
      <div className='footerContent'>
        <div className='detail'>
          Our goal is to provide as much ease as possible so when do to you this that patient 
        </div>
        <div className='detail'>
          <Link className='link' to=''>Contact</Link>
          <Link className='link' to=''>Help Center</Link>
          <Link className='link' to=''>About Us</Link>
        </div>
      </div>
      <div className='DetailCon'>
        <div className='con1'>
          <div className='year'>
            <BiCopyright className='icon'/> 2022
          </div>
          <Link className='link' to=''>Terms of service</Link>
          <Link className='link' to=''>Privacy policy</Link>
        </div>
        <div className='socialCon'>
          <Link className='social'>
            <FaFacebookSquare className='icon'/>
          </Link>
          <Link className='social'>
            <FaInstagramSquare className='icon'/>
          </Link>
        </div>
      </div>
    </div>
  )
}
