import { ConnectButton } from "thirdweb/react";
import { client } from "./client";

export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <ConnectButton
        client={client}
      />
    </main>
  );
}
