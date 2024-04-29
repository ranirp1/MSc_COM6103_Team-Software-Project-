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
import emptyListImage from "../../assets/empty_list.svg";
import { API_URL } from "../../constants/constant";
import { redirect } from "react-router-dom";
import { BiSolidReport } from "react-icons/bi";
import { GrImage } from "react-icons/gr";
import { AiOutlineUserSwitch } from "react-icons/ai";
import DeviceStatusBadge from "./DeviceStatusBadge";
import StaffFilterComponent from "./StaffFilterComponent";
import { DeviceStatusConstant } from "../User/DeviceStatusComponent";
import KeyValueComponent from "../../components/KeyValueComponent";
import { IoSend } from "react-icons/io5";
import { DeviceClassification } from "../landing/CheckNow";
import DeviceClassificationComponent from "./DeviceClassificationComponent";
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
  cexLink?: string;
  device_status?: string;
  estimatedValue?: String;
  user_email?: string;
  dataRetrievalLink?: string;
  user_name?: string;
  user_phone?: string;
  userDeviceId?: number;

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
    dataRetrievalTimeLeft: string,
    cexLink?: string,
    device_status?: string,
    estimatedValue?: String,
    user_email?: string,
    dataRetrievalLink?: string,
    user_name?: string,
    user_phone?: string,
    userDeviceId?: number
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
    this.cexLink = cexLink;
    this.device_status = device_status;
    this.estimatedValue = estimatedValue;
    this.user_email = user_email;
    this.dataRetrievalLink = dataRetrievalLink;
    this.user_name = user_name;
    this.user_phone = user_phone;
    this.userDeviceId = userDeviceId;
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
      json.dataRetrievalTimeLeft,
      json.cexLink,
      json.device_status,
      json.estimatedValue,
      json.user_email,
      json.dataRetrievalLink,
      json.user_name,
      json.user_phone,
      json.userDeviceId
    );
  }
}

const StaffDashboard = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isAdminAndStaff = urlParams.get("isAdminAndStaff") === "true";
  const [devices, setDevices] = useState<Device[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getListOfDevices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
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
  const [sortOrder, setSortOrder] = useState<string>("");

  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleDeviceDetails = (id: number) => {
    setSelectedDeviceId(id);
    setIsModalVisible(true);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const toggleDeviceVerification = async (deviceId: number) => {
    // Find the device and its current verification status
    const deviceIndex = devices.findIndex((d) => d.id === deviceId);
    if (deviceIndex === -1) {
      console.error("Device not found");
      return;
    }

    const device = devices[deviceIndex];
    const newVerificationStatus = !device.verified;

    try {
      // Update the backend first
      const response = await fetch(`${API_URL}/api/changeDeviceVerification/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceID: deviceId,
          isVerified: newVerificationStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Backend failed to update device verification status");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error updating verification status:", error);
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

  //filter device based on verification status
  const filterDevices = (devices: Device[]) => {
    console.log(devices);
    // Apply search filter
    let filteredDevices = devices.filter(
      (device) =>
        device.brand.toLowerCase().includes(searchQuery) ||
        device.model.includes(searchQuery) ||
        device.createdAt.toLowerCase().includes(searchQuery) ||
        device.classification.includes(searchQuery)
    );
    // Apply sort filter
    if (Object.values(DeviceStatusConstant).includes(sortOrder)) {
      filteredDevices = devices.filter((device) => {
        return device.device_status === sortOrder;
      });
    }

    console.log(filteredDevices);
    return filteredDevices;
  };

  const filteredDevices = filterDevices(devices);

  const handleFilterChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };
  // Function to filter devices based on search query and verification status
  const getFilteredDevices = () => {
    return devices.filter(
      (device) => device.brand.toLowerCase().includes(searchQuery)
      //device.verified === showVerified
    );
  };
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const renderDeviceModal = () => {
    if (!selectedDeviceId || !isModalVisible) return null;

    const device = devices.find((d) => d.id === selectedDeviceId);
    if (!device) return null;

    const modalBoxStyles: React.CSSProperties = {
      maxHeight: "98vh",
      overflowY: "scroll" as "scroll",
    };

    return (
      <div className="modal modal-open">
        <div className="modal-box relative" style={modalBoxStyles}>
          <DeviceDetails device={device} />
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setIsModalVisible(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
    );
  };

  const DeviceDetails = ({ device }: { device: Device }) => {
    const [localDevice, setLocalDevice] = useState<Device>(device);

    const handleInputChange = (
      field: keyof Device,
      value: string | boolean
    ) => {
      setLocalDevice((prevDevice: Device) => ({
        ...prevDevice,
        [field]: value,
      }));
    };

    const createCexSearchUrl = (
      manufacturer: string,
      model: string,
      storage: string,
      color: string
    ) => {
      const baseUrl = "https://uk.webuy.com/search";
      const queryParts = [manufacturer, model, storage, color].filter(
        (part) => part
      ); // Filters out null or empty strings
      const query = queryParts.join(" "); // Joins the parts into a single string with spaces
      return `${baseUrl}?stext=${encodeURIComponent(query)}`;
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
          device.color
        );
        return (
          <div className="">
            <p className="block  mb-4 text-lg font-medium text-black">
              CEX Link:{" "}
              <a
                href={cexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                Search on CEX
              </a>
            </p>
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

    const saveDeviceUpdates = async () => {
      try {
        const response = await fetch(`${API_URL}/api/updateDevice`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(localDevice),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to update device: ${errorData.message}`);
        }

        // Update global state if save is successful
        setDevices((prevDevices) =>
          prevDevices.map((d) => (d.id === device.id ? { ...localDevice } : d))
        );

        window.location.reload();
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error saving device updates:", error);
          alert(`Failed to save device updates: ${error.message}`);
        } else {
          console.error("An unexpected error occurred:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      }
    };

    const sendEmailWithDataLink = async () => {
      if (!localDevice.user_email) {
        alert("Email address is not available.");
        return;
      }
      if (!localDevice.dataRetrievalLink) {
        alert("Please enter a data retrieval link.");
        return;
      }

      const data = {
        email: localDevice.user_email,
        urlLink: localDevice.dataRetrievalLink,
        userDeviceId: localDevice.userDeviceId,
      };

      try {
        const response = await fetch(
          `${API_URL}/api/send-data-retrieval-link`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();
        if (response.ok) {
          alert("Email sent successfully!");
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    };

    return (
      <div className="bg-white p-5 rounded-lg ">
        <div className=" flex flex-row place-content-between">
          {!editMode ? (
            <div className=" text-3xl font-bold text-primary mb-4">
              {localDevice.brand} {localDevice.model}
            </div>
          ) : (
            <></>
          )}
        </div>
        <h3 className="text-2xl mb-4">
          {/* Conditional rendering of edit mode toggle button */}
          <div className="mb-4 top-2 flex justify-between items-center">
            {/* Descriptive Verification Toggle Button on the Right */}
            <div className="flex flex-row items-center font-bold text-primary">
              Verified
              <input
                type="checkbox"
                className={`toggle ml-5 ${
                  localDevice.verified ? "bg-primary" : ""
                } border-2`}
                checked={localDevice.verified}
                onChange={() => toggleDeviceVerification(localDevice.id)}
              />
            </div>

            {/* Edit Mode Toggle Button on the Left */}
            <button
              onClick={() => setEditMode(!editMode)}
              className="btn btn-primary"
            >
              {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
            </button>
          </div>
          {editMode ? (
            <>
              <label className="block mb-2 text-lg font-medium text-black">
                Name
              </label>
              <input
                type="text"
                value={localDevice.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="input input-bordered w-full bg-gray-200 text-black"
              />
              <label className="block mt-4 mb-2 text-lg font-medium text-black">
                Model
              </label>
              <input
                type="text"
                value={localDevice.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                className="input input-bordered w-full bg-gray-200 text-black"
              />
            </>
          ) : (
            <></>
          )}
        </h3>

        {editMode && (
          <div className="flex flex-col md:flex-row items-center place-content-center">
            <div className="w-full md:w-2/4 lg:w-2/4 flex items-center">
              {device.image ? (
                <img
                  src={device.image.replace("../client/public/", "")}
                  alt={device.image}
                  className="w-full h-64 flex items-center place-content-center bg-primary bg-opacity-90"
                />
              ) : (
                <div className="w-full h-64 flex items-center place-content-center bg-primary bg-opacity-90">
                  <GrImage size={50} color="white" className="w-full" />
                </div>
              )}
            </div>
            <div className="md:ml-4 flex-1">
              <div className="grid grid-cols-2 gap-4 p-1">
                <div>
                  <span className="block mt-4 mb-2 text-lg font-medium text-black">
                    Storage
                  </span>
                  <input
                    type="text"
                    value={localDevice.storage}
                    onChange={(e) =>
                      handleInputChange("storage", e.target.value)
                    }
                    className="input input-bordered bg-gray-200 text-black w-full"
                  />
                </div>
                <div>
                  <span className="block mt-4 mb-2 text-lg font-medium text-black">
                    Color
                  </span>
                  <input
                    type="text"
                    value={localDevice.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    className="input input-bordered bg-gray-200 text-black w-full"
                  />
                </div>
                <div>
                  <p className="block mt-4 mb-2 text-lg font-medium text-black">
                    Condition
                  </p>
                  <select
                    value={localDevice.condition}
                    onChange={(e) =>
                      handleInputChange("condition", e.target.value)
                    }
                    className="mt-1 block w-full select select-bordered bg-gray-200 text-black"
                  >
                    <option value="New">New</option>
                    <option value="Old">Old</option>
                    <option value="Damaged">Damaged</option>
                  </select>
                </div>
                <div>
                  <p className="block mt-4 mb-2 text-lg font-medium text-black">
                    Classification
                  </p>
                  <select
                    value={localDevice.classification}
                    onChange={(e) =>
                      handleInputChange("classification", e.target.value)
                    }
                    className="mt-1 block w-full select select-bordered bg-gray-200 text-black"
                  >
                    <option value="Rare">Rare</option>
                    <option value="Current">Current</option>
                    <option value="Recycle">Recycle</option>
                  </select>
                </div>
                <div>
                  <p className="block mt-4 mb-2 text-lg font-medium text-black">
                    Status
                  </p>
                  <select
                    value={localDevice.device_status}
                    onChange={(e) =>
                      handleInputChange("device_status", e.target.value)
                    }
                    className="mt-1 block w-full select select-bordered bg-gray-200 text-black"
                  >
                    <option value="Device Registered">Device Registered</option>
                    <option value="Device Verified">Device Verified</option>
                    <option value="Payment Processed">Payment Processed</option>
                    <option value="Data Retrieved">Data Retrieved</option>
                    <option value="Link Received">Link Received</option>
                  </select>
                </div>
                <div>
                  <span className="block mt-4 mb-2 text-lg font-medium text-black">
                    Estimated Price
                  </span>
                  <input
                    type="text"
                    value={localDevice.estimatedValue?.toString() || ""}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    className="input input-bordered bg-gray-200 text-black w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Recovery section visible in both edit and non-edit mode */}
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <KeyValueComponent
                data="Created At :"
                value={localDevice.createdAt}
              />
              {editMode ? (
                <input
                  type="text"
                  value={localDevice.createdAt}
                  onChange={(e) =>
                    handleInputChange("createdAt", e.target.value)
                  }
                  className="mt-1 block w-full input input-bordered bg-gray-200 text-black"
                />
              ) : (
                <></>
              )}
              <p className="block mt-4 mb-2 text-lg font-medium text-black">
                Data Retrieval Time Left: {calculateDataRetrievalTimeLeft()}
              </p>
            </div>
            <div>
              <br></br>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <label
                  className="text-lg font-medium text-black"
                  style={{ marginRight: "1rem" }}
                >
                  Data Retrieval Link:
                </label>
                <input
                  type="text"
                  value={localDevice.dataRetrievalLink || ""}
                  onChange={(e) =>
                    handleInputChange("dataRetrievalLink", e.target.value)
                  }
                  className="input input-bordered bg-gray-200 text-black"
                  placeholder="Enter data retrieval link"
                  style={{ flexGrow: 1, marginRight: "1rem" }}
                />
                <button
                  className="btn btn-primary text-white"
                  onClick={sendEmailWithDataLink}
                >
                  <IoSend />
                </button>
              </div>
            </div>
          </div>
        </div>
        {renderCexLink()}
        {editMode && (
          <button
            className="btn btn-primary  w-full "
            onClick={saveDeviceUpdates}
          >
            Save Changes
          </button>
        )}
        <div className=" h-4"></div>
        <div className="text-bold text-primary text-lg font-bold pt-5 border-t-2">
          User Contact Information
        </div>
        <div className=" flex flex-col p-5 w-full bg-primary bg-opacity-15 rounded-lg card shadow-xl">
          <div className="flex flex-row w-full place-content-between ">
            <KeyValueComponent
              data="User Full Name :"
              value={localDevice.user_name}
            />
            <KeyValueComponent
              data="User Email :"
              value={localDevice.user_email}
            />
            <KeyValueComponent
              data="User Phone Number :"
              value={localDevice.user_phone}
            />
          </div>
        </div>
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
          <StaffFilterComponent onFilterChange={handleFilterChange} />
        </header>

        {/* Devices Table */}
        <div className="main-content flex-grow px-10 pt-5 ">
          <h5 className="text-black text-3xl font-medium mb-6">Device List</h5>
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
                <img src={emptyListImage} className="h-80 w-80" />
              </div>
            ) : (
              <table className="table w-full text-black ">
                <thead>
                  <tr>
                    <th className="text-black text-lg font-bold min-w-[200px] ">
                      Image
                    </th>
                    <th className="text-black text-lg font-bold min-w-[250px]">
                      Name
                    </th>
                    <th className="text-black text-lg font-bold min-w-[250px]">
                      Model
                    </th>
                    <th className="text-black text-lg font-bold min-w-[200px]">
                      Created At
                    </th>
                    <th className="text-black text-lg font-bold min-w-[250px]">
                      Status
                    </th>
                    <th className="text-black text-lg font-bold min-w-[250px]">
                      Classification
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No Devices Found
                      </td>
                    </tr>
                  ) : (
                    filteredDevices.map((device) => (
                      <tr
                        key={device.id}
                        onClick={() => toggleDeviceDetails(device.id)}
                        className="cursor-pointer hover:bg-gray-200"
                      >
                        <td>
                          {device.image ? (
                            <img
                              src={device.image.replace(
                                "../client/public/",
                                ""
                              )}
                              alt={device.image}
                              className="object-contain h-24 w-16 fel flex-col place-content-center place-items-center items-center bg-white  rounded shadow"
                            />
                          ) : (
                            <div className="h-24 w-16 felx flex-col place-content-center place-items-center items-center bg-primary bg-opacity-90 rounded shadow">
                              <GrImage
                                size={50}
                                color="white"
                                className="w-full"
                              />
                            </div>
                          )}
                        </td>
                        <td className="text-lg">{device.brand}</td>
                        <td className="text-lg">{device.model}</td>
                        <td className="text-lg">{device.createdAt}</td>
                        <td>
                          <div className="flex">
                            <DeviceStatusBadge
                              status={device.device_status ?? ""}
                            />
                          </div>
                        </td>
                        <td>
                          <DeviceClassificationComponent
                            deviceClassification={
                              device.classification || "Not Classified"
                            }
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {renderDeviceModal()}

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

      <div className="fixed bottom-4 right-4 flex flex-col ">
        {isAdminAndStaff ? (
          <button
            className="btn  shadow-2xl btn-ghost text-primary h-20 mb-3 rounded-full"
            onClick={() =>
              (window.location.href = "/admin?isAdminAndStaff=true")
            }
          >
            <AiOutlineUserSwitch size={40} />
            <div className="pl-2 text-lg ">Switch to Admin</div>
          </button>
        ) : null}
        <button className="btn    shadow-2xl bg-primary text-white h-20 rounded-full">
          <BiSolidReport size={40} />
          <div className="pl-2 text-lg ">Check Reports</div>
        </button>
      </div>
    </div>
  );
};
export default StaffDashboard;
