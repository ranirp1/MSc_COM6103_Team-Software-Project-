import { PaymentStatus } from "../../components/CardPayment";
import CardPaymentModel from "../../components/CardPaymentModel";

import EWasteHubImage from "../../assets/EWasteHub.jpg";
import { RiFilter3Line, RiLogoutBoxRLine } from "react-icons/ri";
import React, { useState, ChangeEvent, useEffect } from "react";
import "../../style.css";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/constant";
import QRCode from "react-qr-code";
import emptyListImage from "../../assets/empty_device_list.svg";
import { GrImage } from "react-icons/gr";
import { createCexSearchUrl } from "../landing/DeviceTypeDialog";
import DeviceStatusComponent, {
  DeviceStatusConstant,
} from "./DeviceStatusComponent";
import { GiShoppingCart } from "react-icons/gi";
import KeyValueComponent from "../../components/KeyValueComponent";

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
  data_retrieval_opted: string;
  userDeviceID?: number;

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
    data_retrieval_opted: string,
    cexLink?: string,
    device_status?: string,
    estimatedValue?: String,
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
    this.data_retrieval_opted = data_retrieval_opted;
    this.userDeviceID = userDeviceId;
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
      json.data_retrieval_opted,
      json.userDeviceId
    );
  }
}

interface DeviceDetails {
  sellPrice: number;
  cashPrice: number;
  exchangePrice: number;
  // include other properties you expect to receive
}

const UserDashboard = () => {
  const [paymentStatus, setPaymentStatus] = useState(
    PaymentStatus.INTRODUCTION
  );

  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get("userID");
  const deviceData = urlParams.get("deviceData");

  const [devices, setDevices] = useState<Device[]>([]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [deviceId, setDeviceId] = useState("");
  const [deviceClassification, setDeviceClassification] = useState("Current");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [deviceColor, setDeviceColor] = useState("");
  const [deviceCondition, setDeviceCondition] = useState("");
  const [deviceStorage, setDeviceStorage] = useState("");
  const [dateofPurchase, setDateofPurchase] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dateofRelease, setDateofRelease] = useState("");
  const [data_retrieval_opted, setDataRetreivalOpted] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnlyVerified, setIsOnlyVerified] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const [dataRetrieval, setDataRetrieval] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState<Boolean>(false);
  const [selectedUserDeviceID, setSelectedUserDeviceID] = useState<number>();

  const [selectedValues, setSelectedValues] = useState([]); // Array to store selected values
  const [showInputs, setShowInputs] = useState(false); // Flag to control input display

  function openPaymentModel(userDeviceID: number | undefined): void {
    setPaymentStatus(PaymentStatus.INTRODUCTION);
    setSelectedUserDeviceID(userDeviceID);

    const modal = document.getElementById(
      "card_payment_model"
    ) as HTMLDialogElement | null;

    if (modal) {
      modal.showModal();
    }
  }

  useEffect(() => {
    if (deviceData) {
      const modal = document.getElementById(
        "my_modal_5"
      ) as HTMLDialogElement | null;
      if (modal) {
        modal.showModal();
      }
      const data = JSON.parse(deviceData);
      setBrand(data.brand);
      setModel(data.model);
      setDeviceStorage(data.storage);
      setDeviceColor(data.color);
      setDeviceCondition(data.condition);
      setDeviceClassification(data.classification);
      setDateofPurchase(data.dateofPurchase);
      setDateofRelease(data.dateofRelease);
    }
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getListOfDevices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID }),
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
    if (!userID) {
      alert("Please login to add device");
      window.location.href = "/login";
    }
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("deviceStorage", deviceStorage);
    formData.append("deviceColor", deviceColor);
    formData.append("deviceCondition", deviceCondition);
    formData.append("deviceClassification", deviceClassification ?? "Unknown");
    formData.append("dateofPurchase", dateofPurchase);
    formData.append("dateofRelease", dateofRelease);
    formData.append("userID", userID || "");
    formData.append("data_retrieval_opted", data_retrieval_opted);

    const imageInput = (
      e.target as HTMLFormElement
    ).querySelector<HTMLInputElement>("#imageInput");
    const imageFile = imageInput ? imageInput.files?.[0] : null;

    if (imageFile) {
      formData.append("image", imageFile);
    }
    console.log(formData);

    try {
      const response = await fetch(`${API_URL}/api/createDevice`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Creation Successful");
        const url = new URL(window.location.href);
        url.searchParams.delete("deviceData");
        window.history.replaceState({}, "", url.toString());
        window.location.reload();
      } else {
        console.log("Creation Error");
        // Handle error
      }
    } catch (error) {
      console.log("Error:", error);
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

  const handleVerificationChange = (isChecked: boolean) => {
    setIsOnlyVerified(isChecked);
  };

  const filterDevices = (devices: Device[]) => {
    // Apply search filter
    let filteredDevices = devices.filter(
      (device) =>
        device.brand.toLowerCase().includes(searchQuery) ||
        device.model.includes(searchQuery) ||
        device.createdAt.toLowerCase().includes(searchQuery) ||
        device.classification.includes(searchQuery)
    );

    // Apply sort filter
    if (sortOrder === "verified") {
      filteredDevices = filteredDevices.filter((device) => device.verified);
    } else if (sortOrder === "non-verified") {
      filteredDevices = filteredDevices.filter((device) => !device.verified);
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
    const renderCexLink = () => {
      const cexUrl = createCexSearchUrl(
        device.brand,
        device.model,
        device.storage,
        device.color
      );
      return (
        <div className="flex flex-row items-center  text-lg">
          <strong className="font-medium text-black">CEX Link :</strong>{" "}
          <a
            href={cexUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn border m-0 btn-link"
          >
            Search on CEX
          </a>
        </div>
      );
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
        device.data_retrieval_opted === "Yes" &&
        device.device_status == "Payment Processed" || device.device_status == "Data Wiped"
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

    const isDeviceRareOrCurrent =
      device.classification === "Rare" || device.classification === "Current";
    const isVerified = device.verified;
    const isRecycled = device.classification === "Recycle";

    function handlePaymentModal(): void {
      setShowPopup(false);
      openPaymentModel(device.userDeviceID);
      return;
    }

    return (
      <div className="card w-94 bg-base-100 shadow-xl h-74">
        <div className="flex flex-row">
          <div className="w-full rounded-xl">
            <figure>
              {device.image ? (
                <img
                  src={device.image.replace("../client/public/", "")}
                  alt={device.image}
                  className=" object-contain w-full h-64 flex items-center place-content-center bg-transparent bg-opacity-90 shadow-b-2xl"
                />
              ) : (
                <div className="w-full h-64 flex items-center place-content-center bg-primary bg-opacity-90">
                  <GrImage size={100} color="White" />
                </div>
              )}
            </figure>
            {/* Rest of the code */}
            <div className="card-body gap-0">
              <div className="flex flex-row justify-between my-2">
                <h2 className="card-title text-primary font-bold text-2xl">
                  {device.brand} {device.model}
                </h2>
                <span
                  className={`px-3  py-1 text-sm font-semibold inline-block ${
                    device.verified
                      ? "badge badge-success gap-2 flex justify-content: center"
                      : "badge badge-error gap-2 flex justify-content: center"
                  }`}
                >
                  {device.verified ? "Verified" : "Not Verified"}
                </span>
              </div>
              <div className="border-y-2 py-4 my-2">
                <div className="mb-2">
                  <span className="font-bold text-primary text-xl">
                    Specifications
                  </span>
                </div>
                <div className="opacity-70 text-opacity-80">
                  <KeyValueComponent data="Storage :" value={device.storage} />
                  <KeyValueComponent data="Color : " value={device.color} />
                  <KeyValueComponent
                    data="Condition :"
                    value={device.condition}
                  />
                  <KeyValueComponent
                    data="Classification :"
                    value={device.classification ?? "Unknown"}
                  />
                  <KeyValueComponent
                    data="Created At :"
                    value={device.createdAt}
                  />
                  <KeyValueComponent
                    data="Data Retrieval Time Left :"
                    value={calculateDataRetrievalTimeLeft()}
                  />
                </div>
                {/* <div className="p-1">
              <span className="text-black">
                Data Recovery:{" "}
                {device.classification === "Current" ||
                device.classification === "Rare"
                  ? "Not applicable"
                  : device.dataRecovered
                  ? "Yes"
                  : "No"}
              </span>
            </div> */}
              </div>
              {isDeviceRareOrCurrent && (
                <div className="flex flex-col">
                  <KeyValueComponent
                    data="Estimated Price : "
                    value={
                      device.estimatedValue && device.estimatedValue !== "NA"
                        ? device.estimatedValue.toString()
                        : "Still calculating"
                    }
                  />
                  {renderCexLink()}
                  <div className="w-full items-center flex place-content-center">
                    <div className="shadow-xl w-52 h-52 flex place-content-center items-center border">
                      {
                        <QRCode
                          size={150}
                          value={
                            "Brand: " +
                            device.brand +
                            "\nModel: " +
                            device.model +
                            "\nColor: " +
                            device.color +
                            "\nStorage: " +
                            device.storage +
                            "\nClassification: " +
                            device.classification +
                            "\nCondition: " +
                            device.condition +
                            "\nEstimated Price: " +
                            device.estimatedValue
                          }
                          className=""
                        />
                      }
                    </div>
                  </div>
                </div>
              )}
              <div>
                {isRecycled &&
                  isVerified &&
                  device.device_status !== "Payment Processed" && (
                    <div className="flex flex-row">
                      <button
                        className="btn btn-primary"
                        onClick={handlePaymentModal}
                      >
                        Proceed for Data Retrieval
                      </button>
                    </div>
                  )}
                {device.data_retrieval_opted === "Yes" &&
                  device.device_status === "Payment Processed" &&
                  isRecycled && (
                    <div className="dropdown dropdown-right ">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-primary"
                      >
                        Extend Retrieval
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a onClick={handlePaymentModal}>3 months</a>
                        </li>
                        <li>
                          <a onClick={handlePaymentModal}>6 months</a>
                        </li>
                      </ul>
                    </div>
                  )}
              </div>
              <div className="mt-4">
                <span className="font-bold text-primary text-xl">
                  Data Status :
                </span>
                {/* Subsequent list items with improved logic */}
                <DeviceStatusComponent
                  deviceStatus={device.device_status ?? ""}
                  isDeviceRareOrCurrent={isDeviceRareOrCurrent}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={` ${
            isDeviceRareOrCurrent
              ? "bg-yellow-100"
              : device.device_status == DeviceStatusConstant.DataWiped
              ? "bg-green-200"
              : "bg-yellow-100"
          } p-3 text-lg text-black rounded-b-xl flex w-full place-content-center`}
        >
          {isDeviceRareOrCurrent
            ? "Data Wiping will be done by 3rd party"
            : device.device_status == DeviceStatusConstant.DataWiped
            ? "Data Wiped"
            : "Data Wiping Pending"}
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
            <GiShoppingCart className="text-lg mr-2 text-primary" size={30} />{" "}
            Place Order
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
                <a onClick={() => handleFilterChange("verified")}>Verified</a>
              </li>
              <li>
                <a onClick={() => handleFilterChange("non-verified")}>
                  Non verified
                </a>
              </li>
            </ul>
          </details>
        </header>
        {/* Main content */}
        <main className="overflow-x-hidden overflow-y-auto p-5">
          <div className="mx-auto">
            <h5 className="text-black text-3xl font-medium mb-6"></h5>
            <div className="">
              {filteredDevices.length == 0 ? (
                <div className="flex flex-col w-full h-full items-center mt-16">
                  <h3 className="text-3xl font-bold text-center mb-5 ">
                    No Devices Found
                  </h3>
                  <img src={emptyListImage} className="h-80 w-80" />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
                  {filteredDevices.map((device) => (
                    <div>{renderDeviceDetails(device)}</div>
                  ))}
                </div>
              )}
            </div>
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
                          value={brand}
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
                          value={model}
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
                          value={dateofPurchase}
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
                          value={deviceClassification}
                          className="input input-bordered w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          onChange={(e) => {
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
                          value={dateofRelease}
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
                          onChange={(e) => setDeviceColor(e.target.value)}
                          type="text"
                          value={deviceColor}
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
                          onChange={(e) => setDeviceStorage(e.target.value)}
                          type="text"
                          value={deviceStorage}
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
                            onChange={(e) => {
                              setDeviceCondition(e.target.value);
                            }}
                            type="checkbox"
                            value="New"
                            id="new-condition"
                            name="device-condition"
                            className="checkbox checkbox-primary mr-2 mb-2"
                          />
                          <span>New</span>
                        </label>
                        <label className="cursor-pointer flex items-center">
                          <input
                            onChange={(e) => {
                              setDeviceCondition(e.target.value);
                            }}
                            type="checkbox"
                            value="Old"
                            id="old-condition"
                            name="device-condition"
                            className="checkbox checkbox-primary mr-2 mb-2"
                          />
                          <span>Old</span>
                        </label>
                        <label className="cursor-pointer flex items-center">
                          <input
                            onChange={(e) => {
                              setDeviceCondition(e.target.value);
                            }}
                            type="checkbox"
                            value="Damaged"
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
                        htmlFor="imageInput"
                        className="block font-medium leading-6 text-black mr-3"
                      >
                        Upload Image
                      </label>
                      <input
                        type="file"
                        id="imageInput"
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
                            value={"Yes"}
                            //checked={dataRetrieval === true}
                            onChange={(e) => {
                              setDataRetreivalOpted(e.target.value);
                            }}
                          />
                          <span className="label-text text-black">Yes</span>
                        </label>
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="data-retrieval"
                            className="radio radio-primary mr-2"
                            value={"No"}
                            //checked={dataRetrieval === false}
                            onChange={(e) => {
                              setDataRetreivalOpted(e.target.value);
                            }}
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
                  type="button"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary w-1/2"
                  onClick={() => setOpen(false)}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Popup
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
        )} */}
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
                className="btn btn-ghost w-1/2  border-primary border-2"
                onClick={() => setShowLogoutModal(false)} // Close modal on 'No'
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <CardPaymentModel
        status={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        userDeviceID={selectedUserDeviceID ?? 1}
        userID={userID??''}
      ></CardPaymentModel>
    </div>
  );
};
export default UserDashboard;
