import React, { useState, useEffect } from "react";
import TermsPage from "./TermsPage";
import SignupPage from "./SignupPage";
export const requestContext = React.createContext();

const initialObj = {
  img: "",
  fname: "",
  lname: "",
  city: "",
  address: "",
  email: "",
  phone: "",
  phone2: "",
  CNIC: "",
  password: "",
  password2: "",
};
export default function PatientContainer() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(initialObj);

  useEffect(() => {}, [data]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  const PatientValue = {
    tab,
    setTab,
    handleChange,
    setData,
    data,
  };
  const PatientContent = (tab) => {
    switch (tab) {
      case 0:
        return <TermsPage />;
      case 1:
        return <SignupPage />;
      default:
    }
  };
  return (
    <div className="BloodBankContainer">
      <div className="BankMainHeading">Signup as Patient</div>
      <requestContext.Provider value={PatientValue}>
        {PatientContent(tab)}
      </requestContext.Provider>
    </div>
  );
}