"use client";

//NO TOCAR, ESTO ES DE PAGOS STRIPE

import React, { useEffect, useState } from "react";
import convertToSubcurrency from "../helpers/convertToSubcurrency";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

interface CheckoutPageProps {
  amount: number; // Cantidad a cobrar, este número se puede pasar así $40, pero va a convertirse automaticamente a esto $40.00 porque stripe lo necesita así
  email: string; // Correo del usuario, a este va a llegar el recibo de pago
  walletId: string; // Wallet id blockchain
  customerName?: string; // Nombre del usuario (es recomendado enviar el nombre del usuario para que stripe lleve un registro)
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  amount,
  email,
  walletId,
  customerName,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const requestBody = {
      amount: convertToSubcurrency(amount),
      email: email && email,
      walletId: walletId && walletId,
      customerName: customerName && customerName,
    };

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => setErrorMessage(error.message));
  }, [amount, email, walletId, customerName]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
      redirect: "if_required",
    });

    if (error) {
      // SI HUBO UN ERROR EN EL PAGO, ENTRA AQUÍ
      alert(error.message);
      setErrorMessage(error.message);
    } else {
      //DENTRO DE ESTE ELSE SE LLAMAN LAS FUNCIONES DE LOS PROCESOS QUE SE NECESITAN CREAR ONCHAIN
      alert("Pago exitoso! Los NFTs serán tuyos pronto");

      // console.log("Payment successful. Amount:", amount);
      console.log("La transferencia NFT va a comenzar pronto.");

      setTimeout(() => {
        window.location.href = `/payment-success?amount=${amount}`;
      }, 3000);
      //TODO ESTO SE PUEDE BORRAR O CAMBIAR COMO SE REQUIERA
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay €${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
