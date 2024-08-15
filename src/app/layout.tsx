import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import { ThirdwebProvider } from "./thirdweb";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "World Token Congress",
  description:
    "World Token Congress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <ThirdwebProvider>
          <ChakraProvider>
            <NavBar/>
            {children}
          </ChakraProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
