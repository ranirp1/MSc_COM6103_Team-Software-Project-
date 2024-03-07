import EWasteHubImage from "../../assets/EWasteHub.jpg";
import Samsung from "../../assets/Samsung.png";
import IPhone from "../../assets/IPhone.png";
import OnePlus from "../../assets/OnePlus.jpg";
import {RiArrowDropLeftLine, RiArrowDropRightLine, RiFilter3Line, RiLogoutBoxRLine, RiUserSettingsFill, RiUserSharedLine} from "react-icons/ri";
import React, {useState, ChangeEvent} from "react";
import "../../style.css";

interface Device {
    image:string;
    brand:string;
    model:string;
    createdAt:string;
    isVerified:Boolean; 
    deviceType:string;
  }
    const UserDashboard = () => {
        //Adding details for testing
        const devices = [
        {
            image:IPhone,
            brand: "Iphone",
            model:"12",
            createdAt: "31 Jul 2022, 07:13 PM",
            isVerified: true,
            deviceType:"Current"
        },
        {
            image:Samsung,
            brand: "Samsung",
            model:"S23",
            createdAt: "Jan 11, 2023 at 01:49 pm",
            isVerified: false,
            deviceType:"Rare"
        },
        {
            image:OnePlus,
            brand: "One Plus",
            model:"10T",
            createdAt: "Mar 13, 2023 at 08:05 am",
            isVerified: true,
            deviceType:"Recycle"
        },
        // Add more devices as needed
    ];
    const [sortOrder, setSortOrder] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };
    
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
      };
      const filterDevices = (devices: Device[]) => {
        // Apply search filter
        let filteredDevices = devices.filter(device =>
            device.brand.toLowerCase().includes(searchQuery) ||
            device.model.includes(searchQuery) ||
            device.createdAt.toLowerCase().includes(searchQuery) ||
            device.deviceType.includes(searchQuery)
        );

        // Apply sort filter
        if (sortOrder === 'ascending') {
            filteredDevices.sort((a, b) => a.brand.localeCompare(b.brand));
        } else if (sortOrder === 'descending') {
            filteredDevices.sort((a, b) => b.brand.localeCompare(a.brand));
        }

        return filteredDevices;
    };
    const getClassificationBadgeClass = (classification: string) => {
        switch (classification) {
          case "Current":
            return "badge-current"; // Define badge-current in your CSS for the corresponding styling
          case "Rare":
            return "badge-rare"; // Define badge-rare in your CSS for the corresponding styling
          case "Recycle":
            return "badge-recycle"; // Define badge-recycle in your CSS for the corresponding styling
          case "Unknown":
            return "badge-unknown";
        }
      };

      const handleFilterChange = (newSortOrder: string) => {
        setSortOrder(newSortOrder);
      };

      const getFilteredDevices = () => {
        return devices.filter(device =>
          device.brand.toLowerCase().includes(searchQuery)
        );
      };

      const filteredDevices = filterDevices(devices);
        return (
            <div className="flex h-screen bg-gray-100">
          <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center p-4 shadow bg-gray-100">
                    <img src={EWasteHubImage} alt="E-Waste Hub Logo" className="w-20 h-20 rounded-full" />
                        <h3 className="text-gray-700 text-3xl font-medium text-center flex-1">Your Devices</h3>
                        <div className="flex dropdown dropdown-end">
                            <div>
                            <button className="btn btn-primary">Add Device</button>
                            </div>
                        </div>
                    </div>
                    <header className="flex p-4 shadow bg-gray-100">
                        <form className="flex-1" onSubmit={(e) => e.preventDefault()}>
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
                            <li><a onClick={() => handleFilterChange('ascending')}>Ascending</a></li>
                            <li><a onClick={() => handleFilterChange('descending')}>Descending</a></li>
                            </ul>
                        </div>
                    </header>
                    {/* Main content */}
                    <main className="overflow-x-hidden overflow-y-auto">
                    <div className="mx-auto px-6 py-8">
                            <h5 className="text-black text-3xl font-medium mb-6"></h5>

                            <div className="overflow-x-auto">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                        <tr>
                                            <th className="font-bold text-base min-w-[150px]">Image</th>
                                            <th className="font-bold text-base min-w-[150px]">Device Name</th>
                                            <th className="font-bold text-base min-w-[100px]">Model</th>
                                            <th className="font-bold text-base min-w-[150px]">CreatedAt</th>
                                            <th className="font-bold text-base min-w-[150px]">Verified</th>
                                            <th className="font-bold text-base min-w-[150px]">Classification</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredDevices.map((deviceList, index) =>
                                            <tr key={index}>
                                                <td><img src={deviceList.image} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></td>
                                                <td className="font-bold">{deviceList.brand}</td>
                                                <td className="text-sm">{deviceList.model}</td>
                                                <td className="text-sm">{deviceList.createdAt}</td>
                                                <td className="justify-center" style={{ alignItems: "center" }}>
                                                    <div className={`badge ${deviceList.isVerified ? "badge-success" : "badge-error"}`}>
                                                        {deviceList.isVerified ? "Verified" : "Not Verified"}
                                                    </div>
                                                </td>
                                                <td className="text-sm">
                                                    <span className={`badge ${getClassificationBadgeClass(deviceList.deviceType)}`}>
                                                    {deviceList.deviceType}
                                                    </span>
                                                </td>
                                                <th>
                                                    <button onClick={handleToggleExpand}>
                                                        {expanded ? <RiArrowDropLeftLine size={32}/> : <RiArrowDropRightLine size={32}/>}
                                                    </button>
                                                </th>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    };
export default UserDashboard;