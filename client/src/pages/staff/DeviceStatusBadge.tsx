import { DeviceStatusConstant } from "../User/DeviceStatusComponent";

interface DeviceStatusBadgeProps {
  status: string;
}

const DeviceStatusBadge = ({ status }: DeviceStatusBadgeProps) => {
  const deviceStatusIndex = Object.values(DeviceStatusConstant).indexOf(status);
  return <div>{status}</div>;
};

export default DeviceStatusBadge;
