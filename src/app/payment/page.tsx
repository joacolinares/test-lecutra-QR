"use client";

import InitializePayment from "@/stripePayments/initializePayment";

export default function Payment() {
  const amountOfMoneyToChargeTheUser = 10; // la cantidad de dinero que se quiere cobrar
  const email = "test@test.com"; // email del usuario que va a pagar (aqui le llegará el recibo de pago)
  const walletId = "0x1111111111111111111111111"; // walletId

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
