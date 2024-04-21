import { loadStripe } from "@stripe/stripe-js";
import CardPayment, { PaymentStatus } from "./CardPayment";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";

function CardPaymentModel({
  amount = "$100",
  status = PaymentStatus.NOT_INITATED,
  setPaymentStatus,
}: {
  amount?: string;
  status?: PaymentStatus;
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}) {
  const publicKey =
    "pk_test_51OrgFjIVN70bvUYCC4WUSwxYMeBWIQfc7A4rToYj6aDG0KzxHW1WLqvqpOycFM5ldApdqxFobn2LoiReJClOVwT400L7Q7ADBN";
  const stripePromise = loadStripe(publicKey);

  return (
    <div>
      <dialog id="card_payment_model" className="modal w-full">
        <Elements stripe={stripePromise}>
          <CardPayment
            amount={amount}
            status={status}
            setPaymentStatus={setPaymentStatus}
          />
        </Elements>
      </dialog>
    </div>
  );
}

export default CardPaymentModel;