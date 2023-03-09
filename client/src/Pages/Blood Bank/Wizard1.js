import React, { useContext } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { requestContext } from "./BlooBankContainer";

export default function Wizard1() {
  const { setTab } = useContext(requestContext);
  return (
    <div className='wizard1'>
        <div className='MainContent'>
            <div className='MainCon'>
                <div className='MainHeading'>Personal Information</div>
            </div>
            <div className='Formfields'>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Bank Name</div>
                        <input className='input' type='text' />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>City</div>
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
                        <div className='field'>Phone Number 1</div>
                        <input className='input' type='text' />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Phone Number 2</div>
                        <input className='input' type='text' />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Password</div>
                        <input className='input' type='text' />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Confirm Password</div>
                        <input className='input' type='text' />
                    </div>
                </div>
                <div className='BtnCon'>
                    <button className='BackBtn' onClick={() => setTab(0)}>
                        Back
                    </button>
                    <button className='Btn' onClick={() => setTab(2)}>
                        Continue
                        <BsArrowRight className='icon'/>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
