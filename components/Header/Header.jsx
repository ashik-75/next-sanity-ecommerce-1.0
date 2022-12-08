import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import React, { useState } from "react";
import { useCartContext } from "../../context/StoreContext";
import Cart from "../Cart";
import AuthShow from "./AuthShow";
import SearchBar from "./SearchBar";

function Header() {
  const { handleCartOpen, cartItems } = useCartContext();
  const [menuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className=" border-b w-full bg-white p-7 text-slate-700 flex items-center justify-between">
      <div className="flex items-center">
        <span
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden mr-3"
        >
          {menuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </span>

        <Link href={"/"}>
          <h1 className=" text-xl font-bold uppercase tracking-wider font-mono">
            Ecommerce 1.0
          </h1>
        </Link>
      </div>

      {menuOpen && <MobileMenu />}
      <ul className="hidden sm:flex space-x-5 font-bold uppercase ">
        <li>
          <Link href="/" className="tracking-wide">
            Home
          </Link>
        </li>
      </ul>

      <div className="flex gap-10 items-center">
        <div className="hidden md:inline">
          <SearchBar />
        </div>
        <div
          onClick={handleCartOpen}
          className="relative cursor-pointer hover:scale-110 transition-all"
        >
          <ShoppingCartIcon className="w-6 h-6" />
          <span className=" top-[-10px] left-[20px] absolute w-6 h-6 flex items-center justify-center rounded-full font-bold  bg-rose-500 text-white ">
            {cartItems?.length}
          </span>
        </div>

        <AuthShow />
      </div>

      <Cart />
    </div>
  );
}

export default Header;

function MobileMenu() {
  return (
    <ul className="flex flex-col w-[100%] p-5 fixed top-24 left-0 h-full sm:hidden bg-white shadow border-r gap-5 font-bold uppercase ">
      <li>
        <Link href="/" className="tracking-wide">
          Home
        </Link>
      </li>
      <li>
        <Link href={"/about"} className="tracking-wide">
          About Us
        </Link>
      </li>
      <li>
        <Link href={"/contact"} className="tracking-wide">
          Contact
        </Link>
      </li>

      <li>
        <SearchBar />
      </li>
    </ul>
  );
}
