import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundBlobs from './components/BackgroundBlobs'
// import Navbar from './components/Navbar'; (take away slashes when finally deploy real site)
// then add <Navbar /> in the body section of the return statement below, above {children}


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
        {children}
      </body>
    </html>
  );
}