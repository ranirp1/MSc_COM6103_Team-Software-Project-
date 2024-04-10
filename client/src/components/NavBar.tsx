import React from "react";
import EWasteHubImage from "../assets/EWasteHub.jpg";
import RegistrationPage from "../pages/registration/RegistrationPage";
import LoginPage from "../pages/login/LoginPage";

const NavBar = () => {

  return (
    <div className="">
      <div className="navbar">
        <div className="flex-1 gap-5">
          <img src={EWasteHubImage} alt="Logo" className="w-20 h-20 rounded-full" />
          <h1 className=" text-2xl ml-2 font-semibold text-primary">
            E-Waste Hub
          </h1>
        </div>
        <div className="flex-none gap-2">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-primary"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
              }
            }}
          >
            Register
          </button>

          <dialog id="my_modal_1" className="modal">
            <div className="modal-box" style={{ overflow: 'hidden', maxWidth: 'none' }}>
              <div className="text-right">
                <span
                  className="mx-5 text-sm text-blue-600 hover:underline cursor-pointer"
                  onClick={() => {
                    const modal = document.getElementById("my_modal_2") as HTMLDialogElement | null;
                    if (modal) {
                      modal.showModal();
                    }
                    const modal2 = document.getElementById("my_modal_1") as HTMLDialogElement | null;
                    if (modal2) {
                      modal2.close();
                    }
                  }}
                >
                  Already have an account? Sign in here
                </span>
              </div>
              <RegistrationPage />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
              </div>
            </div>
          </dialog>

          <button
                className="btn btn-success"
                onClick={() => {
                  const modal = document.getElementById("my_modal_2") as HTMLDialogElement | null;
                  if (modal) {
                    modal.showModal();
                  }
                }}
              >
                Login
              </button>

              <dialog id="my_modal_2" className="modal">
                <div className="modal-box" style={{ overflow: 'hidden', maxWidth: '600px', width: 'auto', minHeight: 'auto', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                  <div className="text-right">
                    <span
                      className="mx-5 text-sm text-blue-600 hover:underline cursor-pointer"
                      onClick={() => {
                        const modal1 = document.getElementById("my_modal_1") as HTMLDialogElement | null;
                        if (modal1) {
                          modal1.showModal();
                        }
                        const modal2 = document.getElementById("my_modal_2") as HTMLDialogElement | null;
                        if (modal2) {
                          modal2.close();
                        }
                      }}
                    >
                      Don't have an account? Register here
                    </span>
                  </div>
                  <LoginPage />
                  <div className="modal-action">
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => {
                      const modal = document.getElementById("my_modal_2") as HTMLDialogElement | null;
                      if (modal) {
                        modal.close();
                      }
                    }}>✕</button>
                  </div>
                </div>
              </dialog>

        </div>
      </div>
    </div>
  );
};

export default NavBar;
