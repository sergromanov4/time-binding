import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import classnames from "classnames";

import "react-toastify/dist/ReactToastify.css";

import Header from "@/components/Header";
import { Providers } from "@/store/Providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Main",
  description: "main",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classnames(inter.className, "flex flex-col min-h-screen")}
      >
        <Providers>
          <>
            <Header />
            <main className="flex w-full max-w-screen-xl flex-col items-start self-center justify-start gap-8 p-8">
              {children}
            </main>
            <ToastContainer autoClose={1200} pauseOnHover={false} />
          </>
        </Providers>
      </body>
    </html>
  );
}
