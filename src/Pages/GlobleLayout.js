import React from "react";
import "./GlobleLayout.css"; // CSS file for styles

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="background-wrapper">
      <div className="curve-design"></div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
