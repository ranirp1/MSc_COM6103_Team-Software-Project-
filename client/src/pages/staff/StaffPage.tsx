import { ChangeEvent, useEffect, useState } from "react";
import {
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiFilter3Line,
  RiLogoutBoxRLine,
  RiSmartphoneFill,
  RiSmartphoneLine,
} from "react-icons/ri";
import EWasteHubImage from "../../assets/EWasteHub.jpg";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import emptyListImage from "../../assets/empty_list.svg"
import { API_URL } from "../../constants/constant";
import { redirect } from "react-router-dom";



class Device {
  id: number;
  brand: string;
  model: string;
  createdAt: string;
  verified: boolean;
  image: string;
  storage: string;
  color: string;
  dataRecovered?: boolean | null;
  condition: string;
  classification: string;
  dataRetrievalRequested?: boolean | null;
  dataRetrievalTimeLeft: string;

  constructor(
    id: number,
    manufacturer: string,
    model: string,
    createdAt: string,
    verified: boolean,
    image: string,
    storage: string,
    color: string,
    dataRecovered: boolean | null,
    condition: string,
    classification: string,
    dataRetrievalRequested: boolean | null,
    dataRetrievalTimeLeft: string
  ) {
    this.id = id;
    this.brand = manufacturer;
    this.model = model;
    this.createdAt = createdAt;
    this.verified = verified;
    this.image = image;
    this.storage = storage;
    this.color = color;
    this.dataRecovered = dataRecovered;
    this.condition = condition;
    this.classification = classification;
    this.dataRetrievalRequested = dataRetrievalRequested;
    this.dataRetrievalTimeLeft = dataRetrievalTimeLeft;
  }

  static fromJson(json: any): Device {
    return new Device(
      json.id,
      json.manufacturer,
      json.model,
      json.createdAt,
      json.verified,
      json.image,
      json.storage,
      json.color,
      json.dataRecovered,
      json.condition,
      json.classification,
      json.dataRetrievalRequested,
      json.dataRetrievalTimeLeft
    );
  }
}

const StaffDashboard = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getListOfDevices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("getListOfDevices api success");
        var data = await response.json();
        console.log("data", data);
        setDevices(data);
        console.log("Role updated sucessfully");
      } else {
        console.error("getListOfDevices api failed");
      }
    } catch (error) {
      console.error("Error getListOfDevices user role:", error);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
 // const [showVerified, setShowVerified] = useState(true);
  const [sortOrder, setSortOrder] = useState<string>("");

  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const toggleDeviceDetails = (id: number) => {
    console.log("Current selectedDeviceId:", selectedDeviceId);
    setSelectedDeviceId((prevId) => {
      console.log("Updating selectedDeviceId to:", prevId === id ? null : id);
      return prevId === id ? null : id;
    });
  };

  useEffect(() => {
    // Function to apply sorting
    const sortDevices = () => {
      let sortedDevices = [...devices];
      if (sortOrder === "ascending") {
        sortedDevices.sort((a, b) => a.brand.localeCompare(b.brand));
      } else if (sortOrder === "descending") {
        sortedDevices.sort((a, b) => b.brand.localeCompare(a.brand));
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

  const toggleDeviceVerification = async (deviceId: number) => {
    // Find the device and its current verification status
    const deviceIndex = devices.findIndex((d) => d.id === deviceId);
    if (deviceIndex === -1) {
      console.error('Device not found');
      return;
    }
  
    const device = devices[deviceIndex];
    const newVerificationStatus = !device.verified;
  
    try {
      // Update the backend first
      const response = await fetch(`${API_URL}/api/changeDeviceVerification/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceID: deviceId,
          isVerified: newVerificationStatus,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Backend failed to update device verification status');
      }
  
      // Update the frontend after a successful backend response
      setDevices(
        devices.map((d, index) => {
          if (index === deviceIndex) {
            return { ...d, verified: newVerificationStatus };
          }
          return d;
        })
      );
    } catch (error) {
      console.error('Error updating verification status:', error);
      // Revert the frontend update if the backend call fails
      setDevices(
        devices.map((d, index) => {
          if (index === deviceIndex) {
            // Revert the 'verified' status of the device
            return { ...d, verified: !newVerificationStatus };
          }
          return d;
        })
      );
    }
  };
  
  

  // Function to filter devices based on search query and verification status
  const getFilteredDevices = () => {
    return devices.filter(
      (device) =>
        device.brand.toLowerCase().includes(searchQuery) 
       // && device.verified === showVerified
    );
  };
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Use this function to render your devices
  const filteredDevices = getFilteredDevices();

  const renderDeviceDetails = (device: Device) => {
    const createCexSearchUrl = (
      manufacturer: string,
      model: string,
      storage: string,
      color: string,
    createdAt: string,
    verified: boolean,
    image: string,
    dataRecovered: boolean | null,
    condition: string,
    classification: string,
    dataRetrievalRequested: boolean | null,
    dataRetrievalTimeLeft: string
    ) => {
      const baseUrl = "https://uk.webuy.com/search";
      return `${baseUrl}?stext=${encodeURIComponent(
        `${manufacturer} ${model} ${storage} ${color} ${createdAt} ${verified} 
        ${image} ${dataRecovered} ${condition} ${classification}${dataRetrievalRequested} ${dataRetrievalTimeLeft}`
      )}`;
    };

    const renderCexLink = () => {
      if (
        device.classification === "Rare" ||
        device.classification === "Current"
      ) {
        const cexUrl = createCexSearchUrl(
          device.brand,
          device.model,
          device.storage,
          device.color,
          device.createdAt,
          device.verified,
          device.image,
          device.dataRecovered!,
          device.condition,
          device.classification,
          device.dataRetrievalRequested!,
          device.dataRetrievalTimeLeft

        );
        return (
          <div className="mt-2">
            <strong>CEX Link:</strong>{" "}
            <a
              href={cexUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Search on CEX
            </a>
          </div>
        );
      }
      return null;
    };

    const calculateDataRetrievalTimeLeft = () => {
      // Return "Not applicable" for "Current" and "Rare" classifications
      if (
        device.classification === "Current" ||
        device.classification === "Rare"
      ) {
        return "Not applicable";
      }

      if (
        device.classification === "Recycle" &&
        device.dataRetrievalRequested
      ) {
        const creationDate = new Date(device.createdAt);
        const endTime = new Date(
          creationDate.getFullYear(),
          creationDate.getMonth() + 3,
          creationDate.getDate()
        );
        const currentDate = new Date();

        if (currentDate < endTime) {
          const timeDifference = endTime.getTime() - currentDate.getTime();
          const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

          if (daysLeft > 30) {
            return `More than 1 month left`;
          } else if (daysLeft > 7) {
            return `More than 1 week left`;
          } else {
            return `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`;
          }
        } else {
          return "Expired";
        }
      }
      return "Not applicable";
    };

    const saveDeviceDetails = async (device: Device) => {
      try {
        const response = await fetch(`${API_URL}/api/updateDeviceDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(device),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update device details');
        }
    
        // Optionally, refetch the devices list or show a success message
        console.log('Device details updated successfully');
      } catch (error) {
        console.error('Error updating device details:', error);
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, deviceId: number, field: string) => {
      const newValue = event.target.value;
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === deviceId ? { ...device, [field]: newValue } : device
        )
      );
    };
     

    return (
      <div className="bg-white p-5 rounded-lg shadow-md">
        {/* Manufacturer and model name above the photo */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            value={device.brand}
            onChange={(e) => handleInputChange(e, device.id, 'brand')}

            className="text-2xl font-bold"
          />
          <input
            type="text"
            value={device.model}
            onChange={(e) => handleInputChange(e, device.id,  'model')}
            className="text-2xl font-bold"
          />
        </div>
  
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="w-full md:w-3/4 lg:w-3/4">
            {/* Larger image size */}
            <img
              src={image1}
              alt={`${device.brand} ${device.model}`}
              className="w-full h-auto rounded"
            />
          </div>
  
          <div className="md:ml-4 flex-1">
            <div className="flex flex-wrap -m-1 mt-20 md:mt-22">
              {/* Storage, Color, Condition, Classification */}
              <div className="p-1">
                <input
                  type="text"
                  value={device.storage}
                  onChange={(e) => handleInputChange(e, device.id, 'storage')}
                  className="input input-bordered"
                />
              </div>
              <div className="p-1">
                <input
                  type="text"
                  value={device.color}
                  onChange={(e) => handleInputChange(e, device.id,  'color')}
                  className="input input-bordered"
                />
              </div>
              <div className="p-1">
                <input
                  type="text"
                  value={device.condition}
                  onChange={(e) => handleInputChange(e, device.id,  'condition')}
                  className="input input-bordered"
                />
              </div>
              <div className="p-1">
                <input
                  type="text"
                  value={device.classification}
                  onChange={(e) => handleInputChange(e, device.id,  'classification')}
                  className="input input-bordered"
                />
              </div>
            </div>
          </div>
        </div>
  
        <div className="mt-4">
          <div className="mb-2">
            <span className="font-bold">Specifications:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Created At:</strong>
                <input
                  type="text"
                  value={device.createdAt}
                  onChange={(e) => handleInputChange(e, device.id,  'createdAt')}
                  className="input input-bordered"
                />
              </p>
              <p>
                <strong>Data Recovery:</strong>
                <select
                  value={device.dataRecovered ? 'Yes' : 'No'}
                  onChange={(e) => {
                    const isDataRecovered = e.target.value === 'Yes';
                    handleInputChange({ target: { value: isDataRecovered } } as unknown as React.ChangeEvent<HTMLInputElement>, device.id, 'dataRecovered');
                  }}
                  
                  className="select select-bordered"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </p>
            </div>
          </div>
        </div>
  
        {/* Render CEX Link if applicable */}
        {renderCexLink()}
  
              <button
        onClick={() => saveDeviceDetails(device)}
        className="btn btn-primary mt-4"
      >
        Save Changes
      </button>

      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 shadow-2xl">
      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 shadow bg-primary ">
          <img
            src={EWasteHubImage}
            alt="E-Waste Hub Logo"
            className=" w-16 h-16 rounded-full shadow-2xl  "
          />
          <h3 className="text-white text-3xl font-medium flex-1 text-center">
            Staff Dashboard
          </h3>
          <button
            className="btn btn-accent   ml-4"
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
              className="input input-bordered bg-white text-black w-full border-2 border-primary"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
          <details className="dropdown dropdown-end ml-4">
            <summary
              tabIndex={0}
              className="btn btn-ghost cursor-pointer border-2 border-primary"
            >
              <RiFilter3Line className="text-lg" /> Filter
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a onClick={() => handleFilterChange("ascending")}>Ascending</a>
              </li>
              <li>
                <a onClick={() => handleFilterChange("descending")}>
                  Descending
                </a>
              </li>
            </ul>
          </details>
        </header>

        <div
          role="tablist"
          className="tabs tabs-lifted tabs-lg  shadow-2xl mx-5"
        >

        </div>

        {/* Devices Table */}
        <div className="main-content flex-grow px-10 pt-5 ">
          <h5 className="text-black text-3xl font-medium mb-6">
          </h5>
          <div
            className="overflow-y-auto"
            style={{
              maxHeight: "calc(100vh - 200px)",
              scrollbarWidth: "thin",
              scrollbarColor: "white grey",
            }}
          >
            {filteredDevices.length == 0 ? (
              <div className="flex flex-col  w-full h-full items-center mt-16">
                <h3 className="text-3xl font-bold text-center mb-5 ">
                  No Devices Found
                </h3>
                <img src={emptyListImage} className="h-80 w-80"/>
                
              </div>
            ) : (
              <table className="table w-full text-black ">
                <thead>
                  <tr>
                    <th className="text-black text-lg font-bold min-w-[150px] ">
                      Image
                    </th>
                    <th className="text-black text-lg font-bold min-w-[200px]">
                      Name
                    </th>
                    <th className="text-black text-lg font-bold min-w-[200px]">
                      Model
                    </th>
                    <th className="text-black text-lg font-bold min-w-[150px]">
                      Created At
                    </th>
                    <th className="text-black text-lg font-bold min-w-[200px]">
                      Classification
                    </th>
                    <th className="text-black text-lg font-bold min-w-[200px]">
                      Status
                    </th>
                    <th className="text-black text-lg font-bold ">Expand</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.length == 0
                    ? "No List"
                    : filteredDevices.map((device) => (
                        <tr key={device.id}>
                          <td>
                            <img
                              src={image1}
                              alt={`${device.brand} ${device.model}`}
                              className="rounded-lg shadow-lg"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td className="text-lg">{device.brand}</td>
                          <td className="text-lg">{device.model}</td>
                          <td className="text-lg">{device.createdAt}</td>
                          <td className="text-lg">{device.classification || "Not Classified"}</td>
                          <td>
                            <div className="flex">
                              <label
                                htmlFor={`toggle-${device.id}`}
                                className="relative flex  group p-2"
                              >
                                <span className="text-sm mr-3">
                                  {device.verified
                                    ? "Verified"
                                    : "Not Verified"}
                                </span>
                                <input
                                  type="checkbox"
                                  id={`toggle-${device.id}`}
                                  className="sr-only peer"
                                  checked={device.verified}
                                  onChange={() =>
                                    toggleDeviceVerification(device.id)
                                  }
                                />
                                <span className="w-12 h-6 flex items-center flex-shrink-0 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-primary after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-full"></span>
                              </label>
                            </div>
                          </td>
                          <td>
                            <button
                              onClick={() => toggleDeviceDetails(device.id)}
                            >
                              {selectedDeviceId === device.id ? (
                                <RiArrowDropLeftLine />
                              ) : (
                                <RiArrowDropRightLine />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Overlay to fade out content and close details pane */}
        {selectedDeviceId && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSelectedDeviceId(null)}
          ></div>
        )}

        {/* Detailed view section */}
        {selectedDeviceId && (
          <div className="device-details w-1/2 bg-white p-4 overflow-y-auto absolute right-0 top-0 h-full z-30">
            {/* Find the selected device and render its details */}
            {devices
              .filter((device) => device.id === selectedDeviceId)
              .map((device) => renderDeviceDetails(device))}
          </div>
        )}
        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Are you sure you want to logout?
              </h3>
              <div className="modal-action flex flex-row">
                <button
                  className="btn btn-primary w-1/2 mr-1"
                  onClick={() => {
                    window.location.href = "/";
                  }} // Close modal on 'Yes'
                >
                  Yes
                </button>
                <button
                  className="btn btn-ghost w-1/2"
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
