import Navigation from "../../Navigation";
import EWasteHubImage from "../../assets/EWasteHub.jpg";
import React, {useState} from "react";

const CreateAccount = () => {

    // Adapted from LoginPage.tsx
    // not entirely sure what this toast thing is, but I've used it as best I could...

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [terms, setTerms] = useState(0);

    const [showToast, setShowToast] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try {
            const response = await fetch('/api/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, first_name, last_name, phoneNumber, terms })
            });

            if(response.ok){
                setShowToast(1);
                setTimeout(() => {
                    setShowToast(0);
                }, 3000);
                console.log("Registration Successful");
            }
            else{
                setShowToast(2)
                setTimeout(() => {
                    setShowToast(0);
                }, 3000);
                console.log("Registration Error");

                // get the error message from the server and save it to show in toast
                const errorMessage = await response.json();
                setErrorMessage(errorMessage.message);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

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
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="input input-bordered w-full bg-gray-50" value={first_name} onChange={(e => setFirstName(e.target.value))}/>
                            <input type="text" placeholder="Last Name" className="input input-bordered w-full bg-gray-50" value={last_name} onChange={(e => setLastName(e.target.value))}/>
                        </div>
                        <input type="email" placeholder="Email" className="input input-bordered w-full bg-gray-50" value={email} onChange={(e => setEmail(e.target.value))}/>
                        <input type="tel" placeholder="Phone Number" className="input input-bordered w-full bg-gray-50" value={phoneNumber} onChange={(e => setPhoneNumber(Number(e.target.value)))}/>
                        <input type="password" placeholder="Password" className="input input-bordered w-full bg-gray-50" value={password} onChange={(e => setPassword(e.target.value))}/>
                        
                        {/* Terms & Conditions */}
                        <label className="label cursor-pointer justify-start space-x-2">
                            <input type="checkbox" className="checkbox checkbox-primary" value={0} onChange={(e => setTerms(e.target.checked? 1: 0))}/>
                            <span className="label-text">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a></span>
                        </label>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row sm:justify-between mt-6">
                            <button className="btn bg-blue-200 hover:bg-blue-300 text-blue-900 w-full sm:w-auto mb-2 sm:mb-0">Register</button>
                        </div>
                    </form>
                </div>
            </div>
            {showToast === 1 && (
            <div className="toast toast-center">
                <div className="alert alert-success">
                    <span>Registration Successful</span>
                </div>
            </div>
            )}
            {showToast === 2 && (
            <div className="toast toast-center">
                <div className="alert alert-error">
                    {/* Show the error message */}
                    <span>{errorMessage}</span>
                </div>
            </div>
            )}
        </div>
    );
};

export default CreateAccount;