import { Josefin_Sans } from "next/font/google";

import Header from "@/app/_components/Header";

import "@/app/_styles/globals.css";
import { ReservationProvider } from "./_components/ReservationContext";

const josefinSans = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  // title: "The Wild Oasis"
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  openGraph: {
    title: "The Wild Oasis | Home",
    description: "The Wild Oasis, Welcome to our website",
  },
  description: "The Wild Oasis, Welcome to our website",
  // icons: {
  //   icon: "/logo.png",
  //   shortcut: "/logo.png",
  //   apple: "/logo.png",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefinSans.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 grid px-8  sm:px-6 lg:px-8 py-12">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
