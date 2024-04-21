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
import image1 from "../../assets/image1.jpg";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import "../../style.css";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/constant";
import QRCode from "react-qr-code";
import emptyListImage from "../../assets/empty_device_list.svg";

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
  deviceClassification: string;
  dataRetrievalRequested?: boolean | null;
  dataRetrievalTimeLeft: string;
  device_status: string;
}

interface DeviceDetails {
  sellPrice: number;
  cashPrice: number;
  exchangePrice: number;
  // include other properties you expect to receive
}

const UserDashboard = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  const radioPackage = useRef();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [deviceId, setDeviceId] = useState("");
  const [deviceClassification, setDeviceClassification] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [dateofPurchase, setDateofPurchase] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dateofRelease, setDateofRelease] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const [dataRetrieval, setDataRetrieval] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState<Boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if(e.target.checked && e.target.value === "Yes"){
    //   setShowPopup(true);
    //   return;
    // }
    try {
      const response = await fetch(`${API_URL}/api/createDevice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //TODO userID is hardcoded for now, need to get it from the session
        body: JSON.stringify({
          brand,
          model,
          deviceClassification,
          dateofPurchase,
          imageUrl,
          dateofRelease,
          userID: 1,
        }),
      });

      if (response.ok) {
        console.log(response);
        console.log("Creation Successful");
        window.location.href = "/user";
      } else {
        console.log("Creation Error");

        // get the error message from the server and save it to show in toast
      }
    } catch (error) {
      console.log("Error:", error);
    }
    // Check if data retrieval is selected as "Yes"
    {
      /* if (dataRetrieval) {
      setShowPopup(true); // Show the popup
    } else {
      // Handle form submission without showing popup
      // For now, just log a message
      console.log("Form submitted without showing popup");
      navigate("/user");
    }*/
    }
  };

  const handleDataRetrievalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("e.target.checked", e.target.checked);
    if (e.target.checked && e.target.value === "Yes") {
      setDataRetrieval(e.target.checked && e.target.value === "Yes");
      setShowPopup(true);
      return;
    }
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
        device.deviceClassification.includes(searchQuery)
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
        "${manufacturer} ${model} ${storage} ${color}"
      )}`;
    };

    const renderCexLink = () => {
      if (
        device.deviceClassification === "Rare" ||
        device.deviceClassification === "Current"
      ) {
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
      if (
        device.deviceClassification === "Current" ||
        device.deviceClassification === "Rare"
      ) {
        return "Not applicable";
      }

      if (
        device.deviceClassification === "Recycle" &&
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
            return "More than 1 month left";
          } else if (daysLeft > 7) {
            return "More than 1 week left";
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
              src={image1}
              alt="{${device.brand} ${device.model}}"
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
                {device.deviceClassification}
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
                <strong>Device status: </strong> {device.device_status}
              </p>
              <p>
                <strong>Data Recovery:</strong>{" "}
                {device.deviceClassification === "Current" ||
                device.deviceClassification === "Rare"
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
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 64,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={device.brand + "\n" + device.model}
              viewBox={`0 0 256 256`}
            />
          </div>
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
        <div className="flex justify-between items-center p-4 shadow bg-primary">
          <img
            src={EWasteHubImage}
            alt="E-Waste Hub Logo"
            className=" w-16 h-16 rounded-full shadow-2xl  "
          />
          <h3 className="text-white text-3xl font-medium flex-1 text-center">
            Your Devices
          </h3>

          <button
            className="btn btn-accent   ml-4"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_5"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
              }
            }}
          >
            <RiLogoutBoxRLine className="text-lg mr-2" /> Add Device
          </button>

          <button
            className="btn btn-accent   ml-4"
            onClick={() => setShowLogoutModal(true)}
          >
            <RiLogoutBoxRLine className="text-lg mr-2" /> Logout
          </button>
        </div>
        <header className="flex p-4 shadow bg-gray-100">
          <form className="flex-1" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="Search"
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
        {/* Main content */}
        <main className="overflow-x-hidden overflow-y-auto">
          <div className="mx-auto px-6 py-8">
            <h5 className="text-black text-3xl font-medium mb-6"></h5>

            <div className="overflow-x-auto">
              <div className="overflow-x-auto">
                {filteredDevices.length == 0 ? (
                  <div className="flex flex-col  w-full h-full items-center mt-16">
                    <h3 className="text-3xl font-bold text-center mb-5 ">
                      No Devices Found
                    </h3>
                    <img src={emptyListImage} className="h-80 w-80" />
                  </div>
                ) : (
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
                              src={image1}
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
                                deviceList.deviceClassification
                              )}`}
                            >
                              {deviceList.deviceClassification}
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
                          onChange={(e) => setBrand(e.target.value)}
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
                          onChange={(e) => setModel(e.target.value)}
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
                          onChange={(e) => setDateofPurchase(e.target.value)}
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
                          onChange={(e) => {
                            console.log("e.target.value", e.target.value);
                            setDeviceClassification(e.target.value);
                          }}
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
                          onChange={(e) => setDateofRelease(e.target.value)}
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
                  window.location.href = "/login";
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
  );
};
export default UserDashboard;
