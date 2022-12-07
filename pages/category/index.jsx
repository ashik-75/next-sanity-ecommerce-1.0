import React from "react";
import Products from "../../components/Products";
import { sanity } from "../../lib/sanity";

function index({ products }) {
  if (!products.length) {
    return <div>Product Not Found this category</div>;
  }
  return (
    <div>
      <Products products={products} />
    </div>
  );
}

export default index;

export async function getServerSideProps({ query }) {
  console.log(query);
  const categoryQuery = `*[_type == "product" && category._ref in *[_type == "category" && title match "${query?.q}*"]._id]{
    ...,
    category->
  }`;
  const response = await sanity.fetch(categoryQuery);

  return {
    props: {
      products: response,
    },
  };
}
