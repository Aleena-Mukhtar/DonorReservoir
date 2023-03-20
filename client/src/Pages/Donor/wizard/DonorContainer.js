import React, { useState, useEffect } from "react";
import RegistrationPage from "./RegistrationPage";
import TermsPage from "./TermsPage";
import ThanksPage from "./ThanksPage";
export const requestContext = React.createContext();

const initialObj = {
  img: "",
  fname: "",
  lname: "",
  address: "",
  email: "",
  phone: "",
  phone2: "",
  bloodType: "",
  CNIC: "",
};
export default function DonorContainer() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(initialObj);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  const DonorValue = {
    tab,
    setTab,
    handleChange,
    setData,
    data,
  };
  const DonorContent = (tab) => {
    switch (tab) {
      case 0:
        return <TermsPage />;
      case 1:
        return <RegistrationPage />;
      case 2:
        return <ThanksPage />;
      default:
    }
  };
  return (
    <div className="donorContainer">
      <requestContext.Provider value={DonorValue}>
        {DonorContent(tab)}
      </requestContext.Provider>
    </div>
  );
}
