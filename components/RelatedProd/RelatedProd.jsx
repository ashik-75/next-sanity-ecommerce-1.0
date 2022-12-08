import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useSWR from "swr";
import { sanity, urlFor } from "../../lib/sanity";

function fetcher(...keys) {
  const category = keys?.[1];
  const query = `*[_type == "product" && category._ref in *[_type == "category" && title match "${category}*"]._id]{
        ...,
        category->
    }`;

  return sanity.fetch(query);
}

function RelatedProd({ category }) {
  const { data, error, mutate } = useSWR(["category", category], fetcher);

  if (!data && !error) {
    return <div>Loading ...</div>;
  }
  const settings = {
    infinite: true,
    speed: 3000,
    autoplaySpeed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    pauseOnHover: true,
    cssEase: "linear",
  };

  return !data ? null : (
    <div className="p-5 w-[100%] overflow-hidden mb-5">
      <div className="my-10 text-2xl font-bold">Related Products</div>
      <Slider {...settings}>
        {data?.map((product) => (
          <Link key={product._id} href={`/${product?.slug?.current}`}>
            <div className="relative h-72 rounded-lg overflow-hidden mr-5 ">
              <div className="h-full  w-full ">
                <img
                  className="w-full h-full object-top object-cover"
                  src={urlFor(product.image?.[0])}
                  alt=""
                />
              </div>
              <div className="absolute top-52 left-20 z-10">
                <h3 className="font-bold text-xl uppercase text-white">
                  {product.title}
                </h3>
                <h3 className="font-bold text-lg uppercase text-white">
                  ${product.price}
                </h3>
              </div>

              <div className="bg-gradient-to-t from-slate-400/50 absolut top-0 left-0 w-[100%] h-[100%] absolute"></div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default RelatedProd;
