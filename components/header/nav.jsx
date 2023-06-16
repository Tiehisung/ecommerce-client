import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../cart-context";

export default function Nav({ showNav, setShowNav }) {
  const { cartProducts, refresh } = useContext(CartContext);
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    let ls = typeof window !== "undefined" ? window.localStorage : null;
    if (ls && JSON.parse(localStorage.getItem("cart")))
      setLocalCart(() => JSON.parse(localStorage.getItem("cart")));
  }, [refresh]);

  return (
    <nav
      className={`${
        showNav ? "top-7" : "-top-full"
      } flex  items-start justify-between py-1 grow px-[10vw]  fixed left-0 right-0  md:top-7 md:static bg-primaryDark transition-all`}
    >
      <div className={` grid gap-3 md:flex`}>
        <Link
          className="default-link  hover:bg-[#000000c0] hover:no-underline "
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="default-link  hover:bg-[#000000c0] hover:no-underline "
          href={"/products"}
        >
          All Products
        </Link>
        <Link
          className="default-link  hover:bg-[#000000c0] hover:no-underline "
          href={"/categories"}
        >
          Categories
        </Link>
        <Link
          className="default-link  hover:bg-[#000000c0] hover:no-underline "
          href={"/account"}
        >
          Account
        </Link>
        <Link
          className="default-link  hover:bg-[#000000c0] hover:no-underline "
          href={"/cart"}
        >
          Cart({localCart.length})
        </Link>
      </div>

      <button
        onClick={() => setShowNav(false)}
        className="text-[2rem] hover:text-red-200 -mt-5 -mr-6 md:hidden"
      >
        &times;
      </button>
    </nav>
  );
}
