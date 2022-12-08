import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import React, { useState } from "react";
import { useCartContext } from "../../context/StoreContext";
import Cart from "../Cart";
import AuthShow from "./AuthShow";
import SearchBar from "./SearchBar";
import SlickSearch from "./SlickSearch";

function Header() {
  const { handleCartOpen, cartItems } = useCartContext();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="relative border-b w-full bg-white p-7 text-slate-700 flex items-center justify-between">
      <div className="flex items-center">
        <Link href={"/"}>
          <h1 className=" text-xl font-bold uppercase tracking-wider font-mono">
            Ecommerce 1.0
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-5 md:gap-10">
        <div>
          <MagnifyingGlassIcon
            onClick={() => setShowSearch((p) => !p)}
            className="w-5 h-5 sm:hidden"
          />
          {showSearch && <SlickSearch />}
          <SearchBar />
        </div>

        <div className="flex gap-10 items-center">
          <div
            onClick={handleCartOpen}
            className="relative cursor-pointer hover:scale-110 transition-all"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className=" top-[-10px] left-[16px] absolute w-5 h-5 flex items-center justify-center rounded-full font-bold  bg-rose-500 text-white ">
              {cartItems?.length}
            </span>
          </div>

          <AuthShow />
        </div>
      </div>

      <Cart />
    </div>
  );
}

export default Header;
