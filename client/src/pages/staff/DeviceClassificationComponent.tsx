import { DeviceClassification } from "../landing/CheckNow";

interface DeviceClassificationProps {
  deviceClassification: string;
}

const DeviceClassificationComponent = ({
  deviceClassification,
}: DeviceClassificationProps) => {
  function getBackGround() {
    switch (deviceClassification) {
      case DeviceClassification.Current:
        return "bg-amber-300";
      case DeviceClassification.Rare:
        return "bg-indigo-500";
      case DeviceClassification.Recycle:
        return "bg-emerald-400";
      default:
        return "bg-rose-400";
    }
  }

  return (
    <div className="flex flex-row">
      <div
        className={`${getBackGround()} h-5 w-5 rounded-full mr-3 border-2 border-primary  shadow-2xl`}
      ></div>
      <h2>{deviceClassification}</h2>
    </div>
  );
};

export default DeviceClassificationComponent;
