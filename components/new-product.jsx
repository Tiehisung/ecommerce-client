import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./cart-context";
import ProductBox from "./product-box";

export default function NewProduct({ products }) {
  return (
    <main className=" my-5 ">
      <h1 className="flex gap-2 text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Latest
      </h1>

      <div className="flex gap-5 flex-wrap items-center justify-center">
        {products?.map((product, i) => (
          <ProductBox key={i} {...product} />
        ))}
      </div>
    </main>
  );
}


