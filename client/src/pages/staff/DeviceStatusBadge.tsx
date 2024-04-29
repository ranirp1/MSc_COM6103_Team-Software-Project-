import { DeviceStatusConstant } from "../User/DeviceStatusComponent";

interface DeviceStatusBadgeProps {
  status: string;
}

const DeviceStatusBadge = ({ status }: DeviceStatusBadgeProps) => {
  const deviceStatusIndex = Object.values(DeviceStatusConstant).indexOf(status);
  const badgeColor = () => {
    if (deviceStatusIndex == 0) {
      return "badge-primary";
    }
    if (deviceStatusIndex == 1) {
      return "badge-success";
    }
    if (deviceStatusIndex == 2) {
      return "badge-info";
    }
    if (deviceStatusIndex == 3) {
      return "badge-warning";
    }
    if (deviceStatusIndex == 4) {
      return "badge-info";
    }
    return "badge-ghost";
  };

  return <div className={` p-5 badge ${badgeColor()}`}>{status}</div>;
};

export default DeviceStatusBadge;
