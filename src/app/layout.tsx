import type { Metadata } from "next";
import "./globals.css";
import { IsClientContextProvider } from "./contexts/IsClientContext";

export const metadata: Metadata = {
  title: "Doğa Korkmaz",
  description: "This site created by Doga Korkmaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <IsClientContextProvider>{children}</IsClientContextProvider>
      </body>
    </html>
  );
}
