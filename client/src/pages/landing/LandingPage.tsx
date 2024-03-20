import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import backgroundImage from "../../assets/preview.jpg";
import eWasteImage from "../../assets/recycle.jpg";
import environmentImage from "../../assets/environmental_impact.jpg";
import eWasteLandfillsImage from "../../assets/e-waste landfills.jpg";
import dataRetrievalImage from "../../assets/data_retrieval.jpg";
import dataSecurityImage from "../../assets/data_security.jpg";
import diversePaymentImage from "../../assets/diverse_payment.jpg";
import earnCashImage from "../../assets/earn_cash.jpg";
import { useState } from 'react';

const LandingPage: React.FC = () => {
  
  return (
    <div
      style={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        overflow: "hidden",
        fontFamily: "palatino"
      }}
    >
      <div className="container mx-auto min-h-screen">
        {/* <Navigation backgroundColor="hsl(169, 52%, 80%)" /> */}
        <NavBar></NavBar>
        {/* LandingPage content goes here */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Carousel */}
          <div className="md:w-1/2 relative">
            <div className="carousel h-screen overflow-hidden rounded-lg">
              <div className="carousel-inner flex">
                <div
                  id="item1"
                  className="carousel-item h-full w-full relative"
                >
                  <img
                    src={eWasteImage}
                    className="h-full w-full"
                    alt="item 1"
                  />
                  <div className="absolute bottom-0 left-0 p-10">
                    <div className="text-white">
                      <h2 className="text-4xl font-bold">
                        What is{" "}
                        <span className="text-green-600">E-Waste?</span>
                      </h2>
                      <p>
                        Electronic waste(e-waste) is all the old types od old,
                        end-of-life or discared electrical and electronic
                        equipment
                      </p>
                      <a href="https://www.who.int/news-room/fact-sheets/detail/electronic-waste-(e-waste)"
                        className="btn bg-green-600 my-3"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  id="item2"
                  className="carousel-item h-full w-full relative"
                >
                  <img
                    src={environmentImage}
                    className="h-full w-full"
                    alt="item 2"
                  />
                  <div className="absolute bottom-0 left-0 p-10">
                    <div className="text-white">
                      <h2 className="text-4xl font-bold">
                        <span className="text-green-600">
                          Environmental
                        </span> Impact
                      </h2>
                      <p className="">
                        Every device contains valuable materials that can be
                        recycled, reducing the demand for new resources and
                        minimizing environmental degradation
                      </p>
                      {/* <a href="https://earth.org/environmental-impact-of-e-waste/" className="btn bg-green-600 my-3">
                        Learn More
                      </a> */}
                    </div>
                  </div>
                </div>
                <div
                  id="item3"
                  className="carousel-item h-full w-full relative"
                >
                  <img
                    src={eWasteLandfillsImage}
                    className="h-full w-full"
                    alt="item 3"
                  />
                  <div className="absolute bottom-0 left-0 p-10">
                    <div className="text-white">
                      <h2 className="text-4xl font-bold">
                      <span className="text-green-600">Help</span> reduce landfills
                      </h2>
                      <p>
                        Electronic waste in landfills poses significant
                        environmental risks. By selling your e-waste, you
                        contribute to the reduction of landfills.
                      </p>
                      {/* <a href="https://www.theworldcounts.com/stories/electronic-waste-facts" className="btn bg-green-600 my-3">
                        Learn More
                      </a> */}
                    </div>
                  </div>
                </div>
                <div
                  id="item4"
                  className="carousel-item h-full w-full relative"
                >
                  <img
                    src={dataRetrievalImage}
                    className="h-full w-full"
                    alt="item 4"
                  />
                  <div className="absolute bottom-0 left-0 p-10">
                    <div className="text-white">
                      <h2 className="text-4xl font-bold">
                        Easy <span className="text-green-600">data retrieval</span>
                      </h2>
                      <p>
                        We offer secure data retrieval services, ensuring that
                        sensitive information stored on your electronic devices
                        is securely recovered and protected.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  id="item5"
                  className="carousel-item h-full w-full relative"
                >
                  <img
                    src={dataSecurityImage}
                    className="h-full w-full"
                    alt="item 5"
                  />
                  <div className="absolute bottom-0 left-0 p-10">
                    <div className="text-white">
                      <h2 className="text-4xl font-bold">Data <span className="text-green-600">security</span></h2>
                      <p>
                        Selling your old electronics through a reputable
                        platform ensures secure data destruction. Protect your
                        personal information and sensitive information easily.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  id="item6"
                  className="carousel-item h-full w-full relative"
                >
                  <img
                    src={diversePaymentImage}
                    className="h-full w-full"
                    alt="item 6"
                  />
                  <div className="absolute bottom-0 left-0 p-10">
                    <div className="text-white">
                      <h2 className="text-4xl font-bold">
                        <span className="text-green-600">Diverse</span> payment options
                      </h2>
                      <p>
                        We provide a diverse array of payment options on our
                        e-waste website, ensuring convenience and flexibility
                        for our users. From traditional methods like credit and
                        debit cards to modern alternatives such as digital
                        wallets.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  id="item7"
                  className="carousel-item h-full w-full relative"
                >
                  <img
                    src={earnCashImage}
                    className="h-full w-full"
                    alt="item 7"
                  />
                  <div className="absolute bottom-0 left-0 p-10">
                    <div className="text-white">
                      <h2 className="text-4xl font-bold">
                        <span className="text-green-600">Earn cash</span> for your clutter
                      </h2>
                      <p>
                        Selling your e-waste not only clears up space in your
                        home or office but also puts money in your pocket
                      </p>
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
          </div>

          {/* Check device */}
          <div className="md:w-1/2 h-screen">
            <div className="hero h-full">
              <div className="hero-content flex flex-col lg:flex-row-reverse h-full">
                <div className="text-center flex flex-col justify-center items-center lg:text-left">
                  <h1 className="text-5xl text-customDarkGreen font-bold">
                    Check now!
                  </h1>
                  <p className="py-6 text-customDarkGreen">
                    Check if your device needs to be recycled!
                  </p>
                  <div className="card shrink-0 h-full w-full md:w-[600px] max-w-[600px] max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body rounded-lg">
                      {/* Device details */}
                      {/* Device type */}
                      <div className="flex flex-col justify-center">
                        <label className="label ">
                          <span className="label-text">
                            Select the device type
                          </span>
                        </label>
                        <div className="dropdown">
                          <div tabIndex={0} role="button" className="btn m-1">
                            Device type
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <a>Mobile</a>
                            </li>
                            <li>
                              <a>Laptop</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* Device Brand */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Brand</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Brand"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      {/* Device model */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Model</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Model"
                          className="input input-bordered"
                          required
                        />
                      </div>

                      {/* Device date of purchase */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Date of purchase</span>
                        </label>
                        <input
                          type="date"
                          placeholder="date of purchase"
                          className="input input-bordered"
                          required
                        />
                      </div>

                      {/*  */}

                      <div className="form-control mt-6">
                        <button className="btn btn-primary">Check</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default LandingPage;
