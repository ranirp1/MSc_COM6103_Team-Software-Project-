import { DeviceStatusConstant } from "./DeviceStatusComponent";

export function shouldShowExtend(status: string | undefined): boolean {
  return (
    status == DeviceStatusConstant.PaymentProcessed ||
    status == DeviceStatusConstant.DataRetrieved ||
    status == DeviceStatusConstant.LinkReceived ||
    status == DeviceStatusConstant.DataWiped
  );
  //   return
}

export function shouldShowProccedForDataRetrieval(
  status: string | undefined
): boolean {
  return (
    status == DeviceStatusConstant.DeviceVerified && !shouldShowExtend(status) 
  );
}
