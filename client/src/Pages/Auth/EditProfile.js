import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

export default function EditProfile() {
    const [showModal, setShowModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [file, setFile] = useState(null);
    function handleChange(e) {
        setShowModal(true);
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <div className='editProfile'>
        <div className='con1'>
            <div className='innerCon'>
                <div className='mainHeading'>User Profile</div>
                <div className='userContent'>
                    <BiUser className='icon'/>
                    <div className='label'>User Info</div>
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
                    src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                    alt="logo"
                    className="edit-img"
                    onClick={() => setShowModal(!showModal)}
                />
                <div className='detailCon'>
                    <div className='nameCon'>First Last Name</div>
                    <div className='address'>Lahore, Pakistan</div>
                </div>
            </div>
            <div className='formFields'>
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
                        <div className='field'>Phone Number 1</div>
                        <input className='input' type='number' />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Phone Number 2</div>
                        <input className='input' type='number' />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>CNIC</div>
                        <input className='input' type='number' />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Password</div>
                        <input className='input' type='password' />
                    </div>
                </div>
            </div>
            <div className='formFields bankFormFields'>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Bank Name</div>
                        <input className='input' type='text' />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Bank Admin Name</div>
                        <input className='input' type='text' />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Address</div>
                        <input className='input' type='text' />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>City</div>
                        <input className='input' type='text' />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Phone Number 1</div>
                        <input className='input' type='number' />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Phone Number 2</div>
                        <input className='input' type='number' />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Email</div>
                        <input className='input' type='text' />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Password</div>
                        <input className='input' type='password' />
                    </div>
                </div>
            </div>
            <div className='BtnCon'>
                <button className='backBtn'>Back</button>
                <button className='saveBtn'>Save Changes</button>
            </div>
        </div>
        <div className='setPictureModal' onClick={() => setShowModal(false)} style={{display: showModal ? 'flex' : 'none'}}>
            <div className='PictureContent'>
                <div className='closeBtn' onClick={() => setShowModal(false)}>x</div>
                <div className='heading'>Profile picture</div>
                <div className='subHeading'>A picture helps people recognize you</div>
                <div className='imgDiv'>
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
                </div>
                <div className='BtnDiv'>
                    <label htmlFor="image">
                        <div className='modelBtn'>
                            <MdModeEditOutline className='icon'/>
                            <div className='label'>Change</div>
                        </div>
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept=".png, .jpg, .jpeg"
                        name="img"
                        onChange={handleChange}
                        style={{ display: "none" }}
                    />
                    <button className='modelBtn'>
                        <MdDelete className='icon'/>
                        <div className='label'>Remove</div>
                    </button>
                </div>
            </div>
        </div>
        <div className='logoutModal' style={{display: showLogoutModal ? 'flex' : 'none'}} onClick={(e) => setShowLogoutModal(false)}>
        <div className='logout'>
          <div className='modalHeading'>Confirm Logout</div>
          <div className='innerHeading'>Are you sure you want to logout?</div>
          <div className='btnCon'>
            <button className='cancelBtn' onClick={(e) => setShowLogoutModal(false)}>Cancel</button>
            <button className='okBtn'>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}
