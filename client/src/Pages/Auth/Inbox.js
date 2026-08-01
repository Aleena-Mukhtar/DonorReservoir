import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoggedInNavbar from './LoggedInNavbar';
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft, HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

export default function Inbox() {
    const [notifications, setNotifications] = useState([]);
    const [, setread] = useState(false);
    const [active, setActive] = useState(null);
    const role = sessionStorage.getItem("role");
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const navigate = useNavigate();

    const toggleAccordion = (index) => {
        if (index === active) {
            setActive(null);
        } else {
            setActive(index);
        }
    };
    useEffect(() => {
        axios(`${process.env.REACT_APP_API_URL}/bankNotification/`)
          .then((data) => {
            if(role === 'Blood Bank') setNotifications(data.data.filter(el => (el.bank_id === userData._id)));
            else setNotifications(data.data);
          })
          .catch((err) => console.log(err));
    }, [role, userData._id]);

    const readRequest = (ID) => {
        setread(true);
        const data = {
          read: true,
        };
        let url;
        if(role === 'Admin') url = `${process.env.REACT_APP_API_URL}/bankNotification/markAdminAsRead/${ID}`;
        else if(role === 'Blood Bank') url = `${process.env.REACT_APP_API_URL}/bankNotification/markBankAsRead/${ID}`;
        axios({
          url: url,
          method: "PUT",
          data: data,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.success) {
            navigate(`/inbox/${ID}`);
          } else {
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    };

    const readReply = (ID) => {
      setread(true);
      const data = {
        read: true,
      };
      let url;
      if(role === 'Admin') url = `${process.env.REACT_APP_API_URL}/bankNotification/markReplyAdminAsRead/${ID}`;
      else if(role === 'Blood Bank') url = `${process.env.REACT_APP_API_URL}/bankNotification/markReplyBankAsRead/${ID}`;
      axios({
        url: url,
        method: "PUT",
        data: data,
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success) {
          navigate(`/reply/${ID}`);
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
        <div className="heading">
          <div className="mainTitle">Inbox</div>
          <div className="subTitle">Email history between hospital admin and blood bank</div>
        </div>
        <div className='mainContainer'>
            {notifications.length === 0 && (
              <div className="emptyInbox">No messages in your inbox yet</div>
            )}
            {notifications.map((ele, index) => (
              <div className='innerCon' key={index}>
                <div className='con1'>
                  <div className='inner1' onClick={() => readRequest(ele._id)}>
                    <div 
                      className='header'
                      style={{fontWeight: role === 'Admin' ? ele.adminRead ? 'normal' : 'bold' : ele.bankRead ? 'normal' : 'bold'}}
                    >
                      {
                        role === 'Admin' ?
                          ele.adminRead ? <HiOutlineMailOpen className='mailIcon' color='green'/> : <HiOutlineMail className='mailIcon'/>
                        :
                          ele.bankRead ? <HiOutlineMailOpen className='mailIcon' color='green'/> : <HiOutlineMail className='mailIcon'/>
                      }
                      To: {ele.bankName} for {ele.bloodType}
                    </div>
                    <div 
                      className='date' 
                      style={{fontWeight: role === 'Admin' ? ele.adminRead ? 'normal' : 'bold' : ele.bankRead ? 'normal' : 'bold'}}
                    >
                      {new Date(ele?.createdAt.toString()).toDateString()}
                    </div>
                  </div>
                  <button className='inner2' onClick={() => toggleAccordion(index)}>
                    {
                      index === active ?
                      <MdOutlineKeyboardArrowUp className='icon'/> :
                      <MdOutlineKeyboardArrowDown className='icon'/>
                    }
                  </button>
                </div>
                {
                  ele.reply ? 
                  <div className='con2' style={{display: index === active ? 'block' : 'none'}} onClick={() => readReply(ele._id)}>
                    <div className='inner1'>
                      <div 
                        className='header' 
                        style={{fontWeight: role === 'Admin' ? ele.adminReplyRead ? 'normal' : 'bold' : ele.bankReplyRead ? 'normal' : 'bold'}}
                      >
                        {
                          role === 'Admin' ?
                            ele.adminReplyRead ? <HiOutlineMailOpen className='mailIcon' color='green'/> : <HiOutlineMail className='mailIcon'/>
                          :
                            ele.bankReplyRead ? <HiOutlineMailOpen className='mailIcon' color='green'/> : <HiOutlineMail className='mailIcon'/>
                        }
                        To: {ele.hospitalName} for {ele.bloodType}
                      </div>
                      <div 
                        className='date' 
                        style={{fontWeight: role === 'Admin' ? ele.adminReplyRead ? 'normal' : 'bold' : ele.bankReplyRead ? 'normal' : 'bold'}}
                      >
                        {new Date(ele?.createdAt.toString()).toDateString()}
                      </div>
                    </div>
                  </div> : null
                }
              </div>
            ))}
        </div>
    </div>
    </>
  )
}