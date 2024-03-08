import React, { useState, useEffect, ChangeEvent } from 'react';
import { RiSearchLine, RiLogoutBoxRLine, RiSmartphoneLine, RiSmartphoneFill, RiFilter3Line, RiArrowDropRightLine, RiArrowDropLeftLine } from 'react-icons/ri';
import EWasteHubImage from '../../assets/EWasteHub.jpg';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';

interface Device {
    id: number;
    manufacturer: string;
    model: string;
    createdAt: string;
    verified: boolean;
    image: string;
    storage: string;
    color: string;
    dataRecovered: boolean;
    condition: string;
    classification: string;
    dataRetrievalRequested: boolean;
  dataRetrievalTimeLeft: string;
}

const StaffDashboard = () => {
    const [devices, setDevices] = useState<Device[]>([
        { id: 1, manufacturer: 'Iphone', model: '10', createdAt: '31 Jul 2022, 07:13 PM', verified: true,  image: image1, storage: '64GB', color: 'Silver', dataRecovered: true, condition: 'good', classification: 'Current', dataRetrievalRequested: false, dataRetrievalTimeLeft: '' },
        { id: 2, manufacturer: 'Samsung', model: 'S23', createdAt: '11 Jan 2024, 01:49 PM', verified: false,  image: image2, storage: '64GB', color: 'Red', dataRecovered: true, condition: 'bad' , classification: 'Recycle', dataRetrievalRequested: true, dataRetrievalTimeLeft: '' },
        { id: 3, manufacturer: 'Samsung', model: 's22', createdAt: '31 Jul 2022, 07:13 PM', verified: true,  image: image2, storage: '128GB', color: 'Blue', dataRecovered: true, condition: 'bad', classification: 'Current', dataRetrievalRequested: false, dataRetrievalTimeLeft: '' },
        { id: 4, manufacturer: 'Samsung', model: 's10', createdAt: '11 Jan 2023, 01:49 PM', verified: false,  image: image1, storage: '64GB', color: 'Silver', dataRecovered: true, condition: 'good', classification: 'Rare', dataRetrievalRequested: false, dataRetrievalTimeLeft: '' },
        { id: 5, manufacturer: 'Iphone', model: '15 Pro Max', createdAt: '31 Jul 2022, 07:13 PM', verified: true,  image: image2 , storage: '64GB', color: 'Pink', dataRecovered: true, condition: 'excellent', classification: 'Recycle', dataRetrievalRequested: true, dataRetrievalTimeLeft: '' },
        { id: 6, manufacturer: 'Samsung', model: 'S24 Ultra', createdAt: '11 Jan 2023, 01:49 PM', verified: false, image: image1 , storage: '64GB', color: 'Silver', dataRecovered: true, condition: 'good', classification: 'Current', dataRetrievalRequested: false, dataRetrievalTimeLeft: '' },
        { id: 7, manufacturer: 'Iphone', model: '10', createdAt: '31 Jul 2022, 07:13 PM', verified: true,  image: image1, storage: '128GB', color: 'Red', dataRecovered: true, condition: 'excellent', classification: 'Rare', dataRetrievalRequested: true, dataRetrievalTimeLeft: '' },
        { id: 8, manufacturer: 'Samsung', model: 'S23', createdAt: '11 Jan 2023, 01:49 PM', verified: false,  image: image2, storage: '64GB', color: 'Black' , dataRecovered: true, condition: 'bad', classification: 'Rare', dataRetrievalRequested: true, dataRetrievalTimeLeft: '' },
        { id: 9, manufacturer: 'Samsung', model: 's22', createdAt: '31 Jul 2022, 07:13 PM', verified: true,  image: image2, storage: '256GB', color: 'Silver' , dataRecovered: true, condition: 'excellent', classification: 'Current', dataRetrievalRequested: false, dataRetrievalTimeLeft: '' },
        { id: 10, manufacturer: 'Samsung', model: 's10', createdAt: '11 Jan 2023, 01:49 PM', verified: false,  image: image1, storage: '64GB', color: 'Red' , dataRecovered: false, condition: 'excellent', classification: 'Recycle', dataRetrievalRequested: true, dataRetrievalTimeLeft: '' },
        { id: 11, manufacturer: 'Iphone', model: '15 Pro Max', createdAt: '31 Jul 2022, 07:13 PM', verified: true,  image: image2 , storage: '64GB', color: 'Pink' , dataRecovered: false, condition: 'excellent', classification: 'Current', dataRetrievalRequested: true, dataRetrievalTimeLeft: '' },
        { id: 12, manufacturer: 'Samsung', model: 'S24 Ultra', createdAt: '11 Jan 2023, 01:49 PM', verified: false, image: image1, storage: '64GB', color: 'Silver' , dataRecovered: false, condition: 'good' , classification: 'Recycle', dataRetrievalRequested: false, dataRetrievalTimeLeft: '' },
        { id: 13, manufacturer: 'Iphone', model: '10', createdAt: '31 Jul 2022, 07:13 PM', verified: true,  image: image1, storage: '512GB', color: 'Blue', dataRecovered: false, condition: 'excellent', classification: 'Recycle', dataRetrievalRequested: true, dataRetrievalTimeLeft: '' },
        { id: 14, manufacturer: 'Samsung', model: 'S23', createdAt: '11 Jan 2023, 01:49 PM', verified: false,  image: image2 , storage: '64GB', color: 'Silver', dataRecovered: false, condition: 'good' , classification: 'Recycle', dataRetrievalRequested: false, dataRetrievalTimeLeft: '' },
        { id: 15, manufacturer: 'Samsung', model: 's22', createdAt: '31 Jul 2022, 07:13 PM', verified: true,  image: image2 , storage: '128GB', color: 'Black' , dataRecovered: false, condition: 'bad', classification: 'Current', dataRetrievalRequested: false, dataRetrievalTimeLeft: '' },
        { id: 16, manufacturer: 'Samsung', model: 's10', createdAt: '11 Jan 2023, 01:49 PM', verified: false,  image: image1 , storage: '64GB', color: 'Blue', dataRecovered: false, condition: 'excellent' , classification: 'Recycle', dataRetrievalRequested: true, dataRetrievalTimeLeft: '' },
        { id: 17, manufacturer: 'Iphone', model: '15 Pro Max', createdAt: '31 Jul 2022, 07:13 PM', verified: true,  image: image2 , storage: '512GB', color: 'Pink' , dataRecovered: false, condition: 'bad', classification: 'Rare', dataRetrievalRequested: true, dataRetrievalTimeLeft: '' },
        { id: 18, manufacturer: 'Samsung', model: 'S24 Ultra', createdAt: '11 Jan 2023, 01:49 PM', verified: false, image: image1, storage: '256GB', color: 'Black' , dataRecovered: false, condition: 'good', classification: 'Current', dataRetrievalRequested: false, dataRetrievalTimeLeft: '' }
      
    ]);
      
    const [searchQuery, setSearchQuery] = useState('');
    const [showVerified, setShowVerified] = useState(true);
    const [sortOrder, setSortOrder] = useState<string>('');

    const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

    const toggleDeviceDetails = (id: number) => {
        console.log("Current selectedDeviceId:", selectedDeviceId);
        setSelectedDeviceId(prevId => {
          console.log("Updating selectedDeviceId to:", prevId === id ? null : id);
          return prevId === id ? null : id;
        });
      };
      
    useEffect(() => {
        // Function to apply sorting
        const sortDevices = () => {
          let sortedDevices = [...devices];
          if (sortOrder === 'ascending') {
            sortedDevices.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
          } else if (sortOrder === 'descending') {
            sortedDevices.sort((a, b) => b.manufacturer.localeCompare(a.manufacturer));
          }
          return sortedDevices;
        };
    
        // Update the devices state with the sorted list
        setDevices(sortDevices());
      }, [sortOrder]); // This useEffect depends on sortOrder
    
      const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
      };
    
      const handleFilterChange = (newSortOrder: string) => {
        setSortOrder(newSortOrder);
      };
    
      const toggleDeviceVerification = (deviceId: number) => {
        setDevices(devices.map(device => {
          if (device.id === deviceId) {
            return { ...device, verified: !device.verified };
          }
          return device;
        }));
      };
    
      // Function to filter devices based on search query and verification status
      const getFilteredDevices = () => {
        return devices.filter(device =>
          device.manufacturer.toLowerCase().includes(searchQuery) &&
          device.verified === showVerified
        );
      };
      const [showLogoutModal, setShowLogoutModal] = useState(false);
    
      // Use this function to render your devices
      const filteredDevices = getFilteredDevices();

      const renderDeviceDetails = (device: Device) => {
        const renderCexLink = () => {
          if (device.classification === 'Rare' || device.classification === 'Current') {
            return (
              <p>
                <strong>CEX Link:</strong>{' '}
                <a href="https://uk.webuy.com/" target="_blank" rel="noopener noreferrer">CEX</a>
              </p>
            );
          }
          return null;
        };
      
        const calculateDataRetrievalTimeLeft = () => {
            if (device.classification === 'Recycle' && device.dataRetrievalRequested) {
              // Get the creation date of the device
              const creationDate = new Date(device.createdAt);
              // Add 3 months to the creation date
              const endTime = new Date(creationDate.getFullYear(), creationDate.getMonth() + 3, creationDate.getDate());
              // Get the current date
              const currentDate = new Date();
              
              if (currentDate < endTime) {
                // Calculate the difference in milliseconds between the current date and the end time
                const timeDifference = endTime.getTime() - currentDate.getTime();
                // Convert the difference to days
                const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
                return `${daysLeft} days left`;
              } else {
                return 'Expired';
              }
            }
            return 'Not applicable';
          };
          
        return (
          <div className="device-details" style={{ minWidth: '300px' }}>
            <img src={device.image} alt={`${device.manufacturer} ${device.model}`} style={{ width: '100%', height: 'auto', marginBottom: '20px', objectFit: 'cover' }} />
            <h3>{device.manufacturer} {device.model}</h3>
            <p><strong>Creation Date:</strong> {device.createdAt}</p>
            <p><strong>Verification Status:</strong> {device.verified ? 'Verified' : 'Not Verified'}</p>
            <p><strong>Storage:</strong> {device.storage}</p>
            <p><strong>Color:</strong> {device.color}</p>
            <p><strong>Data Recovered:</strong> {device.dataRecovered ? 'Yes' : 'No'}</p>
            <p><strong>Condition:</strong> {device.condition}</p>
            <p><strong>Classification:</strong> {device.classification}</p>
            <p><strong>Data Retrieval Requested:</strong> {device.dataRetrievalRequested ? 'Yes' : 'No'}</p>
            <p><strong>Data Retrieval Time Left:</strong> {calculateDataRetrievalTimeLeft()}</p>
            {renderCexLink()}
          </div>
        );
      };
      
      
  return (
    <div className="flex h-screen bg-gray-100">
        
      {/* Sidebar */}
      <div className="sidebar bg-white text-black w-60 py-7 px-0 relative">
        <div className="flex items-center justify-center pb-10">
          <img src={EWasteHubImage} alt="E-Waste Hub Logo" className="w-28 h-28" />
        </div>

        <nav className="absolute top-56 w-full">
          <h5 className="text-xl font-medium mb-4 text-center">Devices</h5>
          <button onClick={() => setShowVerified(true)} className={`btn ${showVerified ? 'btn-primary' : 'btn-ghost'} btn-block normal-case`}>
            <RiSmartphoneFill className="text-lg mr-2" /> Verified Devices
          </button>
          <button onClick={() => setShowVerified(false)} className={`btn ${!showVerified ? 'btn-primary' : 'btn-ghost'} btn-block normal-case`}>
            <RiSmartphoneLine className="text-lg mr-2" /> Non-Verified Devices
          </button>
        </nav>
      </div>

    {/* Content area */}
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4 shadow bg-gray-100">
        <h3 className="text-gray-700 text-3xl font-medium flex-1 text-center">Staff Dashboard</h3>
        <button
          className="btn btn-ghost ml-4"
          onClick={() => setShowLogoutModal(true)}
        >
          <RiLogoutBoxRLine className="text-lg mr-2" /> Logout
        </button>
      </div>

        {/* Header and other components remain the same */}
        {/* Filter and search input */}
        <header className="flex justify-between items-center p-4 shadow bg-gray-100">
            <form className="flex-1" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="search"
                    placeholder="Search Devices"
                    className="input input-bordered bg-white text-black w-full"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </form>
            <div className="dropdown dropdown-end ml-4">
                <label tabIndex={0} className="btn btn-ghost cursor-pointer">
                    <RiFilter3Line className="text-lg" /> Filter
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={() => handleFilterChange('ascending')}>Ascending</a></li>
                    <li><a onClick={() => handleFilterChange('descending')}>Descending</a></li>
                </ul>
            </div>
        </header>

        {/* Devices Table */}
        <div className="main-content flex-grow p-4">
        <h5 className="text-black text-3xl font-medium mb-6">
            {showVerified ? 'Verified Devices' : 'Non-Verified Devices'}
        </h5>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)', scrollbarWidth: 'thin', scrollbarColor: 'white grey' }}> {/* Added scrollbarWidth and scrollbarColor */}
            <table className="table w-full text-black">
            <thead>
                <tr>
                <th className="text-black min-w-[150px]">Image</th>
                <th className="text-black min-w-[200px]">Name</th>
                <th className="text-black min-w-[200px]">Model</th>
                <th className="text-black min-w-[150px]">Created At</th>
                <th className="text-black min-w-[200px]">Status</th>
                <th className="text-black min-w-[200px]">Classification</th>
                <th>Expand</th>
                </tr>
            </thead>
            <tbody>
                {filteredDevices.map((device) => (
                <tr key={device.id}>
                    <td>
                    <img src={device.image} alt={`${device.manufacturer} ${device.model}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    </td>
                    <td>{device.manufacturer}</td>
                    <td>{device.model}</td>
                    <td>{device.createdAt}</td>
                    <td>
                    <button className={`btn ${device.verified ? 'btn-error' : 'btn-success'}`} onClick={() => toggleDeviceVerification(device.id)}>
                        {device.verified ? 'Unverify' : 'Verify'}
                    </button>
                    </td>
                    <td>{device.classification}</td>
                    <td>
                    <button onClick={() => toggleDeviceDetails(device.id)}>
                        {selectedDeviceId === device.id ? <RiArrowDropLeftLine /> : <RiArrowDropRightLine />}
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>

        {/* Overlay to fade out content and close details pane */}
        {selectedDeviceId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setSelectedDeviceId(null)}></div>
        )}

        {/* Detailed view section */}
        {selectedDeviceId && (
        <div className="device-details w-1/4 bg-white p-4 overflow-y-auto absolute right-0 top-0 h-full z-30">
            {/* Find the selected device and render its details */}
            {devices.filter(device => device.id === selectedDeviceId).map(device => renderDeviceDetails(device))}
        </div>
        )}
       {/* Logout Confirmation Modal */}
       {showLogoutModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Are you sure you want to logout?</h3>
              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowLogoutModal(false)} // Close modal on 'Yes'
                >
                  Yes
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowLogoutModal(false)} // Close modal on 'No'
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
  );
};
export default StaffDashboard;