import React from 'react';
import LoggedInNavbar from './LoggedInNavbar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function Policy() {
    const navigate = useNavigate();
    const login = sessionStorage.getItem("isLoggedIn");
  return (
    <>
    {
        login === 'true' ? <LoggedInNavbar/> : <Navbar/>
    }
    <div className='about policy'>
        <button className="backBtn" onClick={() => navigate(-1)}>
            <HiOutlineArrowNarrowLeft className="icon" />
        </button>
        <div className='mainHeading'>Privacy Policy & Terms of Services</div>
        <div className='heading'>Terms of Service:</div>
        <div className='detail'>These Terms of Service ("Terms") govern your use of the Blood Management System ("System") provided by Blood Reservoir Management Hospital. By accessing or using the System, you agree to be bound by these Terms</div>
        <ol>
            <li className='info'>Use of the System:</li>
            <ul>
                <li>You may only use the System for its intended purpose, which is to facilitate blood management processes and related activities.</li>
                <li>You agree not to use the System for any unlawful, unauthorized, or unethical purposes.</li>
            </ul>
            <li className='info'>User Accounts:</li>
            <ul>
                <li> In order to access and use the System, you may need to create a user account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
                <li>You agree to provide accurate and up-to-date information when creating your account and to promptly update any changes to your information.</li>
            </ul>
            <li className='info'>Data and Privacy:</li>
            <ul>
                <li>By using the System, you acknowledge that Blood Reservoir Management Hospital may collect, store, and process certain personal and non-personal data in accordance with our Privacy Policy (refer to the Privacy Policy section for more details).</li>
                <li>You agree that Blood Reservoir Management Hospital may use the collected data to improve the System, enhance user experience, and for statistical or research purposes.</li>
            </ul>
            <li className='info'>Intellectual Property:</li>
            <ul>
                <li>All intellectual property rights related to the System, including software, designs, trademarks, and content, are owned by or licensed to Blood Reservoir Management Hospital.</li>
                <li>You may not reproduce, modify, distribute, or use any part of the System without prior written consent from Blood Reservoir Management Hospital.</li>
            </ul>
            <li className='info'>Limitation of Liability:</li>
            <ul>
                <li>The use of the System is at your own risk. Blood Reservoir Management Hospital shall not be liable for any damages, losses, or liabilities arising out of or in connection with the use of the System.</li>
                <li>Blood Reservoir Management Hospital does not guarantee the accuracy, reliability, or completeness of the information provided through the System.</li>
            </ul>
            <li className='info'>Termination:</li>
            <ul>
                <li>Blood Reservoir Management Hospital reserves the right to suspend or terminate your access to the System at any time and for any reason without prior notice.</li>
            </ul>
            <li className='info'>Modifications:</li>
            <ul>
                <li>Blood Reservoir Management Hospital reserves the right to modify or update these Terms at any time. It is your responsibility to review these Terms periodically for any changes.</li>
            </ul>
            <li className='info'>Governing Law:</li>
            <ul>
                <li>These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].</li>
            </ul>
        </ol> 
        <div className='heading'>Privacy Policy:</div>
        <div className='detail'>Your privacy is important to us. This Privacy Policy explains how Blood Reservoir Management Hospital collects, uses, and protects your personal information when you use the Blood Management System. By using the System, you consent to the practices described in this Privacy Policy.</div>
        <ol>
            <li className='info'>Information Collection:</li>
            <ul>
                <li>We may collect personal information such as your name, contact details, and medical information necessary for blood management purposes.</li>
                <li>We may also collect non-personal information, such as usage data and technical information about your device or browser.</li>
            </ul>
            <li className='info'>Use of Information:</li>
            <ul>
                <li>We use the collected information to provide and improve the System, respond to your inquiries, and personalize your experience.</li>
                <li>We may also use the information for statistical or research purposes, provided that it is anonymized and cannot be linked back to individual users.</li>
            </ul>
            <li className='info'>Data Sharing:</li>
            <ul>
                <li>We may share your personal information with authorized personnel within Blood Reservoir Management Hospital who need access to it for blood management purposes.</li>
                <li>We may disclose your information to third-party service providers who assist us in operating the System, subject to appropriate confidentiality and security measures.</li>
            </ul>
            <li className='info'>Data Security:</li>
            <ul>
                <li>We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage method can guarantee absolute security.</li>
            </ul>
            <li className='info'>Third-Party Links:</li>
            <ul>
                <li>The System may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.</li>
            </ul>
            <li className='info'>Children's Privacy:</li>
            <ul>
                <li>The System is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware of any data collected from children, we will take appropriate steps to delete it.</li>
            </ul>
            <li className='info'>Changes to the Privacy Policy:</li>
            <ul>
                <li>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website or through other appropriate means.</li>
            </ul>
            <li className='info'>Contact Us:</li>
            <ul>
                <li>If you have any questions, concerns, or requests regarding your personal information or this Privacy Policy, please contact us using the contact information provided in the "Contact Us" section.</li>
            </ul>
        </ol> 
        <div className='detail'>Please note that these sample Terms of Service and Privacy Policy are provided for informational purposes only and may need to be tailored to your specific requirements and legal jurisdiction. It is advisable to consult with legal professionals to ensure compliance with applicable laws and regulations.</div>
    </div>
    </>
  )
}
