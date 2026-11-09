import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import AIAssistant from "@/components/AIAssistant"; // <-- Make sure this is here
import "./globals.css";

export const metadata: Metadata = {
  title: "Lencho Lemessa",
  description: "AI Automation Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <AIAssistant /> {/* <-- Make sure this is here */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}