import EWasteHubImage from "../../assets/EWasteHub.jpg";
import Samsung from "../../assets/Samsung.png";
import IPhone from "../../assets/IPhone.png";
import OnePlus from "../../assets/OnePlus.jpg";
import {
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiFilter3Line,
  RiLogoutBoxRLine,
  RiUserSettingsFill,
  RiUserSharedLine,
} from "react-icons/ri";
import React, { useState, ChangeEvent } from "react";
import "../../style.css";
import { Navigate, useNavigate } from "react-router-dom";

interface Device {
  id: number;
  brand: string;
  model: string;
  createdAt: string;
  isVerified: boolean;
  image: string;
  storage: string;
  color: string;
  dataRecovered: boolean | null;
  condition: string;
  deviceType: string;
  dataRetrievalRequested?: boolean | null;
  dataRetrievalTimeLeft: string;
}

interface DeviceDetails {
  sellPrice: number;
  cashPrice: number;
  exchangePrice: number;
  // include other properties you expect to receive
}

const UserDashboard = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      brand: "Iphone",
      model: "10",
      createdAt: "31 Jul 2023, 07:13 PM",
      isVerified: true,
      image: IPhone,
      storage: "64GB",
      color: "Silver",
      dataRecovered: null,
      condition: "good",
      deviceType: "Current",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "Not applicable",
    },
    {
      id: 2,
      brand: "Samsung",
      model: "S23",
      createdAt: "12 Jan 2024, 01:49 PM",
      isVerified: false,
      image: Samsung,
      storage: "64GB",
      color: "Red",
      dataRecovered: true,
      condition: "bad",
      deviceType: "Recycle",
      dataRetrievalRequested: true,
      dataRetrievalTimeLeft: "",
    },
    {
      id: 3,
      brand: "One Plus",
      model: "s22",
      createdAt: "31 Jul 2022, 07:13 PM",
      isVerified: true,
      image: OnePlus,
      storage: "128GB",
      color: "Blue",
      dataRecovered: null,
      condition: "bad",
      deviceType: "Current",
      dataRetrievalRequested: null,
      dataRetrievalTimeLeft: "",
    },
  ]);

  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const [dataRetrieval, setDataRetrieval] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState<Boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if data retrieval is selected as "Yes"
    if (dataRetrieval) {
      setShowPopup(true); // Show the popup
    } else {
      // Handle form submission without showing popup
      // For now, just log a message
      console.log("Form submitted without showing popup");
      navigate("/user");
    }
  };
  const handleDataRetrievalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataRetrieval(e.target.checked && e.target.value === "Yes");
  };

  const handleCancel = () => {
    window.location.href = "/user";
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
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

  const filterDevices = (devices: Device[]) => {
    // Apply search filter
    let filteredDevices = devices.filter(
      (device) =>
        device.brand.toLowerCase().includes(searchQuery) ||
        device.model.includes(searchQuery) ||
        device.createdAt.toLowerCase().includes(searchQuery) ||
        device.deviceType.includes(searchQuery)
    );

    // Apply sort filter
    if (sortOrder === "ascending") {
      filteredDevices.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (sortOrder === "descending") {
      filteredDevices.sort((a, b) => b.brand.localeCompare(a.brand));
    }

    return filteredDevices;
  };

  const filteredDevices = filterDevices(devices);

  const handleFilterChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };

  const toggleDeviceDetails = (id: number) => {
    console.log("Current selectedDeviceId:", selectedDeviceId);
    setSelectedDeviceId((prevId) => {
      console.log("Updating selectedDeviceId to:", prevId === id ? null : id);
      return prevId === id ? null : id;
    });
  };

  const renderDeviceDetails = (device: Device) => {
    const createCexSearchUrl = (
      manufacturer: string,
      model: string,
      storage: string,
      color: string
    ) => {
      const baseUrl = "https://uk.webuy.com/search";
      return `${baseUrl}?stext=${encodeURIComponent(
        '${manufacturer} ${model} ${storage} ${color}'
      )}`;
    };

    const renderCexLink = () => {
      if (device.deviceType === "Rare" || device.deviceType === "Current") {
        const cexUrl = createCexSearchUrl(
          device.brand,
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
      if (device.deviceType === "Current" || device.deviceType === "Rare") {
        return "Not applicable";
      }

      if (device.deviceType === "Recycle" && device.dataRetrievalRequested) {
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
            return 'More than 1 month left';
          } else if (daysLeft > 7) {
            return 'More than 1 week left';
          } else {
            return '${daysLeft} day${daysLeft > 1 ? "s" : ""} left';
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
          {device.brand} {device.model}
        </h3>
        <div className="mt-3">
          <span
            className={`px-3 py-1 text-sm font-semibold inline-block ${
              device.isVerified
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {device.isVerified ? "Verified" : "Not Verified"}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="w-full md:w-3/4 lg:w-3/4">
            {" "}
            {/* Adjust width here */}
            {/* Larger image size */}
            <img
              src={device.image}
              alt='{${device.brand} ${device.model}}'
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
                {device.deviceType}
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
                <strong>Model Name:</strong> {device.brand} {device.model}
              </p>
              <p>
                <strong>Created At:</strong> {device.createdAt}
              </p>
              <p>
                <strong>Data Recovery:</strong>{" "}
                {device.deviceType === "Current" || device.deviceType === "Rare"
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
        <div className="mt-4">
          <button className="btn btn-info">Generate QRCode</button>
        </div>
        <div className="dropdown dropdown-right mt-4">
          <div tabIndex={0} role="button" className="btn btn-info">
            Extend Retrieval
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>3 months</a>
            </li>
            <li>
              <a>6 months</a>
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <span className="font-bold">Data Retrieval Status:</span>
          <ul className="steps mt-4">
            <li className="step step-primary">Device Registered</li>
            <li className="step step-primary">Deviced Verified</li>
            <li className="step">Data Requested</li>
            <li className="step">Payment Processed</li>
            <li className="step">Retrival link Received</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 shadow bg-gray-100">
          <img
            src={EWasteHubImage}
            alt="E-Waste Hub Logo"
            className="w-20 h-20 rounded-full"
          />
          <h3 className="text-gray-700 text-3xl font-medium text-center flex-1">
            Your Devices
          </h3>
          <div className="flex dropdown dropdown-end">
            <div>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-primary"
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_5"
                  ) as HTMLDialogElement | null;
                  if (modal) {
                    modal.showModal();
                  }
                }}
              >
                Add Device
              </button>
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
              <RiFilter3Line className="text-lg" /> Filter
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => handleFilterChange("ascending")}>Ascending</a>
              </li>
              <li>
                <a onClick={() => handleFilterChange("descending")}>
                  Descending
                </a>
              </li>
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
                      <th className="font-bold text-base min-w-[150px]">
                        Image
                      </th>
                      <th className="font-bold text-base min-w-[150px]">
                        Device Name
                      </th>
                      <th className="font-bold text-base min-w-[100px]">
                        Model
                      </th>
                      <th className="font-bold text-base min-w-[150px]">
                        CreatedAt
                      </th>
                      <th className="font-bold text-base min-w-[150px]">
                        Verified
                      </th>
                      <th className="font-bold text-base min-w-[150px]">
                        Classification
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDevices.map((deviceList, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={deviceList.image}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td className="font-bold">{deviceList.brand}</td>
                        <td className="text-sm">{deviceList.model}</td>
                        <td className="text-sm">{deviceList.createdAt}</td>
                        <td
                          className="justify-center"
                          style={{ alignItems: "center" }}
                        >
                          <div
                            className={`badge ${
                              deviceList.isVerified
                                ? "badge-verified"
                                : "badge-notverified"
                            }`}
                          >
                            {deviceList.isVerified
                              ? "Verified"
                              : "Not Verified"}
                          </div>
                        </td>
                        <td className="text-sm">
                          <span
                            className={`badge ${getClassificationBadgeClass(
                              deviceList.deviceType
                            )}`}
                          >
                            {deviceList.deviceType}
                          </span>
                        </td>
                        <th>
                          <button
                            onClick={() => toggleDeviceDetails(deviceList.id)}
                          >
                            {selectedDeviceId === deviceList.id ? (
                              <RiArrowDropLeftLine size={32} />
                            ) : (
                              <RiArrowDropRightLine size={32} />
                            )}
                          </button>
                        </th>
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
              <div className="device-details w-1/3 bg-white p-4 overflow-y-auto absolute right-0 top-0 h-full z-30">
                {/* Find the selected device and render its details */}
                {devices
                  .filter((device) => device.id === selectedDeviceId)
                  .map((device) => renderDeviceDetails(device))}
              </div>
            )}
          </div>
        </main>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box ">
          <div className="flex justify-center">
            <form
              method="dialog"
              onSubmit={handleSubmit}
              className="bg-gray-100 rounded-lg shadow-md p-8"
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className=" font-bold text-4xl text-center text-black">
                    Device Details
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block font-medium leading-6 text-black"
                      >
                        Brand
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="input input-bordered w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block font-medium leading-6 text-black"
                      >
                        Model
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="input input-bordered w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="DateofPurchase"
                        className="block font-medium leading-6 text-black"
                      >
                        Date of Purchase
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          className="input input-bordered w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="classification"
                        className="block font-medium leading-6 text-black"
                      >
                        Device Classification
                      </label>
                      <div className="mt-2">
                        <select
                          id="classification"
                          name="classification"
                          className="input input-bordered w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Current</option>
                          <option>Rare</option>
                          <option>Unknown</option>
                          <option>Recycle</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="DateofRelease"
                        className="block font-medium leading-6 text-black"
                      >
                        Release Date
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          className="input input-bordered w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="Color"
                        className="block font-medium leading-6 text-black"
                      >
                        Color
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="input input-bordered w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="storage"
                        className="block font-medium leading-6 text-black"
                      >
                        Storage
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="input input-bordered w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="device-condition"
                        className="block font-medium leading-6 text-black"
                      >
                        Device Condition
                      </label>
                      <div className="mt-2">
                        <label className="cursor-pointer flex items-center">
                          <input
                            type="checkbox"
                            id="new-condition"
                            name="device-condition"
                            className="checkbox checkbox-primary mr-2 mb-2"
                          />
                          <span>New</span>
                        </label>
                        <label className="cursor-pointer flex items-center">
                          <input
                            type="checkbox"
                            id="old-condition"
                            name="device-condition"
                            className="checkbox checkbox-primary mr-2 mb-2"
                          />
                          <span>Old</span>
                        </label>
                        <label className="cursor-pointer flex items-center">
                          <input
                            type="checkbox"
                            id="damaged-condition"
                            name="device-condition"
                            className="checkbox checkbox-primary mr-2 mb-2"
                          />
                          <span>Damaged</span>
                        </label>
                      </div>
                    </div>

                    <div className="sm:col-span-4 flex  flex-row items-center">
                      <label
                        htmlFor="image-upload"
                        className="block font-medium leading-6 text-black mr-3"
                      >
                        Upload Image
                      </label>

                      <input
                        type="file"
                        className="file-input w-full max-w-xs file-input-primary"
                      ></input>
                    </div>

                    <div className="sm:col-span-4 flex items-center">
                      <span className="font-medium leading-6  mr-4 text-black">
                        Data Retrieval:
                      </span>
                      <div className="flex items-center space-x-4">
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="data-retrieval"
                            className="radio radio-primary mr-2"
                            checked
                            value="Yes"
                            onChange={handleDataRetrievalChange}
                          />
                          <span className="label-text text-black">Yes</span>
                        </label>
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="data-retrieval"
                            className="radio radio-primary mr-2"
                            checked
                            value="Yes"
                            onChange={handleDataRetrievalChange}
                          />
                          <span className="label-text text-black">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row  justify-between">
                <button
                  className="btn border w-1/2 mr-3"
                  onClick={handleCancel}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  className="btn btn-primary w-1/2"
                  onClick={() => setOpen(false)}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Popup */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-xl font-bold  mb-4">Confirmation</h2>
              <p className="text-gray-700 mb-4">
                Do you want to proceed with payment for data retrieval?
              </p>
              <div className="flex justify-end gap-x-4">
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500"
                  onClick={() => setShowPopup(false)}
                >
                  Proceed
                </button>
                <button
                  className=" px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};
export default UserDashboard;