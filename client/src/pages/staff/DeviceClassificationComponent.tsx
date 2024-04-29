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
        return "bg-yellow-400";
      case DeviceClassification.Rare:
        return "bg-blue-400";
      case DeviceClassification.Recycle:
        return "bg-green-400";
      default:
        return "bg-red-400";
    }
  }

  return (
    <div className="flex flex-row">
      <div className={`${getBackGround()} h-5 w-5 rounded-full mr-3 shadow-2xl`}></div>
      <h2>{deviceClassification}</h2>
    </div>
  );
};

export default DeviceClassificationComponent;
