// Source: https://github.com/NikValdez/ReactStripeTutorial/blob/master/web/src/components/StripeContainer.js
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

import { STRIPE_PUBLIC_KEY } from "../constants/constant";

const stripeTestPromise = loadStripe(STRIPE_PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}