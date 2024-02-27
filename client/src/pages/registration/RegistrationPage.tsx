import React from "react";
import Navigation from "../../Navigation";
import EWasteHubImage from "../../assets/EWasteHub.jpg";

const CreateAccount = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center" style={{ backgroundColor: 'hsl(169, 52%, 80%)' }}>
            <Navigation backgroundColor="hsl(169, 52%, 80%)" />
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex lg:flex-row flex-col-reverse">
                {/* Image Section */}
                <div className="lg:w-1/2 flex justify-center items-center">
                    <div className="h-96 w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${EWasteHubImage})`, backgroundSize: 'contain', backgroundPosition: 'center' }}></div>
                </div>
  
                {/* Form Section */}
                <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center items-center"> {/* Centering form content */}
                    {/* Sign In Hyperlink */}
                    <div className="text-right mb-6">
                        <a href="/login" className="text-sm text-blue-600 hover:underline">Already have an account? Sign in here</a>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Your Account</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="input input-bordered w-full bg-gray-50" />
                            <input type="text" placeholder="Last Name" className="input input-bordered w-full bg-gray-50" />
                        </div>
                        <input type="email" placeholder="Email" className="input input-bordered w-full bg-gray-50" />
                        <input type="tel" placeholder="Phone Number" className="input input-bordered w-full bg-gray-50" />
                        <input type="password" placeholder="Password" className="input input-bordered w-full bg-gray-50" />
                        
                        {/* Terms & Conditions */}
                        <label className="label cursor-pointer justify-start space-x-2">
                            <input type="checkbox" className="checkbox checkbox-primary" />
                            <span className="label-text">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a></span>
                        </label>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row sm:justify-between mt-6">
                            <button className="btn bg-blue-200 hover:bg-blue-300 text-blue-900 w-full sm:w-auto mb-2 sm:mb-0">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
