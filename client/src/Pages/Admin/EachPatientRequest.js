import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft, HiIdentification } from 'react-icons/hi';
import { FaUserCheck, FaAddressBook, FaPrescriptionBottleAlt } from 'react-icons/fa';
import { BsCalendar2DateFill, BsTelephoneOutboundFill, BsFillBookmarkStarFill } from 'react-icons/bs';
import { MdOutlineAccessTimeFilled, MdEmail, MdBloodtype, MdDelete } from 'react-icons/md';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

export default function EachPatientRequest() {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDenyModal, setShowDenyModal] = useState(false);
    const [starred, setStarred] = useState(false);
    const [status, setStatus] = useState('notSet');
  return (
    <div className='eachDonor eachPatientRequest'>
        <div className='topDiv'>
            <button className='backBtn' onClick={() => navigate(-1)}>
                <HiOutlineArrowNarrowLeft className='icon'/>
            </button>
            <div className='imgDiv'>
                <img
                    src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                    alt="logo"
                    className="donor-img"
                />
            </div>
        </div>
        <div className='MainContent'>
            <div className='nameDiv'>
                <div className='name'>Patient Name</div>
                <div className='BtnCon'>
                    <button className='starBtn btn' onClick={(e) => setStarred(!starred)}>
                        {
                            starred ? 
                            <AiFillStar className='icon'/> : <AiOutlineStar className='icon'/>
                        }
                    </button>
                    <button className='deleteBtn btn' onClick={(e) => setShowDeleteModal(!showDeleteModal)}>
                        <MdDelete className='icon'/>
                    </button>
                    {
                        status === 'notSet' ? 
                        <>
                            <button className='denyBtn btn1' onClick={(e) => setShowDenyModal(!showDenyModal)}>Deny</button>
                            <button className='approveBtn btn1' onClick={(e) => setStatus('approve')}>Approve</button>
                        </> :  null
                    }
                </div>
            </div>
            <div className='rightPanel'>
                <div className='DetailCon'>
                    <div className='header'>
                        <FaUserCheck className='icon colorIcon'/>
                    </div>
                    <div className='text'>123456789101112</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <BsCalendar2DateFill className='icon'/>
                    </div>
                    <div className='text'>December 23, 2023</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <MdOutlineAccessTimeFilled className='icon colorIcon'/>
                    </div>
                    <div className='text'>8:15 pm</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <FaAddressBook className='icon'/>
                    </div>
                    <div className='text'>House # 12, Street # 34 Block A Lahore Punjab</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <HiIdentification className='icon colorIcon'/>
                    </div>
                    <div className='text'>35202-1234567-0</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <BsTelephoneOutboundFill className='icon'/>
                    </div>
                    <div className='text'>12345678910</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <BsTelephoneOutboundFill className='icon colorIcon'/>
                    </div>
                    <div className='text'>12345678910</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <MdEmail className='icon'/>
                    </div>
                    <div className='text'>patient@gmail.com</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <MdBloodtype className='icon colorIcon'/>
                    </div>
                    <div className='text'>B+</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <FaPrescriptionBottleAlt className='icon'/>
                    </div>
                    <div className='text'>3</div>
                </div>
                <div className='DetailCon'>
                    <div className='header'>
                        <BsFillBookmarkStarFill className='icon colorIcon'/>
                    </div>
                    <div className={status === 'approve' ? 'text Astatus' : 'text Dstatus'}>
                        {
                            status === 'deny' ? 'Denied' : status === 'approve' ? 'Approved' : 'Pending'
                        }
                    </div>
                </div>
            </div>
        </div>
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
