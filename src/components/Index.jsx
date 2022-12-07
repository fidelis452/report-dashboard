import React from "react";
import "./Index.css";
import topImage from "../files/Acquiretek-Test.png";
import logoImage from "../files/MicrosoftTeams-image.png";
export default function Index() {
  const current = new Date();
  const month = current.toLocaleString("en-US", { month: "short" });
  console.log(month);
  const year = `${current.getFullYear()}`;

  return (
    <>
      <div className="dashboard">
        <div className="page-1">
          <div className="logoImage">
            <img src={logoImage} alt="background" width="150px" />
          </div>
          <img src={topImage} alt="background" width="100%" />
        </div>
        <div className="time">
          <div>{month}</div>
          <div>{year}</div>
        </div>
        <div className="urls">
          <div>https://www.carveos.com</div>
        </div>
      </div>
    </>
  );
}
