import type { Metadata } from "next";
import { Fraunces, Sora, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Nook Cafe",
  description: "The neighbourhood living room, your 3rd space and second home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(fraunces.variable, sora.variable, "font-sans", geist.variable)}>
      <body className="font-body bg-[#E8DCC8] text-[#2B211C]">{children}</body>
    </html>
  );
}
