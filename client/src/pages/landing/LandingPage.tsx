import React, { useState } from "react";
import NavBar from "../../components/NavBar";
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
import CheckNow from "./CheckNow";

import CardPaymentModel from "../../components/CardPaymentModel";
import { PaymentStatus } from "../../components/CardPayment";

// const publicKey = process.env.PUBLIC_URL || ""

const LandingPage: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState(
    PaymentStatus.INTRODUCTION
  );
  function openPaymentModel(): void {
    setPaymentStatus(PaymentStatus.INTRODUCTION);
    const modal = document.getElementById(
      "card_payment_model"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  }

  return (
    <div>
      <button className=" w-full btn btn-primary" onClick={openPaymentModel}>
        Pay with Card
      </button>
      <CardPaymentModel
        status={paymentStatus}
        setPaymentStatus={setPaymentStatus}
      ></CardPaymentModel>
    </div>
  );
  return (
    <div className="bg-gray-100 flex flex-col md:flex-row w-full ">
      {/* <NavBar></NavBar> */}

      {/* LandingPage content goes here */}
      {/*<<<<<<< HEAD*/}
      {/*        <div>*/}
      {/*            /!* Content specific to LandingPage *!/*/}
      {/*            /!* More content *!/*/}
      {/*            <br/>*/}
      {/*            <br/>*/}
      {/*            <br/>*/}
      {/*            <br/>*/}
      {/*            <div>*/}
      {/*                <h3>Card number: 4000008260000000</h3>*/}
      {/*            </div>*/}
      {/*            <div className="justify-center items-center p-8 bg-neutral-300">*/}
      {/*                <Elements stripe={stripePromise}>*/}
      {/*                    <CardPayment />*/}
      {/*                </Elements>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*=======*/}

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
      <CheckNow></CheckNow>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default LandingPage;
