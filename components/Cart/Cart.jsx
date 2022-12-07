import { XCircleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCartContext } from "../../context/StoreContext";
import useCloseOpen from "../../hooks/useCloseOpen.hook";
import { getStripe } from "../../lib/getStripe";
import CartProducts from "./CartProducts";

function Cart() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const {
    isCartOpen,
    handleCartOpen,
    setIsCartOpen,
    cartItems,
    cartTotalPrice,
  } = useCartContext();

  const domRef = useCloseOpen(() => {
    setIsCartOpen(false);
  });

  const handleCheckout = async () => {
    setIsLoading(true);
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.success("Redirecting to checkout ....");

    stripe.redirectToCheckout({ sessionId: data?.id });
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          ref={domRef}
          className="fixed box-border  p-5 text-black top-0 space-y-4 right-0 w-[100%] md:w-[35%] lg:w-[25%] h-screen shadow-lg bg-white"
          initial={{ x: "100%" }}
          animate={{
            x: 0,
            transition: {
              duration: 0.2,
            },
          }}
          exit={{ x: "110%" }}
        >
          {/* Top */}
          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl">Cart</p>
            <button onClick={handleCartOpen}>
              <XCircleIcon className="w-7 h-7" />
            </button>
          </div>

          {cartItems?.length === 0 ? (
            <div className="flex flex-col space-y-3 items-center justify-center">
              <p>Your Cart is currently empty</p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/");
                }}
                className="px-4 py-2 bg-slate-800 text-white"
              >
                Add Product
              </button>
            </div>
          ) : (
            <>
              {/* Middle */}
              <div className="h-auto border-y space-y-10 py-5 pb-20">
                <CartProducts cartItems={cartItems} />

                <form className="space-y-3">
                  <div className=" uppercase font-bold">Order Note</div>
                  <input
                    className="outline-none w-full border p-4  "
                    placeholder="write something ...."
                  />
                </form>
              </div>

              {/* Bottom */}

              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="uppercase font-bold tracking-wider">Subtotal</p>
                  <p>$ {cartTotalPrice}</p>
                </div>

                <button
                  onClick={handleCheckout}
                  className={`px-4 tracking-wide py-3 bg-slate-800 w-full font-bold text-white ${
                    !session?.data && "disabled opacity-50 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div role="status" className={"space-x-3"}>
                      <span class="">Payment Loading </span>
                      <svg
                        className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : (
                    "Pay with Stripe"
                  )}
                </button>

                {!session?.data && (
                  <span className="my-2 block">
                    Note: If you want to checkout ,please{" "}
                    <Link
                      href={"/login"}
                      className="underline underline-offset-2 text-rose-600"
                    >
                      Login Here
                    </Link>{" "}
                  </span>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cart;
