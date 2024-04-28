import { DeviceStatusConstant } from "../User/DeviceStatusComponent";

interface DeviceStatusBadgeProps {
  status: string;
}

const DeviceStatusBadge = ({ status }: DeviceStatusBadgeProps) => {
  const deviceStatusIndex = Object.values(DeviceStatusConstant).indexOf(status);
  console.log('deviceStatusIndex',deviceStatusIndex);
  const badgeColor = () => {
    if (deviceStatusIndex == 0) {
      return "badge-ghost";
    }
    if (deviceStatusIndex == 1) {
      return "badge-primary";
    }
    if (deviceStatusIndex == 2) {
      return "badge-secondary";
    }
    if (deviceStatusIndex == 3) {
      return "badge-accent";
    }
    return "badge-ghost";
  };
  console.log('badgeColor',badgeColor);
  return <div className={`badge p-5 ${badgeColor()}`}>{status}</div>;
};

export default DeviceStatusBadge;
