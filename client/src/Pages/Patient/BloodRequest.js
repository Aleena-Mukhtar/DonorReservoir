import React, { useState } from 'react';
import axios from "axios";

export default function BloodRequest() {
    const [data, setData] = useState({
        hospitalName: "ABC Management Hospital",
        count: "",
        days: "",
        bloodType: ""
    });
    const handleChange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleSendRequest = (e) => {
        e.preventDefault();
    
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
                console.log(JSON.stringify(response.data));
                if (response.data.error) {
                    alert(response.data.message);
                } else {
                    alert('Request Send Successfully!');
                }
            })
        .catch(function (error) {
            console.log(error);
        });
    }
  return (
    <div className='bloodRequest'>
        <div className='mainHeading'>Blood Request</div>
        <div className='subHeading'>Your Request will be entertain within 24 hours</div>
        <div className='formFields'>
            <div className='fields'>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Hospital Name</div>
                        <input 
                            className='input' 
                            type='text' 
                            disabled={true}
                            value={data.hospitalName}
                            name="hospitalName"
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Blood Type</div>
                        <input 
                            className='input' 
                            type='text'
                            onChange={(e) => handleChange(e)}
                            value={data.bloodType}
                            name="bloodType" 
                        />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Bottles Count</div>
                        <input 
                            className='input' 
                            type='text'
                            onChange={(e) => handleChange(e)} 
                            value={data.count}
                            name="count"
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Days</div>
                        <input 
                            className='input' 
                            type='text'
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
