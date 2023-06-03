import React from 'react';
import LoggedInNavbar from './LoggedInNavbar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function About() {
    const navigate = useNavigate();
    const login = sessionStorage.getItem("isLoggedIn");
  return (
    <>
    {
        login === 'true' ? <LoggedInNavbar/> : <Navbar/>
    }
    <div className='about'>
        <button className="backBtn" onClick={() => navigate(-1)}>
            <HiOutlineArrowNarrowLeft className="icon" />
        </button>
        <div className='mainHeading'>Let's Know Something About Us</div>
        <div className='heading'>About Us:</div>
        <div className='detail'>Welcome to Blood Reservoir Management Hospital, a leading institution in healthcare and blood management. With a strong commitment to saving lives and ensuring the well-being of our patients, we strive to provide the highest quality medical services in a compassionate and patient-centric environment.</div>
        <div className='detail'>At Special Blood Reservoir Management Hospital, we understand the critical importance of blood transfusion and its role in medical treatments. That's why we have developed an advanced and efficient Blood Management System that ensures the safe and effective utilization of this vital resource. Our dedicated team of medical professionals, including hematologists, transfusion specialists, and laboratory technicians, work tirelessly to maintain the highest standards in blood collection, testing, storage, and distribution.</div>
        <div className='detail'>With state-of-the-art facilities and cutting-edge technology, we prioritize patient safety and employ stringent protocols throughout the blood management process. From accurate blood typing and screening to meticulously tracking each unit, we leave no stone unturned to guarantee the reliability and traceability of the blood products we provide.</div>
        <div className='detail'>Furthermore, our commitment extends beyond the hospital walls. We actively collaborate with blood banks, donor organizations, and regulatory bodies to promote community engagement and raise awareness about the importance of blood donation. Through educational initiatives, we aim to foster a culture of voluntary blood donation and ensure a sufficient and safe blood supply for all those in need.</div>
        <div className='detail'>At Special Blood Reservoir Management Hospital, we believe in the power of collaboration, innovation, and compassion. By incorporating the latest advancements in medical science and technology, we continuously improve our blood management practices and strive to set new benchmarks in patient care. Our dedicated team of healthcare professionals works diligently to ensure that every patient receives the best possible care and that blood is utilized judiciously, saving lives and making a positive impact on the community.</div>
        <div className='heading'>Contact Us:</div>
        <div className='detail'>If you have any questions, inquiries, or would like to learn more about our Blood Management System, please don't hesitate to get in touch. We value your feedback and are here to assist you in any way we can.</div>
        <div className='infoCon'>
            <div className='info'>Blood Reservoir Management Hospital</div>
            <div className='info'>Address: <span>Street # 123, Block A phase 2 Gulberg III Lahore</span></div>
            <div className='info'>Phone: <span>042-2233377</span>042-2233377</div>
            <div className='info'>Email: <span>bloodReservoir@gmail.com</span></div>
        </div>
        <div className='detail'>Our friendly and knowledgeable staff is available to answer your queries and provide you with the information you need. Whether you are a patient, a healthcare professional, or someone interested in supporting our cause, we are eager to hear from you. Together, let's make a difference in blood management and healthcare.</div>
    </div>
    </>
  )
}
