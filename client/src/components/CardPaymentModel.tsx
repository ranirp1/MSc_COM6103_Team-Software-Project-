import { loadStripe } from "@stripe/stripe-js";
import CardPayment, { PaymentStatus } from "./CardPayment";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";

function CardPaymentModel({ amount = "$100" }) {
  const publicKey =
    "pk_test_51OrgFjIVN70bvUYCC4WUSwxYMeBWIQfc7A4rToYj6aDG0KzxHW1WLqvqpOycFM5ldApdqxFobn2LoiReJClOVwT400L7Q7ADBN";
  const stripePromise = loadStripe(publicKey);
  const [paymentStatus, setPaymentStatus] = useState(
    PaymentStatus.NOT_INITATED
  );
  function openPaymentModel(): void {
    setPaymentStatus(PaymentStatus.NOT_INITATED);
    const modal = document.getElementById(
      "card_payment_model"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  }

  return (
    <div>
      <button className=" w-full btn btn-primary" onClick={openPaymentModel}>
        Pay with Card
      </button>
      <dialog id="card_payment_model" className="modal w-full">
        <Elements stripe={stripePromise}>
          <CardPayment
            amount={amount}
            status={paymentStatus}
            setPaymentStatus={setPaymentStatus}
          />
        </Elements>
      </dialog>
    </div>
  );
}

export default CardPaymentModel;
