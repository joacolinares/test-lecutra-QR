"use client";

//NO TOCAR, ESTO ES DE PAGOS STRIPE

import InitializePayment from "@/stripePayments/initializePayment";

export default function Payment() {
  const amountOfMoneyToChargeTheUser = 10; // la cantidad de dinero que se quiere cobrar

  return (
    <>
      <InitializePayment amountNumber={amountOfMoneyToChargeTheUser} />
      <div>hola</div>;
    </>
  );
}
