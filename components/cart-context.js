import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export default function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let ls = typeof window !== "undefined" ? window.localStorage : null;
    if (cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
    if (ls && JSON.parse(ls.getItem("cart"))) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, [refresh]);

  function addToCart(productId) {
    setCartProducts((prev) => [...prev, productId]);
    setRefresh((p) => p + 1);
  }

  function removeFromCart(productId) {
    //remove one
    setCartProducts((prev) => {
      let pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((pp, i) => i !== pos);
      } else {
        return prev;
      }
    });
    setRefresh((p) => p + 1);
  }
  function clearCart(){
    setCartProducts([])
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeFromCart,
        refresh,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
