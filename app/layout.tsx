import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop 3D",
  description: "Marketplace di oggetti stampati in 3D",
};

const paypalOptions = {
  clientId: "AR0Dkk2XZVYHok0Spgr-_icJxD5JTWR-SGmQ4QvIGfLwnJCBvTyxTAp44NHg3aXCyD7igGR7nnSwEFqd",
  currency: "EUR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PayPalScriptProvider options={paypalOptions}>
          <CartProvider>
            <CartDrawer />
            <main className="flex-grow">{children}</main>
          </CartProvider>
        </PayPalScriptProvider>
        <Footer />
      </body>
    </html>
  );
}
