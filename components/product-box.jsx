import { useContext } from "react";
import { CartContext } from "./cart-context";
import Link from "next/link";

export default function ProductBox({ _id, price, name, description, images }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className=" flex flex-col gap-1 items-center justify-center w-[200px]">
      <Link
        href={"/products/" + _id}
        className="flex items-center justify-center bg-white rounded-xl p-3 w-[190px]"
      >
        <img
          src={images[0].secure_url || ""}
          alt="latest product"
          className="max-w-[180px] max-h-[150px]"
        />
      </Link>

      <Link href={"/products/" + _id}>{name}</Link>
      <div className="flex items-center gap-2 justify-between">
        <span className="font-bold">${price}</span>
        <button onClick={() => addToCart(_id)} className="default-btn">
          Add to cart
        </button>
      </div>
    </div>
  );
}
