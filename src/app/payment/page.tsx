"use client";

import InitializePayment from "@/stripePayments/initializePayment";

export default function Payment() {
  const amountOfMoneyToChargeTheUser = 10; // la cantidad de dinero que se quiere cobrar
  const email = "test@test.com"; // la cantidad de dinero que se quiere cobrar
  const walletId = "0x1111111111111111111111111"; // la cantidad de dinero que se quiere cobrar

  //////////////////////////////////////////////////////////////////
  //  Este es un ejemplo de cómo llamar al componente que         //
  //  inicia la logica de cobro, obtienen los datos y los envían  //
  //  y este componente se encarga de realizar el cobro.          //
  //////////////////////////////////////////////////////////////////

  return (
    <>
      <InitializePayment
        amountNumber={amountOfMoneyToChargeTheUser}
        email={email}
        walletId={walletId} /* customerName="John Doe"  */
      />
    </>
  );
}
