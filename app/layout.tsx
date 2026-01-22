import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundBlobs from './BackgroundBlobs'
import Navbar from './components/Navbar';


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <BackgroundBlobs />
        <Navbar/>
        {children}
      </body>
    </html>
  );
}