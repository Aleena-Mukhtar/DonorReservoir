import React, { useEffect, useState, useRef } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoggedInNavbar from '../Auth/LoggedInNavbar';
import { GoRequestChanges } from 'react-icons/go';

export default function EachPatientRequest() {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDenyModal, setShowDenyModal] = useState(false);
    const [starred, setStarred] = useState(false);
    const [status, setStatus] = useState('Pending');
    const role = sessionStorage.getItem("role");
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [patient, setPatient] = useState({});
    const [donor, setDonor] = useState(null);
    const [request, setRequest] = useState({});
    const [bottle, setBottle] = useState({});
    const bankSection = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {}, [showModal]);
    useEffect(() => {
        axios(`http://localhost:5000/bloodRequest/${id}`)
        .then((data) => {
            setRequest(data.data);
            data.data.time = DisplayCurrentTime(new Date(data.data.createdAt.toString()));
            axios(`http://localhost:5000/bloodBottle/${data.data.bloodType}`)
            .then((data) => {
                console.log(data.data);
                setBottle(data.data.data);
            })
            .catch((err) => console.log(err));
            axios(`http://localhost:5000/patient/${data.data.patient_id}`)
            .then((data) => {
                setPatient(data.data.data[0]);
            })
            .catch((err) => console.log(err));
            if(data.data.donor_id){
                axios(`http://localhost:5000/donor/get/${data.data.donor_id}`)
                .then((data) => {
                    console.log(data.data.data[0]);
                    setDonor(data.data.data[0]);
                })
                .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));
    }, [status]);

    function DisplayCurrentTime(date) {
        console.log(date);
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        let am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        let minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return ( hours + ":" + minutes + " " + am_pm);
    }

    const changeStatus = (Status) => {
        const data = {
            status: Status,
        };
        axios({
            url: `http://localhost:5000/bloodRequest/changeStatus/${id}`,
            method: "PUT",
            data: data,
            headers: {
                "content-type": "application/json",
            },
        })
        .then((res) => {
            if (res.data.success) {
                setStatus(res.data.data.status);
                console.log("Status Changed Successfully");
                readRequest();
            } else {
                console.log(res);
            }
        })
        .catch((err) => console.log(err));
    };

    const readRequest = () => {
        const data = {
            read: true,
        };
        axios({
            url: `http://localhost:5000/bloodRequest/markAsRead/${id}`,
            method: "PUT",
            data: data,
            headers: {
                "content-type": "application/json",
            },
        })
        .then((res) => {
            if (res.data.success) {
                console.log("Mark as read Successfully");
            } else {
                console.log(res);
            }
        })
        .catch((err) => console.log(err));
    };

    const AcceptBottle = (Type) => {
        axios(`http://localhost:5000/bloodBottle/${Type}`)
        .then((data) => {
            console.log(data.data.data);
            const count = parseInt(data.data.data.count) - parseInt(request?.count);
            if(count < 5) handleSendAlert(Type);
            if(count < 0) {
                handleUpdateBottle(0, Type);
                handleGivenBottle(data.data.data.count, request?._id);
                setShowDeleteModal(true);
            }
            else{
                handleUpdateBottle(count, Type);
                handleGivenBottle(count, request?._id);
            }
        })
        .catch((err) => console.log(err));
    }

    const handleSendAlert = (type) => {    
        const config = {
          url: "http://localhost:5000/adminNotification/",
          method: "POST",
          data: JSON.stringify({
            bloodType: type
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
    
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.data.error) {
                    console.log(response.data.message);
                } else {
                    console.log('Alert Send Successfully!');
                }
            })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleGivenBottle = (Count, ID) => {
        axios({
            url: `http://localhost:5000/bloodRequest/giveBottles/${ID}`,
            method: "PUT",
            data: JSON.stringify({ bottles: Count.toString() }),
            headers: {
              "content-type": "application/json"
            }
        })
        .then(res => {
            if (res.data.success) {
                console.log(res);
                console.log("Bottles Assigned Successfully");
                changeStatus('Approved');
            }
            else {
                console.log(res);
            }
        })
    }

    const handleUpdateBottle = (Count, type) => {
        const data = {
            count: Count.toString()
        }
        axios({
            url: `http://localhost:5000/bloodBottle/${type}`,
            method: "PUT",
            data: JSON.stringify(data),
            headers: {
              "content-type": "application/json"
            }
        })
        .then(res => {
            if (res.data.success) {
                console.log(res);
                console.log("Bottle's data Updated Successfully");
                changeStatus('Approved');
            }
            else {
                console.log(res);
            }
        })
    }

    const handleLogout = () => {
        sessionStorage.removeItem('userData');
        sessionStorage.setItem("isLoggedIn",false);
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('role');
        navigate(`/`);
    }

    const scrollDown = (ref) => {
        window.scrollTo({
          top: ref.current.offsetTop,
          behavior: 'smooth',
        });
    };

  return (
    <>
    <LoggedInNavbar/>
    <div className='editProfile eachBank eachRequest'>
        <div className='con1'>
            <div className='innerCon'>
                <div className='mainHeading'>Request Detail</div>
                <div className='userContent'>
                    <BiUser className='icon'/>
                    <div className='label'>Patient Info</div>
                </div>
                <div className='userContent' onClick={() => scrollDown(bankSection)}>
                    <GoRequestChanges className='icon'/>
                    <div className='label'>Request Info</div>
                </div>
            </div>
            <button className='logoutBtn' onClick={(e) => setShowLogoutModal(!showLogoutModal)}>
                <AiOutlineLogout className='icon'/>
                <div className='label'>Log Out</div>
            </button>
        </div>
        <div className='editProfileContent'>
            <div className='pictureCon'>
                <img 
                    src={patient?.img}
                    alt="logo" 
                    className="edit-img" 
                />
                <div className='detailCon'>
                    <div className='nameCon'>{patient?.lname} {patient?.fname}</div>
                    <div className='address'>{new Date(request?.createdAt?.toString())?.toDateString()} {request?.time}</div>
                </div>
            </div>
            <div className='formFields'>
                <div className="heading">Patient Information :</div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>First Name</div>
                        <input 
                            className='input' 
                            type='text' 
                            disabled={true}
                            value={patient?.fname}
                            name="fname"
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Last Name</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={patient?.lname}
                            name="lname" 
                        />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Address</div>
                        <input 
                            className='input' 
                            type='text' 
                            disabled={true}
                            value={patient?.address}
                            name="address"
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>City</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={patient?.city}
                            name="city"
                        />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Phone Number</div>
                        <input 
                            className='input' 
                            type='text' 
                            disabled={true}
                            value={patient?.phone}
                            name="phone"
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Mobile Number</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={patient?.phone2}
                            name="phone2" 
                        />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Email</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={patient?.email}
                            name="email"
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>CNIC</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={patient?.CNIC}
                            name="CNIC" 
                        />
                    </div>
                </div>
                <div className="heading" ref={bankSection}>Blood Request Information :</div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Hospital Name</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={request?.hospitalName}
                            name="hospitalName" 
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Blood Type Need</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={request?.bloodType}
                            name="bloodType" 
                        />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Days</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={request?.days}
                            name="days" 
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Bottle Count</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={request?.count}
                            name="count" 
                        />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Status</div>
                        <input 
                            className='input' 
                            type='text'
                            disabled={true}
                            value={request?.status}
                            style={{color: request?.status === 'Approved' ? 'green' : 'red' , fontWeight: 'bolder'}}
                            name="status" 
                        />
                    </div>
                </div>
            </div>
            {
                request?.status === 'Pending' && role === 'Admin' ?
                <div className='BtnCon'>
                    <button className='backBtn' onClick={(e) => setShowDenyModal(!showDenyModal)}>Deny Request</button>
                    <button className='saveBtn' onClick={() => AcceptBottle(request?.bloodType)}>Approve Request</button>
                </div> : null
            }
            {
                request?.status === 'Denied'?
                <div style={{color: 'red'}}>Sorry, Your request is denied by admin.</div> : null
            }
            {
                request?.status === 'Approved'?
                <div style={{color: 'green'}}>Congratulations, Your request is Approved. The attached invoice is sent to finance department and will be added in your bill.</div> : null
            }
            {
                request?.status === 'Pending'?
                <div>Waiting for admin to review.</div> : null
            }
            {
                request?.status === 'Pending' ? null : 
                <div className='Invoice'>
                    <div className='heading'>Generated Invoice Attached with Your Reply</div>
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
                                    {request?.bloodType}
                                </td>
                                <td className="rowText" align="center">
                                    {request?.givenCount}
                                </td>
                                <td className="rowText" align="center">
                                    {bottle?.unitPrice}
                                </td>
                                <td className="rowText" align="center">
                                    {parseInt(request?.givenCount)  * parseInt(bottle?.unitPrice)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            {
                donor ? 
                    <div className='donorCon'>
                        <div className='donorHeading'>Please Consult with this Donor for remaining blood bottles</div>
                        <div className='MainDonorContent'>
                            <div className='leftCon'>
                                <img src={donor.img} alt="logo" className="DonorImg"/>
                            </div>
                            <div className='rightDonorCon'>
                                <div>{donor.fname} {donor.lname}</div>
                                <div>{donor.address}</div>
                                <div>{donor.email}</div>
                                <div>{donor.phone}</div>
                                <div>{donor.phone2}</div>
                            </div>
                        </div>
                    </div>
                 : null
            }
            {
                donor ? 
                <div>If still more bottles required. So, please make new request.</div> : null
            }
        </div>
        <div className='logoutModal' style={{display: showLogoutModal ? 'flex' : 'none'}} onClick={(e) => setShowLogoutModal(false)}>
            <div className='logout'>
                <div className='modalHeading'>Confirm Logout</div>
                <div className='innerHeading'>Are you sure you want to logout?</div>
                <div className='btnCon'>
                    <button className='cancelBtn' onClick={(e) => setShowLogoutModal(false)}>Cancel</button>
                    <button className='okBtn' onClick={handleLogout}>OK</button>
                </div>
            </div>
        </div>
        <div className='logoutModal' style={{display: showDeleteModal ? 'flex' : 'none'}} onClick={(e) => setShowDeleteModal(false)}>
            <div className='logout'>
                <div className='modalHeading'>Shortage of Blood</div>
                <div className='innerHeading'>Sorry! we doesn't have enough bottles. Please send Donor's data.</div>
                <div className='btnCon'>
                    <button className='cancelBtn' onClick={(e) => setShowDeleteModal(false)}>Cancel</button>
                    <button className='okBtn' onClick={() => navigate(`/filterDonor/${request?._id}/${request?.bloodType}`)}>Send</button>
                </div>
            </div>
        </div>
        <div className='logoutModal' style={{display: showDenyModal ? 'flex' : 'none'}} onClick={(e) => setShowDenyModal(false)}>
            <div className='logout'>
                <div className='modalHeading'>Confirm Deny</div>
                <div className='innerHeading'>Are you sure you want to deny this request?</div>
                <div className='innerHeading' style={{color: 'red'}}>By this action that patient is unable to recieve blood.</div>
                <div className='btnCon'>
                    <button className='cancelBtn' onClick={(e) => setShowDenyModal(false)}>Cancel</button>
                    <button className='okBtn' onClick={() => changeStatus('Denied')}>OK</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { HiOutlineArrowNarrowLeft, HiIdentification } from 'react-icons/hi';
// import { FaUserCheck, FaAddressBook, FaPrescriptionBottleAlt } from 'react-icons/fa';
// import { BsCalendar2DateFill, BsTelephoneOutboundFill, BsFillBookmarkStarFill } from 'react-icons/bs';
// import { MdOutlineAccessTimeFilled, MdEmail, MdBloodtype, MdDelete } from 'react-icons/md';
// import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

// export default function EachPatientRequest() {
//     const navigate = useNavigate();
    // const [showDeleteModal, setShowDeleteModal] = useState(false);
    // const [showDenyModal, setShowDenyModal] = useState(false);
    // const [starred, setStarred] = useState(false);
    // const [status, setStatus] = useState('notSet');
//   return (
//     <div className='eachDonor eachPatientRequest'>
//         <div className='topDiv'>
//             <button className='backBtn' onClick={() => navigate(-1)}>
//                 <HiOutlineArrowNarrowLeft className='icon'/>
//             </button>
//             <div className='imgDiv'>
//                 <img
//                     src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
//                     alt="logo"
//                     className="donor-img"
//                 />
//             </div>
//         </div>
//         <div className='MainContent'>
//             <div className='nameDiv'>
//                 <div className='name'>Patient Name</div>
//                 <div className='BtnCon'>
//                     <button className='starBtn btn' onClick={(e) => setStarred(!starred)}>
//                         {
//                             starred ? 
//                             <AiFillStar className='icon'/> : <AiOutlineStar className='icon'/>
//                         }
//                     </button>
//                     <button className='deleteBtn btn' onClick={(e) => setShowDeleteModal(!showDeleteModal)}>
//                         <MdDelete className='icon'/>
//                     </button>
//                     {
//                         status === 'notSet' ? 
//                         <>
//                             <button className='denyBtn btn1' onClick={(e) => setShowDenyModal(!showDenyModal)}>Deny</button>
//                             <button className='approveBtn btn1' onClick={(e) => setStatus('approve')}>Approve</button>
//                         </> :  null
//                     }
//                 </div>
//             </div>
//             <div className='rightPanel'>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <FaUserCheck className='icon colorIcon'/>
//                     </div>
//                     <div className='text'>123456789101112</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <BsCalendar2DateFill className='icon'/>
//                     </div>
//                     <div className='text'>December 23, 2023</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <MdOutlineAccessTimeFilled className='icon colorIcon'/>
//                     </div>
//                     <div className='text'>8:15 pm</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <FaAddressBook className='icon'/>
//                     </div>
//                     <div className='text'>House # 12, Street # 34 Block A Lahore Punjab</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <HiIdentification className='icon colorIcon'/>
//                     </div>
//                     <div className='text'>35202-1234567-0</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <BsTelephoneOutboundFill className='icon'/>
//                     </div>
//                     <div className='text'>12345678910</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <BsTelephoneOutboundFill className='icon colorIcon'/>
//                     </div>
//                     <div className='text'>12345678910</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <MdEmail className='icon'/>
//                     </div>
//                     <div className='text'>patient@gmail.com</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <MdBloodtype className='icon colorIcon'/>
//                     </div>
//                     <div className='text'>B+</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <FaPrescriptionBottleAlt className='icon'/>
//                     </div>
//                     <div className='text'>3</div>
//                 </div>
//                 <div className='DetailCon'>
//                     <div className='header'>
//                         <BsFillBookmarkStarFill className='icon colorIcon'/>
//                     </div>
//                     <div className={status === 'approve' ? 'text Astatus' : 'text Dstatus'}>
//                         {
//                             status === 'deny' ? 'Denied' : status === 'approve' ? 'Approved' : 'Pending'
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
        // <div className='logoutModal' style={{display: showDeleteModal ? 'flex' : 'none'}} onClick={(e) => setShowDeleteModal(false)}>
        //     <div className='logout'>
        //         <div className='modalHeading'>Confirm Delete</div>
        //         <div className='innerHeading'>Are you sure you want to delete this request?</div>
        //         <div className='btnCon'>
        //             <button className='cancelBtn' onClick={(e) => setShowDeleteModal(false)}>Cancel</button>
        //             <button className='okBtn'>OK</button>
        //         </div>
        //     </div>
        // </div>
        // <div className='logoutModal' style={{display: showDenyModal ? 'flex' : 'none'}} onClick={(e) => setShowDenyModal(false)}>
        //     <div className='logout'>
        //         <div className='modalHeading'>Confirm Deny</div>
        //         <div className='innerHeading'>Are you sure you want to delete this request?</div>
        //         <div className='innerHeading' style={{color: 'red'}}>By this action that patient is unable to recieve blood.</div>
        //         <div className='btnCon'>
        //             <button className='cancelBtn' onClick={(e) => setShowDenyModal(false)}>Cancel</button>
        //             <button className='okBtn' onClick={(e) => setStatus('deny')}>OK</button>
        //         </div>
        //     </div>
        // </div>
//     </div>
//   )
// }
