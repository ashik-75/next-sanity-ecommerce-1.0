import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useCartContext } from "../../context/StoreContext";
import { urlFor } from "../../lib/sanity";

function Product({ product }) {
  const { title, price, image, slug, category, _id } = product || {};
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    addToCart({
      title,
      price,
      _id,
      qty: 1,
      image,
    });
    toast.success(`${title} is added to Cart.`);
  };

  return (
    <div className=" shadow-sm p-3 rounded-lg space-y-4">
      <Link href={`/${slug?.current}`}>
        <div className="relative rounded-lg overflow-hidden group">
          <div class="min-h-60 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
            <img
              src={urlFor(image?.[0])}
              alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <p
            className={`tracking-wider absolute font-bold text-white right-4 bottom-5 z-10 text-xl `}
          >
            ${price?.toFixed(2)}
          </p>
          <div className="w-[100%] h-[100%] bg-gradient-to-t from-slate-600/50 absolute top-0 left-0"></div>
        </div>
      </Link>

      <div>
        <Link href={`/${slug?.current}`}>
          <p
            className={` font-sans text-base hover:underline hover:underline-offset-2`}
          >
            {title}
          </p>
        </Link>
        <Link href={`/category/?q=${category?.slug?.current}`}>
          <p className="text-slate-500 text-sm hover:underline hover:underline-offset-1">
            {category?.title}
          </p>
        </Link>
      </div>
      <div>
        <button
          onClick={handleAddToCart}
          className="px-3 font-sans text-sm py-2 tracking-wide rounded bg-slate-100 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
