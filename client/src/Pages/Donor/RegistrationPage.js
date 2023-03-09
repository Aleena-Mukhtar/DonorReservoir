import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { requestContext } from "./DonorContainer";

export default function RegistrationPage() {
    const [file, setFile] = useState(null);
    const { setTab } = useContext(requestContext);
    const navigate = useNavigate();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <div className='donorRegistration'>
        <button className='backBtn' onClick={() => navigate(-1)}>
            <HiOutlineArrowNarrowLeft className='icon'/>
        </button>
        <div className='mainHeading'>Blood Reservoir</div>
        <div className='headingCon'>
            <div className='header'>Register Yourself as Donor</div>
            <div className='details'>Save someone’s life in time of need</div>
        </div>
        <div className='mainContent'>
            <div className="ImageField">
                <label htmlFor="image">
                    {file ? (
                        <img src={file} alt="logo" className="upload-img" />
                        ) : (
                            <img
                                src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                                alt="logo"
                                className="upload-img"
                            />
                        )
                    }
                </label>
                <input
                    type="file"
                    id="image"
                    accept=".png, .jpg, .jpeg"
                    name="img"
                    onChange={handleChange}
                    style={{ display: "none" }}
                />
            </div>
            <div className='fieldsDiv'>
                <div className='fieldCon'>
                    <div className='field'>First Name</div>
                    <input className='input' type='text' />
                </div>
                <div className='fieldCon'>
                    <div className='field'>Last Name</div>
                    <input className='input' type='text' />
                </div>
            </div>
            <div className='fieldsDiv'>
                <div className='fieldCon'>
                    <div className='field'>Address</div>
                    <input className='input' type='text' />
                </div>
                <div className='fieldCon'>
                    <div className='field'>Email</div>
                    <input className='input' type='text' />
                </div>
            </div>
            <div className='fieldsDiv'>
                <div className='fieldCon'>
                    <div className='field'>Phone Number</div>
                    <input className='input' type='number' />
                </div>
                <div className='fieldCon'>
                    <div className='field'>Another Phone Number</div>
                    <input className='input' type='number' />
                </div>
            </div>
            <div className='fieldsDiv'>
                <div className='fieldCon'>
                    <div className='field'>Blood Type</div>
                    <input className='input' type='text' />
                </div>
                <div className='fieldCon'>
                    <div className='field'>CNIC</div>
                    <input className='input' type='number' />
                </div>
            </div>
            <button className='Btn' onClick={() => setTab(2)}>Register Yourself</button>
        </div>
    </div>
  )
}
