import React from "react";
import introWaste from "../../assets/intro_waste.svg";

const AboutPage: React.FC = () => {
  return (
    <div className="diff aspect-[16/9]">
      <div className="diff-item-1">
        <div className="bg-primary text-primary-content text-5xl font-black grid place-content-center">
          <img src={introWaste} className="w-52 h-52 mb-5" />
          TITANS
        </div>
      </div>
      <div className="diff-item-2">
        <div className="bg-base-200 text-5xl font-black grid place-content-center">
          <img src={introWaste} className="w-52 h-52 mb-5" />
          TITANS
        </div>
      </div>
      <div className="diff-resizer"></div>
    </div>
  );
};

export default AboutPage;
