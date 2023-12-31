import "./globals.css";
import { Inter } from "next/font/google";
import Menu from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

// This code exports a `metadata` object containing information about the dashboard project and its description.
export const metadata = {
  title: "dashboard project",
  description: "human body calculator program",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row">
          <Menu />
          {children}
        </div>
      </body>
    </html>
  );
}
