import React from "react";
import Navigation from "../../Navigation";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="container mx-auto min-h-screen">
      {/* <Navigation backgroundColor="hsl(169, 52%, 80%)" /> */}
      <NavBar></NavBar>
      {/* LandingPage content goes here */}
      <div className="p-8 bg-orange-50">
        <div className="my-5 mx-5">
          <div className="overflow-x-auto">
            <div className="flex flex-col md:flex-row w-full">
              {/* Content */}
              <div className="w-full md:w-60%">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                  Transforming{" "}
                  <span className="text-customDarkGreen">E-Waste</span>
                  <br />
                  into environmental impact
                </h1>
                <br />
                <br />
                <h1 className="text-lg md:text-xl text-gray-800">
                  Turn your old gadgets into green: earn, recycle, and
                  contribute to a sustainable future
                </h1>
                <div>
                  <button className=" my-5 btn btn-success bg-customDarkGreen text-white">
                    Sell your e-waste
                  </button>
                </div>
              </div>
              {/* Image */}
              <div className="hidden flex-col md:block md:w-40%">
                <div className="w-full md:w-96 bg-base-100 shadow-xl rounded-full">
                  <figure style={{ borderRadius: "50% / 30%" }}>
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Album"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content specific to LandingPage */}
        {/* More content */}
      </div>

      {/* Why to sell? */}

      <div className="bg-customGreen py-5">
        <div className="mx-10">
          <div className="my-5">
            <h1 className="text-white text-3xl md:text-3xl font-bold text-gray-800">
              Why sell E-waste?
            </h1>
          </div>
          <div className="text-white my-5 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="card bg-customDarkGreen shadow-xl">
                <div className="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                  <h2 className="card-title">Environmental impact</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="card bg-customDarkGreen shadow-xl">
                <div className="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>
                  <h2 className="card-title">Earn cash for your waste</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="card bg-customDarkGreen shadow-xl">
                <div className="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>

                  <h2 className="card-title">Stay tech-savy</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="card bg-customDarkGreen shadow-xl">
                <div className="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                  <h2 className="card-title">Data security</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="card bg-customDarkGreen shadow-xl">
                <div className="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                  <h2 className="card-title">Reduce e-waste dumps</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
              </div>

              {/* Card 6 */}
              <div className="card bg-customDarkGreen shadow-xl">
                <div className="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                  <h2 className="card-title">Educate & Inspire</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}

      <div className="p-8 bg-orange-50">
        <div className="my-5 mx-5">
          <div className="overflow-x-auto">
            <div className="flex flex-col md:flex-row w-full">
              {/* Content */}
              <div className="w-full md:w-60%">
                <h1 className="text-3xl md:text-3xl font-bold text-gray-800">
                  Features
                </h1>
                {/* Collapse 1 */}
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 mt-5 rounded-none" style={{borderLeft: 'none', borderRight: 'none', borderBottom:'none' ,borderColor: "rgb(40, 115, 90)"}}
                >
                  <div className="collapse-title text-xl font-medium">
                    Convenient pickup and drop-off options
                  </div>
                  <div className="collapse-content">
                    <p>
                      tabIndex={0} attribute is necessary to make the div
                      focusable
                    </p>
                  </div>
                </div>

                {/* Collapse 2 */}
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 rounded-none" style={{borderLeft: 'none', borderRight: 'none', borderBottom:'none',borderColor: "rgb(40, 115, 90)"}}
                >
                  <div className="collapse-title text-xl font-medium">
                    Disverse payment method
                  </div>
                  <div className="collapse-content">
                    <p>
                      tabIndex={0} attribute is necessary to make the div
                      focusable
                    </p>
                  </div>
                </div>

                {/* Collapse 3 */}
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 rounded-none" style={{borderLeft: 'none', borderRight: 'none', borderBottom: 'none',borderColor: "rgb(40, 115, 90)"}}
                >
                  <div className="collapse-title text-xl font-medium">
                    Instant valuation algorithm
                  </div>
                  <div className="collapse-content">
                    <p>
                      tabIndex={0} attribute is necessary to make the div
                      focusable
                    </p>
                  </div>
                </div>

                {/* Collapse 4 */}
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 rounded-none" style={{borderLeft: 'none', borderRight: 'none', borderBottom: 'none',borderColor: "rgb(40, 115, 90)"}}
                >
                  <div className="collapse-title text-xl font-medium">
                    Secure data destruction services
                  </div>
                  <div className="collapse-content">
                    <p>
                      tabIndex={0} attribute is necessary to make the div
                      focusable
                    </p>
                  </div>
                </div>

                {/* Collapse 5 */}
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 rounded-none" style={{borderLeft: 'none', borderRight: 'none', borderColor: "rgb(40, 115, 90)"}}
                >
                  <div className="collapse-title text-xl font-medium">
                    Environmental impact report
                  </div>
                  <div className="collapse-content">
                    <p>
                      tabIndex={0} attribute is necessary to make the div
                      focusable
                    </p>
                  </div>
                </div>

                {/* Button */}
                <div>
                  <button className=" my-5 btn btn-success bg-customDarkGreen text-white">
                    Sell your e-waste
                  </button>
                </div>
              </div>
              {/* Image */}
              <div className="hidden flex-col md:flex md:w-40%">
                <div className="w-full md:w-96 bg-base-100 shadow-xl rounded-full flex items-center justify-center">
                  <figure style={{ borderRadius: "50% / 30%" }}>
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Album"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content specific to LandingPage */}
        {/* More content */}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
