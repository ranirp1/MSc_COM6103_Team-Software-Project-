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
import { API_URL } from "../../constants/constant";

class Device {
  id: number;
  manufacturer: string;
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
    this.manufacturer = manufacturer;
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
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      manufacturer: "Iphone",
      model: "10",
      createdAt: "31 Jul 2023, 07:13 PM",
      verified: true,
      image: image2,
      storage: "64GB",
      color: "Silver",
      dataRecovered: null,
      condition: "good",
      classification: "Current",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "Not applicable",
    },
    {
      id: 2,
      manufacturer: "Samsung",
      model: "S23",
      createdAt: "12 Jan 2024, 01:49 PM",
      verified: false,
      image: image1,
      storage: "64GB",
      color: "Red",
      dataRecovered: true,
      condition: "bad",
      classification: "Recycle",
      dataRetrievalRequested: true,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 3,
      manufacturer: "Samsung",
      model: "s22",
      createdAt: "31 Jul 2022, 07:13 PM",
      verified: true,
      image: image1,
      storage: "128GB",
      color: "Blue",
      dataRecovered: null,
      condition: "bad",
      classification: "Current",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 4,
      manufacturer: "Samsung",
      model: "s10",
      createdAt: "11 Jan 2023, 01:49 PM",
      verified: false,
      image: image1,
      storage: "64GB",
      color: "Silver",
      dataRecovered: null,
      condition: "good",
      classification: "Rare",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },

    {
      id: 5,
      manufacturer: "Iphone",
      model: "15 Pro Max",
      createdAt: "31 Jul 2022, 07:13 PM",
      verified: true,
      image: image2,
      storage: "64GB",
      color: "Pink",
      dataRecovered: true,
      condition: "excellent",
      classification: "Recycle",
      dataRetrievalRequested: true,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 6,
      manufacturer: "Samsung",
      model: "S24 Ultra",
      createdAt: "11 Jan 2023, 01:49 PM",
      verified: false,
      image: image1,
      storage: "64GB",
      color: "Silver",
      dataRecovered: null,
      condition: "good",
      classification: "Current",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 7,
      manufacturer: "Iphone",
      model: "10",
      createdAt: "31 Jul 2022, 07:13 PM",
      verified: true,
      image: image2,
      storage: "128GB",
      color: "Red",
      dataRecovered: null,
      condition: "excellent",
      classification: "Rare",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 8,
      manufacturer: "Samsung",
      model: "S23",
      createdAt: "11 Jan 2023, 01:49 PM",
      verified: false,
      image: image1,
      storage: "64GB",
      color: "Black",
      dataRecovered: null,
      condition: "bad",
      classification: "Rare",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 9,
      manufacturer: "Samsung",
      model: "s22",
      createdAt: "31 Jul 2022, 07:13 PM",
      verified: true,
      image: image1,
      storage: "256GB",
      color: "Silver",
      dataRecovered: null,
      condition: "excellent",
      classification: "Current",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },

    {
      id: 10,
      manufacturer: "Samsung",
      model: "s10",
      createdAt: "11 Jan 2023, 01:49 PM",
      verified: false,
      image: image1,
      storage: "64GB",
      color: "Red",
      dataRecovered: false,
      condition: "excellent",
      classification: "Recycle",
      dataRetrievalRequested: true,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 11,
      manufacturer: "Iphone",
      model: "15 Pro Max",
      createdAt: "31 Jul 2022, 07:13 PM",
      verified: true,
      image: image2,
      storage: "64GB",
      color: "Pink",
      dataRecovered: null,
      condition: "excellent",
      classification: "Current",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 12,
      manufacturer: "Samsung",
      model: "S24 Ultra",
      createdAt: "11 Jan 2023, 01:49 PM",
      verified: false,
      image: image1,
      storage: "64GB",
      color: "Silver",
      dataRecovered: false,
      condition: "good",
      classification: "Recycle",
      dataRetrievalRequested: false,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 13,
      manufacturer: "Iphone",
      model: "10",
      createdAt: "31 Jul 2022, 07:13 PM",
      verified: true,
      image: image2,
      storage: "512GB",
      color: "Blue",
      dataRecovered: false,
      condition: "excellent",
      classification: "Recycle",
      dataRetrievalRequested: true,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 14,
      manufacturer: "Samsung",
      model: "S23",
      createdAt: "11 Jan 2023, 01:49 PM",
      verified: false,
      image: image1,
      storage: "64GB",
      color: "Silver",
      dataRecovered: false,
      condition: "good",
      classification: "Recycle",
      dataRetrievalRequested: false,
      dataRetrievalTimeLeft: "",
    },

    {
      id: 15,
      manufacturer: "Samsung",
      model: "s22",
      createdAt: "31 Jul 2022, 07:13 PM",
      verified: true,
      image: image1,
      storage: "128GB",
      color: "Black",
      dataRecovered: null,
      condition: "bad",
      classification: "Current",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 16,
      manufacturer: "Samsung",
      model: "s10",
      createdAt: "11 Jan 2023, 01:49 PM",
      verified: false,
      image: image1,
      storage: "64GB",
      color: "Blue",
      dataRecovered: false,
      condition: "excellent",
      classification: "Recycle",
      dataRetrievalRequested: true,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 17,
      manufacturer: "Iphone",
      model: "10",
      createdAt: "31 Jul 2022, 07:13 PM",
      verified: true,
      image: image2,
      storage: "512GB",
      color: "Blue",
      dataRecovered: false,
      condition: "excellent",
      classification: "Recycle",
      dataRetrievalRequested: true,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 18,
      manufacturer: "Samsung",
      model: "S24 Ultra",
      createdAt: "11 Jan 2023, 01:49 PM",
      verified: false,
      image: image1,
      storage: "256GB",
      color: "Black",
      dataRecovered: null,
      condition: "good",
      classification: "Current",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },
  ]);

  const fetchDevices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getListOfDevices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setDevices(await response.json());
        console.log("Role updated successfully");
      } else {
        console.error("getListOfDevices api failed");
      }
    } catch (error) {
      console.error("Error getListOfDevices user role:", error);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [showVerified, setShowVerified] = useState(true);
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
        sortedDevices.sort((a, b) =>
          a.manufacturer.localeCompare(b.manufacturer)
        );
      } else if (sortOrder === "descending") {
        sortedDevices.sort((a, b) =>
          b.manufacturer.localeCompare(a.manufacturer)
        );
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
    setDevices(
      devices.map((device) => {
        if (device.id === deviceId) {
          return { ...device, verified: !device.verified };
        }
        return device;
      })
    );
  };

  // Function to filter devices based on search query and verification status
  const getFilteredDevices = () => {
    return devices.filter(
      (device) =>
        device.manufacturer.toLowerCase().includes(searchQuery) &&
        device.verified === showVerified
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
      color: string
    ) => {
      const baseUrl = "https://uk.webuy.com/search";
      return `${baseUrl}?stext=${encodeURIComponent(
        `${manufacturer} ${model} ${storage} ${color}`
      )}`;
    };

    const renderCexLink = () => {
      if (
        device.classification === "Rare" ||
        device.classification === "Current"
      ) {
        const cexUrl = createCexSearchUrl(
          device.manufacturer,
          device.model,
          device.storage,
          device.color
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

    return (
      <div className="bg-white p-5 rounded-lg shadow-md">
        {/* Manufacturer and model name above the photo */}
        <h3 className="text-2xl font-bold mb-4">
          {device.manufacturer} {device.model}
        </h3>
        <div className="mt-3">
          <span
            className={`px-3 py-1 text-sm font-semibold inline-block ${
              device.verified
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {device.verified ? "Verified" : "Not Verified"}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="w-full md:w-3/4 lg:w-3/4">
            {" "}
            {/* Adjust width here */}
            {/* Larger image size */}
            <img
              src={device.image}
              alt={`${device.manufacturer} ${device.model}`}
              className="w-full h-auto rounded"
            />
          </div>

          <div className="md:ml-4 flex-1">
            {/* Increase margin-top here for more space */}
            <div className="flex flex-wrap -m-1 mt-20 md:mt-22">
              {" "}
              {/* Adjust mt- class here */}
              <div className="p-1">
                <span className="text-gray-600">Storage:</span> {device.storage}
              </div>
              <div className="p-1">
                <span className="text-gray-600">Color:</span> {device.color}
              </div>
              <div className="p-1">
                <span className="text-gray-600">Condition:</span>{" "}
                {device.condition}
              </div>
              <div className="p-1">
                <span className="text-gray-600">Classification:</span>{" "}
                {device.classification}
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
                <strong>Model Name:</strong> {device.manufacturer}{" "}
                {device.model}
              </p>
              <p>
                <strong>Created At:</strong> {device.createdAt}
              </p>
              <p>
                <strong>Data Recovery:</strong>{" "}
                {device.classification === "Current" ||
                device.classification === "Rare"
                  ? "Not applicable"
                  : device.dataRecovered
                  ? "Yes"
                  : "No"}
              </p>
              <p>
                <strong>Data Retrieval Time Left:</strong>{" "}
                {calculateDataRetrievalTimeLeft()}
              </p>
            </div>
          </div>
        </div>

        {renderCexLink()}
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

        <div role="tablist" className="tabs tabs-lifted tabs-lg">
          <a
            role="tab"
            className={`tab ${showVerified ? "bg-primary text-white" : ""}`}
            onClick={() => setShowVerified(true)}
          >
            Verified
          </a>
          <a
            role="tab"
            className={`tab ${!showVerified ? " bg-primary text-white" : ""}`}
            onClick={() => {
              setShowVerified(false);
            }}
          >
            Non-Verified
          </a>
        </div>

        {/* Devices Table */}
        <div className="main-content flex-grow p-4">
          <h5 className="text-black text-3xl font-medium mb-6">
            {showVerified ? "Verified Devices" : "Non-Verified Devices"}
          </h5>
          <div
            className="overflow-y-auto"
            style={{
              maxHeight: "calc(100vh - 200px)",
              scrollbarWidth: "thin",
              scrollbarColor: "white grey",
            }}
          >
            {" "}
            {/* Added scrollbarWidth and scrollbarColor */}
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
                  <th>Expand</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((device) => (
                  <tr key={device.id}>
                    <td>
                      <img
                        src={device.image}
                        alt={`${device.manufacturer} ${device.model}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{device.manufacturer}</td>
                    <td>{device.model}</td>
                    <td>{device.createdAt}</td>
                    <td>{device.classification}</td>
                    <td>
                      <div className="flex">
                        <label
                          htmlFor={`toggle-${device.id}`}
                          className="relative flex  group p-2"
                        >
                          <span className="text-sm mr-3">
                            {device.verified ? "Verified" : "Not Verified"}
                          </span>
                          <input
                            type="checkbox"
                            id={`toggle-${device.id}`}
                            className="sr-only peer"
                            checked={device.verified}
                            onChange={() => toggleDeviceVerification(device.id)}
                          />
                          <span className="w-12 h-6 flex items-center flex-shrink-0 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-full"></span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <button onClick={() => toggleDeviceDetails(device.id)}>
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
          <div className="device-details w-1/4 bg-white p-4 overflow-y-auto absolute right-0 top-0 h-full z-30">
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
