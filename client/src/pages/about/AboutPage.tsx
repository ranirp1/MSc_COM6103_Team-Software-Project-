import React from "react";
import logo from "../../logo.svg";

const AboutPage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="text-3xl font-bold underline">Hello Team Titans</div>
      </header>
    </div>
  );
};

export default AboutPage;
