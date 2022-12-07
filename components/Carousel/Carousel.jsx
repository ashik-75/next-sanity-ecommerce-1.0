import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { urlFor } from "../../lib/sanity";

function Carousel({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="w-[100%] overflow-hidden px-5 sm:px-0">
      <Slider {...settings}>
        {products?.map((product) => (
          <Link key={product._id} href={`/${product?.slug?.current}`}>
            <div className="relative ">
              <div className="h-80  w-full ">
                <img
                  className="w-full h-full object-center object-contain"
                  src={urlFor(product.image?.[0])}
                  alt=""
                />
              </div>
              <div className="absolute top-52 left-20 z-10">
                <h3 className="font-bold text-xl uppercase text-white">
                  {product.title}
                </h3>
              </div>

              <div className="bg-gradient-to-t from-slate-500/50 absolut top-0 left-0 w-[100%] h-[100%] absolute"></div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
