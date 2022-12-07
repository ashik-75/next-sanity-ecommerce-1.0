import React from "react";
import CartProduct from "./CartProduct";

function CartProducts({ cartItems }) {
  console.log({ cartItems });
  return (
    <div className="space-y-5">
      {cartItems.map((prod) => (
        <CartProduct key={prod.id} product={prod} />
      ))}
    </div>
  );
}

export default CartProducts;
