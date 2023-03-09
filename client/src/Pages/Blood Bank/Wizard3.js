import React, { useContext } from 'react';
import { requestContext } from "./BlooBankContainer";
import { useNavigate } from 'react-router-dom';

export default function Wizard3() {
    const navigate = useNavigate();
    const navigateToLoginPage = () => {
        navigate(`/login`);
    };
    const { setTab } = useContext(requestContext);
  return (
    <div className='wizard3 wizard1'>
        <div className='MainContent'>
            <div className='MainCon'>
                <div className='MainHeading'>Blood Types Available</div>
            </div>
            <div className='Formfields'>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <input className='checkbox' type='checkbox' />
                        <div className='field'>A+</div>
                    </div>
                    <div className='fieldCon'>
                        <input className='checkbox' type='checkbox' />
                        <div className='field'>A-</div>
                    </div>
                    <div className='fieldCon'>
                        <input className='checkbox' type='checkbox' />
                        <div className='field'>B+</div>
                    </div>
                    <div className='fieldCon'>
                        <input className='checkbox' type='checkbox' />
                        <div className='field'>B-</div>
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <input className='checkbox' type='checkbox' />
                        <div className='field'>AB+</div>
                    </div>
                    <div className='fieldCon'>
                        <input className='checkbox' type='checkbox' />
                        <div className='field'>AB-</div>
                    </div>
                    <div className='fieldCon'>
                        <input className='checkbox' type='checkbox' />
                        <div className='field'>O+</div>
                    </div>
                    <div className='fieldCon'>
                        <input className='checkbox' type='checkbox' />
                        <div className='field'>O-</div>
                    </div>
                </div>
                <div className='BtnCon'>
                    <button className='BackBtn' onClick={() => setTab(2)}>
                        Back
                    </button>
                    <button className='Btn' onClick={navigateToLoginPage}>
                        SignUp
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
