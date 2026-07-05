import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AVAION",
  description: "The operating system for modern letting agencies"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
