"use client";

//NO TOCAR, ESTO ES DE PAGOS STRIPE

import CheckoutPage from "./logic/CheckoutPage";
import convertToSubcurrency from "./helpers/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function InitializePayment({
  amountNumber,
}: {
  amountNumber: number;
}) {
  const amount = amountNumber; // Aquí se pone lo que se quiere cobrar. Hay que poner los centavos también.

  if (!amountNumber) {
    alert("No hay cantidad de dinero para cobrar. Falló el pago.");

    setTimeout(() => {
      window.location.href = `/`;
    }, 1000);
  }

  return (
    <main className="max-w-6xl mx-auto p-10 text-gray-800 text-center border m-10 rounded-md bg-gradient-to-tr from-gray-100 to-white">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Nombre de la empresa</h1>
        <h2 className="text-2xl">
          Te solicita pagar
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "eur",
        }}
      >
        <CheckoutPage
          amount={amount}
          email={"zzzzzzzzzzzz@example.com"}
          walletId={"0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"}
          /*  customerName={"John Doe"} */ // Aquí se habilita el nombre del usuario, no es necesario, pero si lo consiguen, stripe recomienda ponerlo para disminuir la probabiliad de fraudes.
        />
      </Elements>
    </main>
  );
}
