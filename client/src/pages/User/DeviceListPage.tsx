import EWasteHubImage from "../../assets/EWasteHub.jpg";
import {RiFilter3Line, RiLogoutBoxRLine, RiUserSettingsFill, RiUserSharedLine} from "react-icons/ri";
import React, {useState} from "react";

    const UserDashboard = () => {
        //Adding details for testing
        const devices = [
        {
            name: "Iphone",
            phoneNumber: "09876543210",
            createdAt: "31 Jul 2022, 07:13 PM",
            verified: "Yes"
        },
        {
            name: "Samsung",
            phoneNumber: "09865874728",
            createdAt: "Jan 11, 2023 at 01:49 pm",
            verified: "No"
        },
        {
            name: "One Plus",
            phoneNumber: "097485632189",
            createdAt: "Mar 13, 2023 at 08:05 am",
            verified: "Yes"
        },
        // Add more devices as needed
    ];

    // Function to handle search input changes
    const [searchQuery, setSearchQuery] = useState('');
    const [device, setDevices] = useState(devices);

    // Function to handle search input changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
        // Filter devices based on search query
        const filteredDevices = devices.filter(device =>
            device.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDevices(filteredDevices);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // No action is taken after preventing the default form behavior
    };

        return (
            <div className="flex h-screen bg-gray-100">
                <div className="flex-1 flex flex-col overflow-hidden bg-white">
                    <div className="flex justify-between items-center p-4 shadow bg-gray-100">
                        <h3 className="text-gray-700 text-3xl font-medium flex-1 text-center">List of Devices</h3>
                        <div className="flex dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component"
                                         src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li><a>Profile</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                    <header className="flex justify-center items-center p-4 shadow bg-gray-100 px-40">
                        <form className="flex-1" onSubmit={handleSearchSubmit}>
                            <input
                                type="search"
                                placeholder="Search"
                                className="input input-bordered bg-white text-black w-full"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </form>
                        <div className="dropdown dropdown-end ml-4">
                        <label tabIndex={0} className="btn btn-ghost cursor-pointer">
                                <RiFilter3Line className="text-lg"/> Filter
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li><a>Ascending</a></li>
                                <li><a>Descending</a></li>
                                {/* Additional filter options */}
                            </ul>
                        </div>
                    </header>
                    {/* Main content */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="container mx-auto px-6 py-8">
                            <h5 className="text-black text-3xl font-medium mb-6"></h5>

                            <div className="overflow-x-auto">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                        <tr>
                                            <th className="font-bold text-base min-w-[200px]">Device Name</th>
                                            <th className="font-bold text-base min-w-[200px]">Phone Number</th>
                                            <th className="font-bold text-base min-w-[200px]">CreatedAt</th>
                                            <th className="font-bold text-base min-w-[200px]">Verified</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {devices.map((device, index) =>
                                            <tr key={index}>
                                                <td className="font-bold">{device.name}</td>
                                                <td className="text-sm opacity-50">{device.phoneNumber}</td>
                                                <td className="text-sm opacity-50">{device.createdAt}</td>
                                                <td className="text-sm opacity-50">{device.verified}</td>
                                                <th>
                                                    <button className="btn btn-link">details</button>
                                                </th>
                                            </tr>
                                        )}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center px-20 py-20">
                            <button className="btn btn-circle" style={{ backgroundColor: 'blue', color: 'white' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        );
    };
export default UserDashboard;