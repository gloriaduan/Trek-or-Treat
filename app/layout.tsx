import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const prompt = localFont({
  src: [
    {
      path: "./fonts/Prompt-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Prompt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Prompt-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Prompt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "Trek or Treat",
  description: "Find your Halloween Trick-or-Treating Route.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${prompt.variable} font-prompt min-h-screen flex flex-col`}
        >
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
