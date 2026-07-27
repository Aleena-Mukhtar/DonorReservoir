import React, { useEffect, useState, useRef } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import LoggedInNavbar from './LoggedInNavbar';
import { RiEditCircleFill } from 'react-icons/ri';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const [showModal, setShowModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const role = sessionStorage.getItem("role");
    const id = sessionStorage.getItem("id");
    const [data, setData] = useState(
        role === "Blood Bank" ? 
        {
            img: userData?.img,
            fname: userData?.fname,
            lname: userData?.lname,
            address: userData?.address,
            email: userData?.email,
            phone: userData?.phone,
            mobile: userData?.mobile,
            password: userData?.password,
            password2: userData?.password2,
            adminCNIC: userData?.adminCNIC,
            bankName: userData?.bankName,
            city: userData?.city,
            adminAddress: userData?.adminAddress,
            adminEmail: userData?.adminEmail,
            adminPhone: userData?.adminPhone,
            bloodTypes: userData?.bloodTypes,
        }
        :
        {
            img: userData?.img,
            fname: userData?.fname,
            lname: userData?.lname,
            address: userData?.address,
            email: userData?.email,
            phone: userData?.phone,
            phone2: userData?.phone2,
            password: userData?.password,
            password2: userData?.password2,
            CNIC: userData?.CNIC,
        }
    );
    const bankSection = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {}, [showModal]);

    async function uploadImg(e) {
        const file = e.target.files[0];
        const formdata = new FormData();
        formdata.append("file", file);
        let res = await Singleupload(formdata);
        if (res.success) {
          data.img = res.url;
          setShowModal(true);
        } else {}
    }
    
    const Singleupload = async (formdata) => {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer ${sessionStorage.getItem("token")}`
        );
    
        const requestOptions = {
          method: "POST",
          body: formdata,
          headers: myHeaders,
        };
        const response = await fetch(`${process.env.REACT_APP_API_URL}/donor/upload`, requestOptions);
        const data = await response.json();
        return data;
    };
    const handleRemove = () => {
        data.img = "";
    }
    const handleFieldChange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    };
    const editUser=(e)=>{
        e.preventDefault(); 
        var _url = "";
        if (role === "Admin") _url = `${process.env.REACT_APP_API_URL}/admin/edit/${id}`
        else if (role === "Blood Bank") _url = `${process.env.REACT_APP_API_URL}/bloodBank/edit/${id}`
        else if (role === "Patient") _url = `${process.env.REACT_APP_API_URL}/patient/${id}`
        axios({
            url: _url,
            method: "PUT",
            data:JSON.stringify(data),
            headers: {
              "content-type": "application/json"
            }
        })
        .then(res => {
            if (res.data.success) {
                alert("Account Updated Successfully");
                sessionStorage.setItem("userData",JSON.stringify(data));
                if(role === "Admin") navigate(`/adminDashboard`);
                else if(role === "Blood Bank") navigate(`/bloodBankDashboard`);
                else if(role === "Patient") navigate(`/patientDashboard`);
            }
            else {
                console.log(res);
            }
        })
    }

    const handleLogout = () => {
        sessionStorage.removeItem('userData');
        sessionStorage.setItem("isLoggedIn",false);
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('role');
        navigate(`/`);
    }

    const scrollDown = (ref) => {
        window.scrollTo({
          top: ref.current.offsetTop,
          behavior: 'smooth',
        });
    };

  return (
    <>
    <LoggedInNavbar/>
    <div className='editProfile eachBank'>
        <div className='con1'>
            <div className='innerCon'>
                <div className='mainHeading'>User Profile</div>
                <div className='userContent'>
                    <BiUser className='icon'/>
                    <div className='label'>User Info</div>
                </div>
                {
                    role === "Blood Bank" ? 
                    <div className='userContent' onClick={() => scrollDown(bankSection)}>
                        <BiUser className='icon'/>
                        <div className='label'>Bank Info</div>
                    </div> : null
                }
            </div>
            <button className='logoutBtn' onClick={(e) => setShowLogoutModal(!showLogoutModal)}>
                <AiOutlineLogout className='icon'/>
                <div className='label'>Log Out</div>
            </button>
        </div>
        <div className='editProfileContent'>
            <div className='pictureCon'>
                {data?.img === "" ? (
                    <img
                        src={process.env.PUBLIC_URL + "/ProfileLogo.PNG"}
                        alt="logo"
                        className="edit-img"
                        onClick={() => setShowModal(!showModal)}
                    />
                    ) : (
                    <img 
                        src={data?.img} 
                        alt="logo" 
                        className="edit-img" 
                        onClick={() => setShowModal(!showModal)}
                    />
                    )
                }
                <RiEditCircleFill className='editIcon' onClick={() => setShowModal(!showModal)}/>
                <div className='detailCon'>
                    <div className='nameCon'>{userData?.lname} {userData?.fname}</div>
                    <div className='address'>{userData?.address}</div>
                </div>
            </div>
            <div className='formFields'>
                {
                    role === "Blood Bank" ? 
                    <div className="heading">Admin Information :</div> : null
                }
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>First Name</div>
                        <input 
                            className='input' 
                            type='text' 
                            onChange={(e) => handleFieldChange(e)}
                            value={data.fname}
                            name="fname"
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Last Name</div>
                        <input 
                            className='input' 
                            type='text'
                            onChange={(e) => handleFieldChange(e)}
                            value={data.lname}
                            name="lname" 
                        />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Address</div>
                        <input 
                            className='input' 
                            type='text' 
                            onChange={(e) => handleFieldChange(e)}
                            value={role === "Blood Bank" ? data.adminAddress : data.address}
                            name={role === "Blood Bank" ? "adminAddress" : "address"}
                        />
                    </div>
                    <div className='fieldCon'>
                        <div className='field'>Email</div>
                        <input 
                            className='input' 
                            type='text'
                            onChange={(e) => handleFieldChange(e)}
                            value={role === "Blood Bank" ? data.adminEmail : data.email}
                            name={role === "Blood Bank" ? "adminEmail" : "email"} 
                        />
                    </div>
                </div>
                <div className='fieldsDiv'>
                    <div className='fieldCon'>
                        <div className='field'>Phone Number</div>
                        <input 
                            className='input' 
                            type='text' 
                            onChange={(e) => handleFieldChange(e)}
                            value={role === "Blood Bank" ? data.adminPhone : data.phone}
                            name={role === "Blood Bank" ? "adminPhone" : "phone"}
                        />
                    </div>
                    {
                        role === "Blood Bank" ?
                        <div className='fieldCon'>
                            <div className='field'>CNIC</div>
                            <input 
                                className='input' 
                                type='text' 
                                onChange={(e) => handleFieldChange(e)}
                                value={data.adminCNIC}
                                name="adminCNIC"
                            />
                        </div> :
                        <div className='fieldCon'>
                            <div className='field'>Mobile Number</div>
                            <input 
                                className='input' 
                                type='text'
                                onChange={(e) => handleFieldChange(e)}
                                value={data.phone2}
                                name="phone2" 
                            />
                        </div>
                    }
                </div>
                {
                    role === "Blood Bank" ? null :
                    <div className='fieldsDiv'>
                        <div className='fieldCon'>
                            <div className='field'>CNIC</div>
                            <input 
                                className='input' 
                                type='text' 
                                onChange={(e) => handleFieldChange(e)}
                                value={data.CNIC}
                                name="CNIC"
                            />
                        </div>
                        <div className='fieldCon'>
                            <div className='field'>Password</div>
                            <input 
                                className='input' 
                                type='password'
                                onChange={(e) => handleFieldChange(e)}
                                value={data.password}
                                name="password"
                            />
                        </div>
                    </div>
                }
            </div>
            {
                role === "Blood Bank" ?
                <>
                <div className="heading" ref={bankSection}>Blood Bank Information :</div>
                <div className='formFields bankFormFields'>
                    <div className='fieldsDiv'>
                        <div className='fieldCon'>
                            <div className='field'>Bank Name</div>
                            <input 
                                className='input' 
                                type='text'
                                onChange={(e) => handleFieldChange(e)}
                                value={data.bankName}
                                name="bankName" 
                            />
                        </div>
                        <div className='fieldCon'>
                            <div className='field'>Bank Address</div>
                            <input 
                                className='input' 
                                type='text'
                                onChange={(e) => handleFieldChange(e)}
                                value={data.address}
                                name="address" 
                            />
                        </div>
                    </div>
                    <div className='fieldsDiv'>
                        <div className='fieldCon'>
                            <div className='field'>Mobile Number</div>
                            <input 
                                className='input' 
                                type='text' 
                                onChange={(e) => handleFieldChange(e)}
                                value={data.mobile}
                                name="mobile"
                            />
                        </div>
                        <div className='fieldCon'>
                            <div className='field'>Phone Number</div>
                            <input 
                                className='input' 
                                type='text' 
                                onChange={(e) => handleFieldChange(e)}
                                value={data.phone}
                                name="phone"
                            />
                        </div>
                    </div>
                    <div className='fieldsDiv'>
                        <div className='fieldCon'>
                            <div className='field'>Email</div>
                            <input 
                                className='input' 
                                type='text' 
                                onChange={(e) => handleFieldChange(e)}
                                value={data.email}
                                name="email"
                            />
                        </div>
                        <div className='fieldCon'>
                            <div className='field'>Blood Types Available</div>
                            <input 
                                className='input' 
                                type='text' 
                                onChange={(e) => handleFieldChange(e)}
                                value={data.bloodTypes}
                                name="bloodTypes"
                            />
                        </div>
                    </div>
                    <div className='fieldsDiv'>
                        <div className='fieldCon'>
                            <div className='field'>City</div>
                            <input 
                                className='input' 
                                type='text' 
                                onChange={(e) => handleFieldChange(e)}
                                value={data.city}
                                name="city"
                            />
                        </div>
                        <div className='fieldCon'>
                            <div className='field'>Password</div>
                            <input 
                                className='input' 
                                type='text' 
                                onChange={(e) => handleFieldChange(e)}
                                value={data.password}
                                name="password"
                            />
                        </div>
                    </div>
                </div> </>: null
            }
            <div className='BtnCon'>
                <button className='backBtn' onClick={() => navigate(-1)}>Back</button>
                <button className='saveBtn' onClick={editUser}>Save Changes</button>
            </div>
        </div>
        <div className='setPictureModal' onClick={() => setShowModal(false)} style={{display: showModal ? 'flex' : 'none'}}>
            <div className='PictureContent'>
                <div className='closeBtn' onClick={() => setShowModal(false)}>x</div>
                <div className='heading'>Profile picture</div>
                <div className='subHeading'>A picture helps people recognize you</div>
                <div className='imgDiv'>
                    {data?.img ? (
                        <img src={data?.img} alt="logo" className="upload-img" />
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
                        onChange={(e) => uploadImg(e)}
                        style={{ display: "none" }}
                    />
                    <button className='modelBtn' onClick={handleRemove}>
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
            <button className='okBtn' onClick={handleLogout}>OK</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
