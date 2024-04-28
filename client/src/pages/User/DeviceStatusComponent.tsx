export const DeviceStatusConstant = {
    DeviceRegistered: 'Device Registered',
    DeviceVerified: 'Device Verified',
    PaymentProcessed: 'Payment Processed',
    DataRetrieved: 'Data Retrieved',
    LinkReceived: 'Link Received'
};

enum DeviceStatusIndex {
    DeviceRegistered,
    DeviceVerified,
    PaymentProcessed,
    DataRetrieved,
    LinkReceived
}

interface DeviceStatusComponentProps {
    deviceStatus: string;
}

const DeviceStatusComponent: React.FC<DeviceStatusComponentProps> = ({ deviceStatus }) => {
    const deviceStatusIndex = Object.values(DeviceStatusConstant).indexOf(deviceStatus);
    return (
        <ul className="steps mt-4"> 
       
            {Object.values(DeviceStatusConstant).map(
                (status, index) => (
                    <li
                        key={status}
                        className={`step ${
                            deviceStatusIndex >= index
                                ? 'step-primary'
                                : ''
                        }`}
                    >
                        {status}
                    </li>
                )
            )}
        </ul>
    );
};

export default DeviceStatusComponent;