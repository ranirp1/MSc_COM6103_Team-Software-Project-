import React from "react";
import introWaste from "../../assets/intro_waste.svg";

const AboutPage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={introWaste} className="h-80 w-80 m-4" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="text-3xl font-bold underline">Hello Team Titans</div>
      </header>
    </div>
  );
};

export default AboutPage;
