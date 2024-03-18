import React from "react";
import Navigation from "../../Navigation";

const PaymentFailure: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(169, 52%, 80%)' }}>
      <Navigation backgroundColor="hsl(169, 52%, 80%)" />
      {/* LandingPage content goes here */}
        <div>
            <h1>Payment Failure</h1>
        </div>
    </div>
  );
};

export default PaymentFailure;