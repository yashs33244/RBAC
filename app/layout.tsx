import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster"; // Add this import

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster /> {/* Add this */}
      </body>
    </html>
  );
}
