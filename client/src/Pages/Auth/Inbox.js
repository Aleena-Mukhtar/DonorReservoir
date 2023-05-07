import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoggedInNavbar from './LoggedInNavbar';
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

export default function Inbox() {
    const [notifications, setNotifications] = useState([]);
    const [read, setread] = useState(false);
    const [active, setActive] = useState(null);
    const navigate = useNavigate();

    const toggleAccordion = (index) => {
        if (index === active) {
            setActive(null);
        } else {
            setActive(index);
        }
    };
    useEffect(() => {
        axios(`http://localhost:5000/bankNotification/`)
          .then((data) => {
            console.log(data);
            setNotifications(data.data);
          })
          .catch((err) => console.log(err));
    }, []);

    const readRequest = (ID) => {
        setread(true);
        console.log(read);
        const data = {
          read: true,
        };
        axios({
          url: `http://localhost:5000/bankNotification/markAsRead/${ID}`,
          method: "PUT",
          data: data,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.data.read);
            console.log("mark as read Successfully");
            navigate(`/inbox/${ID}`);
          } else {
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    };
  return (
    <>
    <LoggedInNavbar/>
    <div className='SharedInbox'>
        <button className="backBtn" onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft className="icon" />
        </button>
        <div className="heading">Inbox</div>
        <div className="subHeading">Email History between Hospital Admin and Blood Bank</div>
        <div className='mainContainer'>
            {notifications.map((ele, index) => (
                <div className='innerCon' key={index}>
                    <div className='con1'>
                        <div className='inner1' onClick={() => readRequest(ele._id)}>
                            <div className='header' style={{fontWeight: ele.read ? 'normal' : 'bold'}}>To: {ele.bankName} for {ele.bloodType}</div>
                            <div className='date' style={{fontWeight: ele.read ? 'normal' : 'bold'}}>{new Date(ele?.createdAt.toString()).toDateString()}</div>
                        </div>
                        <button className='inner2' onClick={() => toggleAccordion(index)}>
                            {
                                index === active ?
                                <MdOutlineKeyboardArrowUp className='icon'/> :
                                <MdOutlineKeyboardArrowDown className='icon'/>
                            }
                        </button>
                    </div>
                    <div className='con2' style={{display: index === active ? 'block' : 'none'}}>
                        <div className='inner1'>
                            <div className='header'>To: {ele.hospitalName} for {ele.bloodType}</div>
                            <div className='date'>{new Date(ele?.createdAt.toString()).toDateString()}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    </>
  )
}