//NO TOCAR, ESTO ES DE PAGOS STRIPE

import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount, email, walletId, customerName } = await request.json();

    console.log("amount requested: ", amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      receipt_email: email && email, // aqui va a llegar el recibo de pago, aqui va el email del usuario
      automatic_payment_methods: { enabled: true }, //habilita varios tipos de pagos con varios bancos de varios paises en europa
      metadata: {
        id: walletId && walletId /* "0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzz" */, // aqui puede ir el id de la wallet del usuario
        email: email && email,
        customer_name: customerName && customerName, // "John Doe",
      },
    });

    //console.log("amount requested: ", amount);
    //console.log("paymentIntent: ", paymentIntent);
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    //console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
