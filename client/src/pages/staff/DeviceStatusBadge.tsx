import { DeviceStatusConstant } from "../User/DeviceStatusComponent";

interface DeviceStatusBadgeProps {
  status: string;
}

const DeviceStatusBadge = ({ status }: DeviceStatusBadgeProps) => {
  const deviceStatusIndex = Object.values(DeviceStatusConstant).indexOf(status);
  const badgeColor = () => {
    if (deviceStatusIndex == 0) {
      return "bg-grey-500";
    }
    if (deviceStatusIndex == 1) {
      return "bg-green-500";
    }
    if (deviceStatusIndex == 2) {
      return "bg-blue-500";
    }
    if (deviceStatusIndex == 3) {
      return "bg-green-500";
    }
    if (deviceStatusIndex == 4) {
      return "bg-blue-500";
    }
    return "badge-ghost";
  };

  return <div className={`badge p-5 ${badgeColor()}`}>{status}</div>;
};

export default DeviceStatusBadge;
