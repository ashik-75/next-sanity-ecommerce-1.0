import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const StoreContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  //   TODO: Handle Cart open toggle
  const handleCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };

  // TODO: Add Item Functionality
  const addToCart = (product) => {
    const isProductPresent = cartItems.find((prod) => prod._id === product._id);

    if (isProductPresent) {
      const newArr = cartItems.map((prod) =>
        prod._id === product._id ? { ...prod, qty: product.qty } : { ...prod }
      );
      setCartItems(newArr);
    } else {
      setCartItems((prev) => [...prev, { ...product }]);
    }
  };

  // TODO: Handle Quantity From Cart
  const handleQuantity = (type, product) => {
    if (type === "inc") {
      const newArr = cartItems.map((prod) =>
        prod._id === product._id
          ? { ...prod, qty: product.qty + 1 }
          : { ...prod }
      );
      setCartItems(newArr);
    } else if (type === "desc") {
      if (product?.qty === 1) {
        const newArr = cartItems.filter((prod) => prod._id !== product._id);
        setCartItems(newArr);
      } else {
        const newArr = cartItems.map((prod) =>
          prod._id === product._id
            ? { ...prod, qty: product.qty - 1 }
            : { ...prod }
        );
        setCartItems(newArr);
      }
    }
  };

  const cartTotalPrice = cartItems.reduce(
    (prev, curr) => prev + curr.price * curr.qty,
    0
  );

  useEffect(() => {
    if (cartItems.length) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const localData = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    setCartItems(localData);
  }, []);

  return (
    <Context.Provider
      value={{
        isCartOpen,
        addToCart,
        cartItems,
        cartTotalPrice,
        handleCartOpen,
        setIsCartOpen,
        handleQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => {
  const value = useContext(Context);

  return value;
};
