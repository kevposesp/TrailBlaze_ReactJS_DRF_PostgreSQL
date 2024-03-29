import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStripeHook } from "../../hooks/useStripe";

import "./PaymentPage.scss";
import CheckoutForm from "../../components/payment/CheckoutForm";
import secrets from "../../secrets";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(secrets.STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const { amount } = useParams();
  const { clientSecret, setClientSecret, useCreatePaymentIntent, useCreateCharge } = useStripeHook();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get('redirect_status');
    const clientSecret = searchParams.get('payment_intent_client_secret');
    if (status != null) {
      setClientSecret(clientSecret);
    } else {
      useCreatePaymentIntent(parseInt(amount ? amount : 10))
    }
  }, [])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const chargeFunction = (res) => {
    useCreateCharge(res);
  }

  return (
    <div className="PaymentPage">
      <div className="cont p-6 bg-white rounded-s-lg">
        <a>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Recarga tu saldo ahora</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{amount ? amount : 10} €</p>
      </div>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise} >
          <CheckoutForm sendData={(res) => chargeFunction(res)} amount={amount ? amount : 10} />
        </Elements>
      )}
    </div>
  );
}