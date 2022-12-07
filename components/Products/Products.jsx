import React from "react";
import Product from "./Product";

function Products({ products = [] }) {
  return (
    <div className="my-10 px-5 sm:px-0 grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}

export default Products;
