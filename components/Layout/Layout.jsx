import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer";
import Header from "../Header";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Ecommerce 1.0</title>
      </Head>
      <Toaster />
      <body>
        <header className="sticky top-0 z-50">
          <Header />
        </header>
        <div className="scrollbar scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full scrollbar-track-slate-100">
          <main className="min-h-[90vh] md:w-[75%] mx-auto ">{children}</main>
        </div>
        <footer>
          <Footer />
        </footer>
      </body>
    </>
  );
}

export default Layout;
