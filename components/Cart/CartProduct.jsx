import { useCartContext } from "../../context/StoreContext";
import { urlFor } from "../../lib/sanity";

function CartProduct({ product }) {
  const { image, title, price, qty, _id } = product || {};
  const { handleQuantity } = useCartContext();

  const handleGlobalQty = (type) => {
    const prod = { image, title, price, qty, _id };
    handleQuantity(type, prod);
  };

  return (
    <div className="flex items-center space-x-4">
      <div>
        <img
          src={urlFor(image?.[0])}
          className="w-20 h-20 object-cover rounded"
          alt=""
        />
      </div>
      <div className={`flex-1 space-y-2 `}>
        <p className={`text-lg tracking-wide `}>{title}</p>
        <p className={` tracking-wide `}>Black / normal</p>
        <div className="flex space-x-5 items-center overflow-hidden">
          <div className="border">
            <span
              onClick={() => handleGlobalQty("desc")}
              className="p-2 text-xl hover:bg-slate-200 cursor-pointer"
            >
              -
            </span>
            <span className="p-2 text-lg">{qty}</span>
            <span
              onClick={() => handleGlobalQty("inc")}
              className="p-2 text-xl hover:bg-slate-300 cursor-pointer"
            >
              +
            </span>
          </div>

          <div>$ {price}</div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
