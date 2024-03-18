import React, { useState } from "react";
import EWasteHubImage from "../../assets/EWasteHub.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setShowToast(1);
        console.log("Login Successful");
      } else {
        setShowToast(2);
        console.log("Login Error");
      }
    } catch (error) {
      console.log("Error:", error);
      setShowToast(2);
      console.log("Login Error");
    } finally {
      setTimeout(() => {
        setShowToast(0);
      }, 3000);
    }
  };

  return (
    <div
      
    >
      {showToast === 1 && (
        <div className="toast toast-center">
          <div className="alert alert-success flex items-center justify-center">
            <span>Login Successful!</span>
          </div>
        </div>
      )}
      {showToast === 2 && (
        <div className="toast toast-center">
          <div className="alert alert-error flex items-center justify-center">
            <span>Invalid Credentials!</span>
          </div>
        </div>
      )}
      <div className="flex-grow flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex lg:flex-row flex-col-reverse animate-fade-in">
          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center items-center my-6">
            <div
              className="h-96 w-full bg-cover bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${EWasteHubImage})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          {/* Form Section */}
          <div className="lg:w-1/2 p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Log In to Your Account
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full bg-gray-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Create Account Hyperlink */}
              {/* <div className="text-right mb-6">
                <a href="/register" className="text-sm text-primary link">
                  Don't have an account? Register here
                </a>
              </div> */}
              {/* Action Buttons */}
              <div className="flex flex-col">
                <button className="btn btn-primary flex">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
