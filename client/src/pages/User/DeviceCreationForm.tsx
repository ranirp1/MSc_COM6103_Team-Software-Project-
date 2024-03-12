import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const DeviceForm = () =>  {

  const [dataRetrieval, setDataRetrieval] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if data retrieval is selected as "Yes"
    if (dataRetrieval) {
      setShowPopup(true); // Show the popup
    } else {
      // Handle form submission without showing popup
      // For now, just log a message
      console.log('Form submitted without showing popup');
      navigate('/user');
    }
  };
    
  const handleDataRetrievalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataRetrieval(e.target.value === "Yes");
  };

  const handleCancel = () => {
    window.location.href = '/user';
  };

  const handleProceed = () => {
    // Handle proceed action here
    console.log('Proceeding with data retrieval...');
    setShowPopup(false); // Hide the popup after handling proceed action
    // Redirect to device list page and pass form data as state
  };


  return (
  <div className='flex justify-center'>
    <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg shadow-md p-8 w-full max-w-lg">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-bold leading-7 text-gray-900 text-center">Device Details</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block font-medium leading-6 text-gray-900">
                Model
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div className="sm:col-span-4">
              <label htmlFor="DateofPurchase" className="block font-medium leading-6 text-gray-900">
                Date of Purchase
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div className="sm:col-span-3">
              <label htmlFor="classification" className="block font-medium leading-6 text-gray-900">
                Device Classification
              </label>
              <div className="mt-2">
                <select
                  id="classification"
                  name="classification"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Current</option>
                  <option>Rare</option>
                  <option>Unknown</option>
                  <option>Recycle</option>
                </select>
              </div>
            </div>
  
            <div className="sm:col-span-4">
              <label htmlFor="DateofRelease" className="block font-medium leading-6 text-gray-900">
                Release Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4 flex">
                <label
                  htmlFor="image-upload" className="block font-medium leading-6 text-gray-900">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="ml-2 py-1.5 text-gray-900"
                />
              </div>

              <div className="sm:col-span-4 flex items-center">
                <span className="font-medium leading-6 text-gray-900 mr-4">Data Retrieval:</span>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer">
                    <input type="radio" name="data-retrieval" className="radio radio-primary" value="Yes" onChange={handleDataRetrievalChange} />
                    <span className="text-gray-900">Yes</span>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="data-retrieval" className="radio radio-primary" value="No" onChange={handleDataRetrievalChange} />
                    <span className="text-gray-900">No</span>
                  </label>
                </div>
              </div>
          </div>
        </div>
      </div>
  
  {/* Popup */}
  {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Confirmation</h2>
              <p className="text-gray-700 mb-4">Do you want to proceed with payment for data retrieval?</p>
                <div className="flex justify-end gap-x-4">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500" onClick={() => setShowPopup(false)}>Proceed</button> 
                  <button className="text-gray-900 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100" onClick={() => setShowPopup(false)}>Cancel</button>          
                </div>
              </div>
          </div>
        )}

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={handleCancel} type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
      </form>
  </div>
  );
  };
  export default DeviceForm;