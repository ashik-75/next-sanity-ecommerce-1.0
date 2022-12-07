import React, { useState } from "react";
import toast from "react-hot-toast";
import PortableText from "react-portable-text";
import RelatedProd from "../../components/RelatedProd/RelatedProd";
import { useCartContext } from "../../context/StoreContext";
import { sanity, urlFor } from "../../lib/sanity";

function ProductDetails({ product }) {
  const [activeImg, setActiveImg] = useState(null);
  const [qty, setQty] = useState(1);
  const { title, image, description, _createdAt, price, _id, category } =
    product || {};
  const { addToCart } = useCartContext();

  const categoryName = category?.slug?.current;

  const handleQuantity = (type) => {
    if (type == "inc") {
      setQty((prev) => prev + 1);
    } else if (type == "desc") {
      setQty((prev) => Math.max(0, prev - 1));
    }
  };

  const handleAddToCart = () => {
    addToCart({
      title,
      price,
      _id,
      qty,
      image,
    });
    toast.success(`${title} is added to Cart.`);
  };
  return (
    <>
      <div className=" p-5 flex  flex-col md:flex-row gap-5">
        <div className="flex-1">
          <div className="aspect-w-3 w-full h-72 aspect-h-2 overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-center object-cover"
              src={urlFor(activeImg || image?.[0])}
              alt="detailed item"
            />
          </div>
          <div className="flex gap-5 mt-5">
            {image.map((singleImage) => (
              <div
                key={singleImage._key}
                onClick={() => setActiveImg(singleImage)}
                className="w-16 h-10 md:w-32 md:h-20"
              >
                <div className=" aspect-w-3 aspect-h-2 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={urlFor(singleImage)}
                    className={`${
                      activeImg?._key === singleImage?._key
                        ? " opacity-100"
                        : "opacity-70"
                    } w-full h-full object-cover object-center`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5 flex-1">
          <p className="text-3xl font-extrabold">{title}</p>
          <p className="text-lg font-bold">$ {price}</p>
          <div className="w-fit">
            <span
              onClick={() => handleQuantity("desc")}
              className="px-4 py-2 text-xl border cursor-pointer hover:bg-slate-100"
            >
              -
            </span>
            <span className="px-4 py-2 border-y text-xl">{qty}</span>
            <span
              onClick={() => handleQuantity("inc")}
              className="px-4 py-2 text-xl border cursor-pointer hover:bg-slate-200"
            >
              +
            </span>
          </div>
          <div className="space-x-3">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 border hover:bg-black hover:text-white transition duration-150 font-bold tracking-wide"
            >
              Add to Cart
            </button>
            <button className="px-4 py-2 border hover:bg-black hover:text-white transition duration-150 font-bold tracking-wide">
              Buy Now
            </button>
          </div>

          {description && (
            <>
              <div className="font-bold text-lg tracking-wide">
                Product Details{" "}
              </div>
              <PortableText
                content={description}
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                serializers={{
                  h1: (props) => (
                    <h1 className="text-3xl font-bold" {...props} />
                  ),
                  h2: (props) => (
                    <h1 className="text-2xl font-bold" {...props} />
                  ),
                  h3: (props) => (
                    <h1 className="text-xl font-bold" {...props} />
                  ),
                  h4: (props) => (
                    <h1 className="text-lg font-bold" {...props} />
                  ),
                  h5: (props) => (
                    <h1 className="text-md font-bold" {...props} />
                  ),
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  p: ({ children }) => <p className="my-3">{children}</p>,
                  div: ({ children }) => <div className="my-5">{children}</div>,
                  span: ({ children }) => (
                    <span className="my-3">{children}</span>
                  ),
                  link: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-base hover:underline hover:underline-offset-2 hover:text-blue-700"
                    >
                      {children}
                    </a>
                  ),
                }}
              />
            </>
          )}
        </div>
      </div>
      {categoryName && <RelatedProd category={categoryName} />}
    </>
  );
}

export default ProductDetails;

export async function getStaticPaths() {
  const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;
  const response = await sanity.fetch(query);
  const paths = response.map((prod) => ({
    params: {
      slug: prod.slug.current,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    ...,
    category->
  }`;

  const product = await sanity.fetch(query);

  return {
    props: {
      product,
    },
  };
}
