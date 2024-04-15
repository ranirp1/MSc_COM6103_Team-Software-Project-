import { CheckRequest, DeviceClassification } from "./CheckNow";
import { RxCross2 } from "react-icons/rx";
import RecycleImage from "../../assets/device_type_recycle.svg";
import RareImage from "../../assets/devices.svg";
import QRCode from "react-qr-code";

const DeviceTypeDialog = ({
  deviceType,
  request,
}: {
  deviceType?: DeviceClassification;
  request: CheckRequest;
}) => {
  return (
    <div className="modal-box p-10">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn  btn-primary btn-circle  absolute right-2 top-2">
          <RxCross2 size={20} />
        </button>
      </form>
      <div className="flex flex-col mt-10">
        <h1 className=" flex flex-row w-full text-3xl font-bold text-primary ml-3 place-content-center">
          {deviceType === DeviceClassification.Recycle
            ? "Recyclable!"
            : deviceType === DeviceClassification.Rare
            ? "Rare Device!"
            : "Current"}
        </h1>
        <div className=" flex flex-row items-center ">
          <img
            src={
              deviceType === DeviceClassification.Recycle
                ? RecycleImage
                : RareImage
            }
            alt="Device Type"
            className="w-72  mx-auto"
          />

          <QRCode
            size={170}
            value={request.brand + "\n" + request.model}
            className="p-5 w-1/2"
          />
        </div>

        {deviceType === DeviceClassification.Recycle ? (
          <div className="bg-yellow-100 rounded my-3 p-5 text-black text-lg">
            Reduce, Reuse, Recycle! Your device is recyclable. Simply login or
            register to access valuable data derived from it. Let's contribute
            to a sustainable future together!
          </div>
        ) : (
          <div className="bg-yellow-100 rounded my-3 p-5 text-black text-lg ">
            Your Device belongs to {deviceType} Type, Please scan the QR code to
            get more information about your device.
          </div>
        )}
        <div className="flex flex-row">
          <button
            className="btn btn-primary w-1/2"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </button>
          <button
            className="btn btn-ghost w-1/2"
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceTypeDialog;
