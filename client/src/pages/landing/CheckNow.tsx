import Tippy from "@tippyjs/react";
import { useState } from "react";
import { API_URL } from "../../constants/constant";
import DeviceTypeDialog from "./DeviceTypeDialog";

export class CheckRequest {
  brand = "";
  model = "";
  dateOfPurchase = "";
  releaseDate = "";
  color = "";
  storage = "";
  condition: string = "";
}

export enum DeviceClassification {
  Current = "Current",
  Rare = "Rare",
  Unknown = "Unknown",
  Recycle = "Recycle",
}

const CheckNow = () => {
  const [formData, setFormData] = useState(new CheckRequest());
  const [deviceType, setDeviceType] = useState(DeviceClassification.Recycle);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    const modal = document.getElementById(
      "device_type_dialog"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }

    // await fetch(`${API_URL}/api/getDeviceTypeAndEstimation`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setDeviceType(data.type);
    //     const modal = document.getElementById(
    //       "device_type_dialog"
    //     ) as HTMLDialogElement;
    //     if (modal) {
    //       modal.showModal();
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="w-1/2 bg-primary opacity-90 shadow-2xl shadow-black">
      <div className="hero h-screen">
        <div className="hero-content flex flex-col   ">
          <div className="text-center flex flex-col justify-center items-center lg:text-left">
            <h1 className="text-5xl font-bold text-white">Check now!</h1>
            <p className="pb-6 text-white">
              Check if your device needs to be recycled!
            </p>
            <div className="card shrink-0 h-full w-full md:w-[80vh]  shadow-2xl bg-base-100">
              <form className="card-body rounded-lg" onSubmit={handleSubmit}>
                {/* Device details */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Device Brand */}
                  <div className="form-control">
                    <label className="label flex justify-between items-center">
                      <span className="label-text text-black">Brand</span>
                      <Tippy content="The manufacturer of the device, such as Apple, Samsung, or Sony.">
                        <span
                          style={{
                            cursor: "help",
                            fontSize: "20px",
                            color: "blue",
                          }}
                        >
                          ?
                        </span>
                      </Tippy>
                    </label>
                    <input
                      type="text"
                      placeholder="Brand"
                      value={formData.brand}
                      className="input input-bordered bg-gray-50"
                      required
                      onChange={(e) =>
                        handleInputChange("brand", e.target.value)
                      }
                    />
                  </div>

                  {/* Device Model */}
                  <div className="form-control">
                    <label className="label flex justify-between items-center">
                      <span className="label-text text-black">Model</span>
                      <Tippy content="The specific model or version of the device, like iPhone 12 or Galaxy S21.">
                        <span
                          style={{
                            cursor: "help",
                            fontSize: "20px",
                            color: "blue",
                          }}
                        >
                          ?
                        </span>
                      </Tippy>
                    </label>
                    <input
                      type="text"
                      placeholder="Model"
                      className="input input-bordered bg-gray-50"
                      required
                      onChange={(e) =>
                        handleInputChange("model", e.target.value)
                      }
                    />
                  </div>

                  {/* Release Date */}
                  <div className="form-control">
                    <label className="label flex justify-between items-center">
                      <span className="label-text text-black">Release Date*</span>
                      <Tippy content="The official market release date of the device. Newer devices might have a higher resale value.">
                        <span
                          style={{
                            cursor: "help",
                            fontSize: "20px",
                            color: "blue",
                          }}
                        >
                          ?
                        </span>
                      </Tippy>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered bg-gray-50"
                      required
                      onChange={(e) =>
                        handleInputChange("releaseDate", e.target.value)
                      }
                    />
                  </div>

                  {/* Device Date of Purchase */}
                  <div className="form-control">
                    <label className="label flex justify-between items-center">
                      <span className="label-text text-black">Date of Purchase</span>
                      <Tippy content="The date when you originally purchased the device. This can affect its current value and recyclability.">
                        <span
                          style={{
                            cursor: "help",
                            fontSize: "20px",
                            color: "blue",
                          }}
                        >
                          ?
                        </span>
                      </Tippy>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered bg-gray-50"
                      onChange={(e) =>
                        handleInputChange("dateOfPurchase", e.target.value)
                      }
                    />
                  </div>

                  {/* Color */}
                  <div className="form-control">
                    <label className="label flex justify-between items-center">
                      <span className="label-text text-black">Color</span>
                      <Tippy content="The color of your device. Some colors may be more rare or sought after.">
                        <span
                          style={{
                            cursor: "help",
                            fontSize: "20px",
                            color: "blue",
                          }}
                        >
                          ?
                        </span>
                      </Tippy>
                    </label>
                    <input
                      type="text"
                      placeholder="Color"
                      className="input input-bordered bg-gray-50"
                      onChange={(e) =>
                        handleInputChange("color", e.target.value)
                      }
                    />
                  </div>

                  {/* Storage */}
                  <div className="form-control">
                    <label className="label flex justify-between items-center">
                      <span className="label-text text-black">Storage</span>
                      <Tippy content="The internal storage capacity of the device, usually measured in gigabytes (GB) or terabytes (TB).">
                        <span
                          style={{
                            cursor: "help",
                            fontSize: "20px",
                            color: "blue",
                          }}
                        >
                          ?
                        </span>
                      </Tippy>
                    </label>
                    <input
                      type="text"
                      placeholder="Storage"
                      className="input input-bordered bg-gray-50"
                      onChange={(e) =>
                        handleInputChange("storage", e.target.value)
                      }
                    />
                  </div>

                  {/* Device Condition */}
                  <div className="form-control">
                    <label className="label flex justify-between items-center">
                      <span className="label-text text-black">Device Condition</span>
                      <Tippy content="The physical state of the device: New, Old, or Damaged. This affects the device's value and recyclability.">
                        <span
                          style={{
                            cursor: "help",
                            fontSize: "20px",
                            color: "blue",
                          }}
                        >
                          ?
                        </span>
                      </Tippy>
                    </label>
                    <div className="flex space-x-3">
                      <label className="cursor-pointer label">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          value={"New"}
                          name="condition"
                          checked={formData.condition === "New"}
                          onChange={(e) =>
                            handleInputChange("condition", e.target.value)
                          }
                        />
                        <span className="label-text text-black ml-2">New</span>
                      </label>
                      <label className="cursor-pointer label">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          value={"Old"}
                          checked={formData.condition === "Old"}
                          name="condition"
                          onChange={(e) =>
                            handleInputChange("condition", e.target.value)
                          }
                        />
                        <span className="label-text text-black ml-2">Old</span>
                      </label>
                      <label className="cursor-pointer label">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          value={"Damaged"}
                          name="condition"
                          checked={formData.condition === "Damaged"}
                          onChange={(e) =>
                            handleInputChange("condition", e.target.value)
                          }
                        />
                        <span className="label-text text-black ml-2">Damaged</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Check Button */}
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Check</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <dialog id="device_type_dialog" className="modal">
        <div className="w-1/2 place-content-center ">
          <DeviceTypeDialog deviceType={deviceType} request={formData} />{" "}
        </div>
      </dialog>
    </div>
  );
};

export default CheckNow;
