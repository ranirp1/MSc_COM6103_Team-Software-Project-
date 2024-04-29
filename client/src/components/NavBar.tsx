import React from "react";
import EWasteHubImage from "../assets/EWasteHub.jpg";
import LoginPage from "../pages/login/LoginPage";
import CreateAccount from "../pages/registration/RegistrationPage";

const NavBar = () => {
  return (
    <div className="mt-10 w-1/2">
      <div className="flex flex-row  w-full gap-1">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-accent flex-1 r-2  border-primary border-2 "
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
          <div
            className="modal-box"
            style={{
              overflow: "hidden",
              maxWidth: "1000px",
              width: "1000px",
              minHeight: "auto",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CreateAccount fullScreen={false} />
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-primary absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <button
          className="btn btn-primary flex-1 "
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_2"
            ) as HTMLDialogElement | null;
            if (modal) {
              modal.showModal();
            }
          }}
        >
          Login
        </button>

        <dialog id="my_modal_2" className="modal">
          <div
            className="modal-box"
            style={{
              overflow: "hidden",
              maxWidth: "800px",
              width: "800px",
              minHeight: "auto",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LoginPage fullScreen={false} />
            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_2"
                  ) as HTMLDialogElement | null;
                  if (modal) {
                    modal.close();
                  }
                }}
              >
                ✕
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default NavBar;
