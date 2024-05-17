import React from "react";
import Vishnu from "../components/videos/Vishnu.mp4";
import { Link } from "react-router-dom";
import "./Prepage.css";
const Prepage = () => {
  return (
    <div className="Prep-page">
      <div className="overlay"></div>
      <video src={Vishnu} autoPlay muted></video>
      <div className="content">
        <p>
          <Link to="/signup">Let's Dive</Link>
        </p>
      </div>
    </div>
  );
};

export default Prepage;
