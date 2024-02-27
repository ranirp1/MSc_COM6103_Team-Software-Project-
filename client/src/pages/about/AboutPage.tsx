import React from "react";
import logo from "../../logo.svg";
import Navigation from "../../Navigation";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(169, 52%, 80%)' }}>
      <Navigation backgroundColor="hsl(169, 52%, 80%)" />
      <header className="App-header">
        <img src={logo} alt="logo" className="App-logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="text-3xl font-bold underline">Hello Team Titans</div>
      </header>
    </div>
  );
};

export default AboutPage;
