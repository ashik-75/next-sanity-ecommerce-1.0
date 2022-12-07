import { useEffect, useRef } from "react";

const useCloseOpen = (handler) => {
  const cartRef = useRef();

  useEffect(() => {
    const innerHandler = (event) => {
      if (!cartRef?.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", innerHandler);

    return () => {
      document.removeEventListener("mousedown", innerHandler);
    };
  }, [cartRef, handler]);

  return cartRef;
};

export default useCloseOpen;
