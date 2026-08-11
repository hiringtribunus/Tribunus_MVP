import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tribunus",
  description: "Cited approval-risk intelligence for development teams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
