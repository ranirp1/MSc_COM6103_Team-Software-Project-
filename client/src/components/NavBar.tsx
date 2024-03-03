import React from "react";
import EWasteHubImage from "../assets/EWasteHub.jpg"
import Navigation from "../Navigation";

const NavBar = () => {
  return (
    <div className="">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img src={EWasteHubImage} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl ml-2 font-semibold">E-Waste Hub</h1>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn"
            >
              <div className="w-full ">
                <Navigation backgroundColor="hsl(169, 52%, 80%)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
