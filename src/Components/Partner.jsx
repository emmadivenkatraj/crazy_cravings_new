import React, { useState } from "react";
import "./Partner.css";
import bgimage from "../Images/bgimage.jpg";
import { useNavigate } from "react-router-dom";

const Partner = () => {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  // ✅ DIRECT SUBMIT → SAVE MOBILE → NAVIGATE
  const submit = () => {
    if (mobile.length !== 10) {
      alert("Enter valid 10-digit number");
      return;
    }

    // ✅ Save mobile in localStorage
    localStorage.setItem("mobile", mobile);

    // ✅ Navigate directly to partner-info
    navigate("/partner-info");
  };

  return (
    <div className="partner-container">
      <img src={bgimage} className="background-image" alt="bg" />

      <div className="nav1">
        <h2 className="logo1">CrazyCravings</h2>
        <button className="button1">Register</button>
      </div>

      <div className="content1">
        <h2 className="heading1">Register</h2>

        <input
          type="tel"
          placeholder="Enter your number"
          className="phone"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button onClick={submit} className="submit1">
          Submit
        </button>

        
      </div>
    </div>
  );
};

export default Partner;
