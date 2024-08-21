//NO TOCAR, ESTO ES DE PAGOS STRIPE

// Trae el valor de amount desde el searchParams.
// En el futuro sería bueno no tomar ese valor desde la url. Sino desde un estado de global. Porque si se toma desde la url va a mostrar lo que sea que se le ponga ahí.

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="max-w-6xl mx-auto p-10 text-black text-center border rounded-md bg-gradient-to-tr from-gray-100 to-white">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">¡Gracias por tu pago!</h1>
        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          EUR {amount}
        </div>
      </div>
    </main>
  );
}
