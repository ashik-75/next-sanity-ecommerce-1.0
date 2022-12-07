import Link from "next/link";
import React from "react";
import Products from "../../components/Products";
import { sanity } from "../../lib/sanity";

function SearchPage({ products = [] }) {
  if (!products.length) {
    return (
      <div className="p-10 flex flex-col space-y-4 justify-center items-center">
        <p>Products Not Found</p>
        <Link href={"/"}>
          <button className="px-2 py-1 rounded border">Back to Home</button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Products products={products} />
    </div>
  );
}

export default SearchPage;

export async function getServerSideProps({ query }) {
  const searchQuery = `*[_type == "product" && title match "${query.query}"]`;

  console.log({ searchQuery, query });

  const products = await sanity.fetch(searchQuery);

  return {
    props: {
      products,
    },
  };
}
