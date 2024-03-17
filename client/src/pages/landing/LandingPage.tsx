import React from "react";
import Navigation from "../../Navigation";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CardPayment from "../../components/CardPayment";

// const publicKey = process.env.PUBLIC_URL || ""
const publicKey = "pk_test_51OrgFjIVN70bvUYCC4WUSwxYMeBWIQfc7A4rToYj6aDG0KzxHW1WLqvqpOycFM5ldApdqxFobn2LoiReJClOVwT400L7Q7ADBN"
const stripePromise = loadStripe(publicKey)
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(169, 52%, 80%)' }}>
      <Navigation backgroundColor="hsl(169, 52%, 80%)" />
      {/* LandingPage content goes here */}
        <div>
            {/* Content specific to LandingPage */}
            {/* More content */}
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="justify-center items-center p-8 bg-neutral-300">
                <Elements stripe={stripePromise}>
                    <CardPayment />
                </Elements>
            </div>
        </div>
    </div>
  );
};

export default LandingPage;
