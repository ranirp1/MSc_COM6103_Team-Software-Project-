import React from "react";
import Navigation from "../../Navigation";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(169, 52%, 80%)' }}>
      <Navigation backgroundColor="hsl(169, 52%, 80%)" />
      {/* LandingPage content goes here */}
      <div className="p-8">
        {/* Content specific to LandingPage */}
        {/* More content */}
      </div>
    </div>
  );
};

export default LandingPage;
