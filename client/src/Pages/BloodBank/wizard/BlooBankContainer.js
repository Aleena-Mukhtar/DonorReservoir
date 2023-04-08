import React, { useState, useEffect } from "react";
import TermsPage from "./TermsPage";
import Wizard1 from "./Wizard1";
import Wizard2 from "./Wizard2";
import Wizard3 from "./Wizard3";
export const requestContext = React.createContext();

const initialObj = {
  bankName: "",
  city: "",
  address: "",
  email: "",
  phone: "",
  mobile: "",
  password: "",
  password2: "",

  adminImg: "",
  adminFname: "",
  adminLname: "",
  adminAddress: "",
  adminEmail: "",
  adminPhone: "",
  adminCNIC: "",

  bloodTypes: [],
};
export default function BlooBankContainer() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(initialObj);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  const BloodBankValue = {
    tab,
    setTab,
    handleChange,
    setData,
    data,
  };
  const BloodBankContent = (tab) => {
    switch (tab) {
      case 0:
        return <TermsPage />;
      case 1:
        return <Wizard1 />;
      case 2:
        return <Wizard2 />;
      case 3:
        return <Wizard3 />;
      default:
    }
  };
  return (
    <div className="BloodBankContainer">
      <div className="BankMainHeading">Coordinate as a Blood Bank</div>
      {tab !== 0 && (
        <div className="BarCon">
          <div
            className="con"
            style={{ color: tab === 1 ? "black" : "#A6A3A3" }}
          >
            <div
              className="number"
              style={{
                border: tab === 1 ? "1px solid black" : "1px solid #A6A3A3",
              }}
            >
              <div>1</div>
            </div>
            <div className="detail">Personal Info</div>
          </div>
          <div
            className="con"
            style={{ color: tab === 2 ? "black" : "#A6A3A3" }}
          >
            <div
              className="number"
              style={{
                border: tab === 2 ? "1px solid black" : "1px solid #A6A3A3",
              }}
            >
              <div>2</div>
            </div>
            <div className="detail">Admin Info</div>
          </div>
          <div
            className="con"
            style={{ color: tab === 3 ? "black" : "#A6A3A3" }}
          >
            <div
              className="number"
              style={{
                border: tab === 3 ? "1px solid black" : "1px solid #A6A3A3",
              }}
            >
              <div>3</div>
            </div>
            <div className="detail">Blood Info</div>
          </div>
        </div>
      )}
      <requestContext.Provider value={BloodBankValue}>
        {BloodBankContent(tab)}
      </requestContext.Provider>
    </div>
  );
}
