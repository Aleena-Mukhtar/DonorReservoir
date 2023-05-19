import React, { useState, useContext } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { TfiEmail } from "react-icons/tfi";
import { BsBookmarks } from "react-icons/bs";
import { requestContext } from "./PatientContainer";

export default function TermsPage() {
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(false);
  const { setTab } = useContext(requestContext);
  const handleChange = (event) => {
    setAgreement(event.target.checked);
  };
  return (
    <div className="terms">
      <button className="backBtn" onClick={() => navigate(-1)}>
        <HiOutlineArrowNarrowLeft className="icon" />
      </button>
      <div className="termsContent">
        <div className="conditions">
          <div className="heading">
            To continue, you need to agree to certain terms and conditions.
          </div>
          <div className="options">
            <div className="fieldCon">
              <AiOutlineUser className="icon" />
              <div className="detail">Provide us your correct profile info</div>
            </div>
            <div className="fieldCon">
              <TfiEmail className="icon" />
              <div className="detail">
                You have to generate response of our email within 2 days,
                otherwise complaint can be filed
              </div>
            </div>
            <div className="fieldCon">
              <BsBookmarks className="icon" />
              <div className="detail">
                We store these details and your previous data in our files
              </div>
            </div>
            <div className="fieldCon">
              <RxCrossCircled className="icon" />
              <div className="detail">
                In case of any suspicious and wrong information, legal action
                will be taken
              </div>
            </div>
            <div className="fieldCon">
              <input
                className="checkbox"
                type="checkbox"
                onChange={handleChange}
              />
              <div className="detail">
                I agree to the given terms and conditions
              </div>
            </div>
            <button
              className="Btn"
              disabled={!agreement}
              style={{ opacity: !agreement ? "0.8" : "1" }}
              onClick={() => setTab(1)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}