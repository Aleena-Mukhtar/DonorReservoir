import React, { useState } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { BsFillStarFill } from 'react-icons/bs';

export default function EachPatientRequest() {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDenyModal, setShowDenyModal] = useState(false);
    const [starred, setStarred] = useState(false);
    const [status, setStatus] = useState('notSet');
  return (
    <div className='eachPatientRequest'>
        <button className='backBtn' onClick={() => navigate(-1)}>
            <HiOutlineArrowNarrowLeft className='icon'/>
        </button>
        <div className='heading'>Patient Details</div>
        <div className='BtnCon'>
            <button className='starBtn' style={{backgroundColor: starred ? '#b81d1d' : '#FFFFFF'}} onClick={(e) => setStarred(!starred)}>
                <BsFillStarFill className='icon' style={{color: starred ? '#FFFFFF' : '#b81d1d'}}/>
            </button>
            <button className='deleteBtn' onClick={(e) => setShowDeleteModal(!showDeleteModal)}>
                <MdDelete className='icon'/>
            </button>
        </div>
        <div className='imgDiv'>
            <img
                src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                alt="logo"
                className="patient-img"
            />
        </div>
        <div className='DetailCon'>
            <div className='header'>Patient ID:</div>
            <div className='text'>123456</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>Date:</div>
            <div className='text'>22 December, 2023</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>Time:</div>
            <div className='text'>8:50 pm</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>Patient Name:</div>
            <div className='text'>First Last Name</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>Address:</div>
            <div className='text'>House # 12, Street # 34 Block A Lahore Punjab</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>CNIC:</div>
            <div className='text'>35202-12345678-0</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>Phone Number 1: </div>
            <div className='text'>12345678910</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>Phone Number 2: </div>
            <div className='text'>12345678910</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>Email: </div>
            <div className='text'>patient@gmail.com</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>Blood Type:</div>
            <div className='text'>B+</div>
        </div>
        <div className='DetailCon'>
            <div className='header'>Blood Bottles Count: </div>
            <div className='text'>3</div>
        </div>
        {
            status === 'notSet' ? 
            <div className='BtnCon BtnCon1'>
                <button className='denyBtn' onClick={(e) => setShowDenyModal(!showDenyModal)}>Deny</button>
                <button className='approveBtn' onClick={(e) => setStatus('approve')}>Approve</button>
            </div> :
            status === 'deny' ? 
            <div className='DetailCon'>
                <div className='header'>Request Status: </div>
                <div className='text Dstatus'>Denied</div>
            </div> :
            status === 'approve' ? 
            <div className='DetailCon'>
                <div className='header'>Request Status: </div>
                <div className='text Astatus'>Approved</div>
            </div> : null
        }
        <div className='logoutModal' style={{display: showDeleteModal ? 'flex' : 'none'}} onClick={(e) => setShowDeleteModal(false)}>
            <div className='logout'>
                <div className='modalHeading'>Confirm Delete</div>
                <div className='innerHeading'>Are you sure you want to delete this request?</div>
                <div className='btnCon'>
                    <button className='cancelBtn' onClick={(e) => setShowDeleteModal(false)}>Cancel</button>
                    <button className='okBtn'>OK</button>
                </div>
            </div>
        </div>
        <div className='logoutModal' style={{display: showDenyModal ? 'flex' : 'none'}} onClick={(e) => setShowDenyModal(false)}>
            <div className='logout'>
                <div className='modalHeading'>Confirm Deny</div>
                <div className='innerHeading'>Are you sure you want to delete this request?</div>
                <div className='innerHeading' style={{color: 'red'}}>By this action that patient is unable to recieve blood.</div>
                <div className='btnCon'>
                    <button className='cancelBtn' onClick={(e) => setShowDenyModal(false)}>Cancel</button>
                    <button className='okBtn' onClick={(e) => setStatus('deny')}>OK</button>
                </div>
            </div>
        </div>
    </div>
  )
}
