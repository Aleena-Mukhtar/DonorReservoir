import React, { useContext, useState, useEffect } from "react";
import { requestContext } from "./BlooBankContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CHECKBOX_OPTIONS = ["A+", "A-", "B-", "B+"];
const CHECKBOX_OPTIONS2 = ["AB+", "AB-", "O+", "O-"];
export default function Wizard3() {
  const { setTab, data, setData } = useContext(requestContext);
  const navigate = useNavigate();
  const [types, setTypes] = useState(data.bloodTypes);

  useEffect(() => {
    console.log(types);
  }, [types]);

  const handleBack = () => {
    setData({ ...data, bloodTypes: types });
    setTab(2);
  };

  const handleCheck = (e) => {
    const { name } = e.target;

    if (types.includes(name)) {
      const rest = types.filter((el) => el !== name);
      setTypes(rest);
    } else {
      setTypes([...types, name]);
    }
  };
  const navigateToLoginPage = () => {
    navigate(`/login`);
  };

  const handleSubmit = () => {
    axios.post("/bloodBank", { ...data, bloodTypes: types }).then((res) => {
      console.log(res);
      if (res.err) {
        console.log(res);
      } else {
        console.log("success");
        navigateToLoginPage();
      }
    });
  };
  return (
    <div className="wizard3 wizard1">
      <div className="MainContent">
        <div className="MainCon">
          <div className="MainHeading">Blood Types Available</div>
        </div>
        <div className="Formfields">
          <div className="fieldsDiv">
            {CHECKBOX_OPTIONS.map((el) => (
              <div className="fieldCon">
                <input
                  className="checkbox"
                  value={el}
                  type="checkbox"
                  onChange={(e) => handleCheck(e)}
                  name={el}
                />
                <div className="field">{el}</div>
              </div>
            ))}
          </div>
          <div className="fieldsDiv">
            {CHECKBOX_OPTIONS2.map((el) => (
              <div className="fieldCon">
                <input
                  className="checkbox"
                  value={el}
                  type="checkbox"
                  onChange={(e) => handleCheck(e)}
                  name={el}
                />
                <div className="field">{el}</div>
              </div>
            ))}
          </div>
          <div className="BtnCon">
            <button className="BackBtn" onClick={handleBack}>
              Back
            </button>
            <button className="Btn" onClick={handleSubmit}>
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
