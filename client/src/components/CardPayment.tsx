import React, { useState } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { API_URL } from "../constants/constant";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import Lottie from "lottie-react";
import paymentSuccessAnimation from "../../src/animation/payment_success.json";
import paymentFailedAnimation from "../../src/animation/payment_failed.json";
import dataRetrevialAnimation from "../../src/animation/data_retrieval.json";
import loading from "../../src/animation/loading.json";

export enum PaymentStatus {
  SUCCESS = "success",
  FAILURE = "failure",
  NOT_INITATED = "not_initiated",
  PROCESSING = "processing",
  INTRODUCTION = "introduction",
}

function CardPayment({
  amount = "$100",
  status = PaymentStatus.NOT_INITATED,
  setPaymentStatus,
}: {
  amount?: string;
  status?: PaymentStatus;
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // const handleSubmitPay = async (e: React.MouseEvent<HTMLButtonElement>) => {
  const handleSubmitPay = async () => {
    setPaymentStatus(PaymentStatus.PROCESSING);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElements = elements.getElement(CardElement);
    if (!cardElements) {
      return;
    }

    let res;
    try {
      res = await axios.post(`${API_URL}/api/create-payment-intent`, {
        email: email,
      });
    } catch (error) {
      console.log(error);
      setPaymentStatus(PaymentStatus.FAILURE);
      return;
    }

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElements,
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      setPaymentStatus(PaymentStatus.FAILURE);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        setPaymentStatus(PaymentStatus.SUCCESS);
      }
    }
  };

  const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        fontSize: "18px",
        fontSmoothing: "antialiased",
      },
      invalid: {
        color: "#e5424d",
      },
    },
  };
  return (
    <div className="modal-box ">
      <div
        className={`card-body ${
          status == PaymentStatus.NOT_INITATED ? "visible" : "hidden"
        }  `}
      >
        <h2 className={"card-title pb-5 text-primary"}>
          Payment for {amount}{" "}
        </h2>
        <input
          type="text"
          placeholder={"Name"}
          className="input input-bordered w-full bg-gray-50 text-primary my-1"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder={"Email"}
          className="input input-bordered w-full bg-gray-50 text-primary my-1"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="border p-3 my-1 bg-gray-50 w-96">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <div>
          <button
            className="btn btn-primary w-full my-1"
            onClick={handleSubmitPay}
          >
            Pay Now
          </button>
        </div>
      </div>

      {status == PaymentStatus.INTRODUCTION ? (
        <div className="card-body flex items-center text-black ">
          <div className=" w-64">
            <Lottie
              animationData={dataRetrevialAnimation}
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <h2 className={`tex-black pb-5  font-extrabold `}>
            In Order to procced with data retrieval, please make a payment of of
            100$
          </h2>

          <button
            className="btn btn-primary w-full my-1"
            onClick={() => setPaymentStatus(PaymentStatus.NOT_INITATED)}
          >
            Procced
          </button>
        </div>
      ) : status === PaymentStatus.NOT_INITATED ? (
        <></>
      ) : (
        <div className="card-body flex items-center ">
          <h2
            className={`card-title pb-5  font-extrabold text-2xl ${
              status == PaymentStatus.FAILURE ? "text-error" : "text-success"
            }`}
          >
            {status == PaymentStatus.FAILURE
              ? "Payment Failed"
              : "Payment Success"}
          </h2>
          <div className=" w-64 h-52">
            <Lottie
              animationData={
                status == PaymentStatus.FAILURE
                  ? paymentFailedAnimation
                  : paymentSuccessAnimation
              }
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}
      <div className="modal-action">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-primary absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
    </div>
  );
}

export default CardPayment;
