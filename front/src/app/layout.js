"use client"
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import NavDash from "./dashboard/Navbar";
import { AppWrapper } from "./context/UserProvider";



export default function RootLayout({ children }) {

  const pathName=usePathname().startsWith('/app');
  const navdash=usePathname().startsWith('/app');

  



console.log(pathName)
  return (
    <html lang="ar">
      <body className="font-sans antialiased">
        <AppWrapper>
        {!pathName  && <Navbar />}
        {navdash  &&  <NavDash/>}
        {children}
        {!pathName && <Footer />}
        </AppWrapper>
      </body>
    </html>
  );
}