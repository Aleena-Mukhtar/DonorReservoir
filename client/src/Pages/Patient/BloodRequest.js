import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OPTIONS = ["A+", "A-", "B-", "B+", "AB+", "AB-", "O+", "O-"];
export default function BloodRequest() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const navigate = useNavigate();
    const [data, setData] = useState({
        patient_id: userData._id,
        hospitalName: "Blood Reservoir Management Hospital",
        count: "",
        days: "",
        bloodType: ""
    });
    const handleChange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    };

    function validateDonor(patient) {

        const validationRules = {
            hospitalName: {
                required: true,
            },
            bloodType: {
                required: true,
            },
            count: {
                required: true,
            },
            days: {
                required: true,
            },
        };
      
        for (const field in validationRules) {
          if (validationRules.hasOwnProperty(field)) {
            const rules = validationRules[field];
            const value = patient[field];
      
            if (rules.required && (!value || value.trim() === '')) {
              alert(`${field} is required.`);
              return false;
            }
          }
        }
        return true;
    }

    const handleSendRequest = (e) => {
        e.preventDefault();
    
        const isDataValid = validateDonor(data);
        if(isDataValid){
            const config = {
                url: "http://localhost:5000/bloodRequest/",
                method: "POST",
                data: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                },
              };
          
            axios(config)
                .then(function (response) {
                    if (response.data.error) {
                        alert(response.data.message);
                    } else {
                        alert('Request Send Successfully!');
                        navigate('/patientDashboard');                        
                    }
                })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
  return (
    <div className='bloodRequest'>
        <div className='mainHeading'>Blood Request</div>
        <div className='subHeading'>Your Request will be entertain within 24 hours</div>
        <div className='formFields'>
            <div className='fields'>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Hospital Name <span style={{color: 'red'}}>*</span></div>
                        <input 
                            className='input' 
                            type='text' 
                            disabled={true}
                            value={data.hospitalName}
                            name="hospitalName"
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Blood Type <span style={{color: 'red'}}>*</span></div>
                        <select
                            className='input' 
                            type='text'
                            onChange={(e) => handleChange(e)}
                            value={data.bloodType}
                            name="bloodType" 
                        >
                            <option value=''>Select bloodType</option>
                            {OPTIONS.map((el) => (
                                <option value={el} key={el}>{el}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Bottles Count <span style={{color: 'red'}}>*</span></div>
                        <input 
                            className='input' 
                            type='number'
                            onChange={(e) => handleChange(e)} 
                            value={data.count}
                            name="count"
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Days <span style={{color: 'red'}}>*</span></div>
                        <input 
                            className='input' 
                            type='number'
                            onChange={(e) => handleChange(e)}
                            value={data.days}
                            name="days" 
                        />
                    </div>
                </div>
            </div>
            <div className='btnCon'>
                <button className='btn' onClick={handleSendRequest}>Send Request</button>
            </div>
        </div>
    </div>
  )
}
