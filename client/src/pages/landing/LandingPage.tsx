import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Lottie from "lottie-react";
import recycle from "../../animation/recycle.json";
import earth from "../../animation/earth.json";
import harm from "../../animation/harm.json";
import mobile from "../../animation/mobile.json";
import phones from "../../animation/phones.json";
import planet from "../../animation/planet.json";
import backup from "../../animation/backup.json";
import EWasteHubImage from "../../assets/EWasteHub.jpg";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 flex flex-col md:flex-row w-full ">
      {/* <NavBar></NavBar> */}

      {/* LandingPage content goes here */}

      <div className="w-1/2 flex flex-col items-center place-content-center">
        <div className="flex flex-col gap-5 card  text-primary w-10/12 px-5 py-5">
          <div className="flex flex-row justify-center place-items-center">
            <img
              src={EWasteHubImage}
              alt="Logo"
              className="w-20 h-20 rounded-full"
            />
            <h1 className=" text-2xl ml-2 font-semibold ">E-Waste Hub</h1>
          </div>
        </div>
        <div
          className="flex justify-center items-center"
          style={{ height: "500px", maxHeight: "1000px" }}
        >
          <div className="carousel rounded-lg overflow-hidden h-[500px]">
            <div className="carousel-inner flex">
              <div id="item1" className="carousel-item h-full w-full relative">
                {/* Lottie Animation with adjusted styles to act as a background */}
                <div className="absolute inset-0 z-0 flex justify-center">
                  <Lottie
                    animationData={planet}
                    loop={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>

                {/* Text container with higher z-index to ensure it's on top */}
                <div className="absolute bottom-0 py-5 left-0 p-10 z-10 text-center flex justify-center items-center w-full">
                  <div className="text-primary">
                    <h2 className="text-4xl font-bold text-green-600">
                      What is E-Waste?
                    </h2>
                    <p>
                      Electronic waste (e-waste) is all the old types of old,
                      end-of-life, or discarded electrical and electronic
                      equipment.
                    </p>
                  </div>
                </div>
              </div>
              <div id="item2" className="carousel-item h-full w-full relative">
                <div className="absolute inset-0 z-0 flex justify-center">
                  <Lottie
                    animationData={recycle}
                    loop={true}
                    style={{ width: "70%", height: "70%" }}
                  />
                </div>

                <div className="absolute bottom-0 left-0 p-10 z-10 text-center flex justify-center items-center w-full">
                  <div className="text-primary">
                    <h2 className="text-4xl font-bold">
                      <div className="text-green-600">Environmental Impact</div>
                    </h2>
                    <p className="">
                      Every device contains valuable materials that can be
                      recycled, reducing the demand for new resources and
                      minimizing environmental degradation
                    </p>
                  </div>
                </div>
              </div>
              <div id="item3" className="carousel-item h-full w-full relative">
                <div className="absolute inset-0 z-0 flex justify-center">
                  <Lottie
                    animationData={phones}
                    loop={true}
                    style={{ width: "90%", height: "90%" }}
                  />
                </div>
                <div className="absolute bottom-0 py-2 left-0 p-10 z-10 text-center flex justify-center items-center w-full">
                  <div className="text-primary">
                    <h2 className="text-4xl font-bold">
                      <div className="text-green-600">
                        Help reduce landfills
                      </div>
                    </h2>
                    <p>
                      Electronic waste in landfills poses significant
                      environmental risks. By selling your e-waste, you
                      contribute to the reduction of landfills.
                    </p>
                  </div>
                </div>
              </div>
              <div id="item4" className="carousel-item h-full w-full relative">
                <div className="absolute inset-0 z-0 flex justify-center">
                  <Lottie
                    animationData={mobile}
                    loop={true}
                    style={{ width: "70%", height: "70%" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-10 z-10 text-center flex justify-center items-center w-full">
                  <div className="text-primary">
                    <h2 className="text-4xl font-bold">
                      <div className="text-green-600"> Easy data retrieval</div>
                    </h2>
                    <p>
                      We offer secure data retrieval services, ensuring that
                      sensitive information stored on your electronic devices is
                      securely recovered and protected.
                    </p>
                  </div>
                </div>
              </div>

              <div id="item5" className="carousel-item h-full w-full relative">
                <div className="absolute inset-0 py-10 z-0 flex justify-center">
                  <Lottie
                    animationData={harm}
                    loop={true}
                    style={{ width: "80%", height: "80%" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-10 z-10 text-center flex justify-center items-center w-full">
                  <div className="text-primary">
                    <h2 className="text-4xl font-bold">
                      <div className="text-green-600"> Data security</div>
                    </h2>
                    <p>
                      Selling your old electronics through a reputable platform
                      ensures secure data destruction. Protect your personal
                      information and sensitive information easily.
                    </p>
                  </div>
                </div>
              </div>

              <div id="item6" className="carousel-item h-full w-full relative">
                <div className="absolute inset-0 z-0 flex justify-center">
                  <Lottie
                    animationData={backup}
                    loop={true}
                    style={{ width: "70%", height: "70%" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-5 z-10 text-center flex justify-center items-center w-full">
                  <div className="text-primary">
                    <h2 className="text-4xl font-bold">
                      <div className="text-green-600">
                        Diverse payment options
                      </div>
                    </h2>
                    <p>
                      We provide a diverse array of payment options on our
                      e-waste website, ensuring convenience and flexibility for
                      our users. From traditional methods like credit and debit
                      cards to modern alternatives such as digital wallets.
                    </p>
                  </div>
                </div>
              </div>

              <div id="item7" className="carousel-item h-full w-full relative">
                <div className="h-full w-full flex justify-center">
                  <Lottie
                    animationData={earth}
                    loop={true}
                    style={{ width: "75%", height: "75%" }}
                  />
                </div>

                <div className="absolute bottom-0 left-0 p-9 z-10 text-center flex justify-center items-center w-full">
                  <div className="text-primary">
                    <h2 className="text-4xl font-bold">
                      <div className="text-green-600">
                        Earn cash for your clutter
                      </div>
                    </h2>
                    <p>
                      Selling your e-waste not only clears up space in your home
                      or office but also puts money in your pocket
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-center items-center">
          <div className="flex gap-2">
            <a
              href="#item1"
              className="btn btn-xs btn-outline btn-primary btn-circle"
            ></a>
            <a
              href="#item2"
              className="btn btn-xs btn-outline btn-primary btn-circle"
            ></a>
            <a
              href="#item3"
              className="btn btn-xs btn-outline btn-primary btn-circle"
            ></a>
            <a
              href="#item4"
              className="btn btn-xs btn-outline btn-primary btn-circle"
            ></a>
            <a
              href="#item5"
              className="btn btn-xs btn-outline btn-primary btn-circle"
            ></a>
            <a
              href="#item6"
              className="btn btn-xs btn-outline btn-primary btn-circle"
            ></a>
            <a
              href="#item7"
              className="btn btn-xs btn-outline btn-primary btn-circle"
            ></a>
          </div>
        </div>

        <NavBar></NavBar>
        
      </div>

      {/* Check device */}
      <div className="w-1/2 bg-green-100">
        <div className="hero h-screen">
          <div className="hero-content flex flex-col  ">
            <div className="text-center flex flex-col justify-center items-center lg:text-left">
              <h1 className="text-5xl font-bold text-primary">Check now!</h1>
              <p className="py-6 text-primary">
                Check if your device needs to be recycled!
              </p>
              <div className="card shrink-0 h-full w-full md:w-[80vh]  shadow-2xl bg-base-100">
                <form className="card-body rounded-lg">
                  {/* Device details */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Device Brand */}
                    <div className="form-control">
                      <label className="label flex justify-between items-center">
                        <span className="label-text">Brand</span>
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
                        className="input input-bordered"
                        required
                      />
                    </div>

                    {/* Device Model */}
                    <div className="form-control">
                      <label className="label flex justify-between items-center">
                        <span className="label-text">Model</span>
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
                        className="input input-bordered"
                        required
                      />
                    </div>

                    {/* Device Date of Purchase */}
                    <div className="form-control">
                      <label className="label flex justify-between items-center">
                        <span className="label-text">Date of Purchase</span>
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
                        className="input input-bordered"
                        required
                      />
                    </div>

                    {/* Device Classification with detailed tooltips for each option */}
                    <div className="form-control">
                      <label className="label flex justify-between items-center">
                        <span className="label-text">
                          Device Classification
                        </span>
                        <Tippy
                          content={
                            <div>
                              <p>
                                <strong>Current:</strong> Devices that are
                                currently in demand and have a higher market
                                value.
                              </p>
                              <p>
                                <strong>Rare:</strong> Unique or older devices
                                that may be valuable to collectors or for
                                specific parts.
                              </p>
                              <p>
                                <strong>Unknown:</strong> Devices that require
                                further evaluation to determine their
                                classification.
                              </p>
                              <p>
                                <strong>Recycle:</strong> Devices that are best
                                suited for recycling due to age, condition, or
                                lack of demand.
                              </p>
                            </div>
                          }
                        >
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
                      <select className="select select-bordered">
                        <option value="Current">Current</option>
                        <option value="Rare">Rare</option>
                        <option value="Unknown">Unknown</option>
                        <option value="Recycle">Recycle</option>
                      </select>
                    </div>

                    {/* Release Date */}
                    <div className="form-control">
                      <label className="label flex justify-between items-center">
                        <span className="label-text">Release Date</span>
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
                      <input type="date" className="input input-bordered" />
                    </div>

                    {/* Color */}
                    <div className="form-control">
                      <label className="label flex justify-between items-center">
                        <span className="label-text">Color</span>
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
                        className="input input-bordered"
                      />
                    </div>

                    {/* Storage */}
                    <div className="form-control">
                      <label className="label flex justify-between items-center">
                        <span className="label-text">Storage</span>
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
                        className="input input-bordered"
                      />
                    </div>

                    {/* Device Condition */}
                    <div className="form-control">
                      <label className="label flex justify-between items-center">
                        <span className="label-text">Device Condition</span>
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
                          />
                          <span className="label-text ml-2">New</span>
                        </label>
                        <label className="cursor-pointer label">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                          />
                          <span className="label-text ml-2">Old</span>
                        </label>
                        <label className="cursor-pointer label">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                          />
                          <span className="label-text ml-2">Damaged</span>
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
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default LandingPage;
