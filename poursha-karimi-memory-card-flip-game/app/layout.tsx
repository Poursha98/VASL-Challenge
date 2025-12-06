import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});
export const metadata: Metadata = {
  title: "بازی کارت حافظه",
  description: "بازی کارت حافظه کلاسیک، حافظه خودت رو امتحان کن!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={`${vazirmatn.className} antialiased`}>{children}</body>
    </html>
  );
}
