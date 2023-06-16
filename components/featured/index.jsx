import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../cart-context";
import CartIcon from "@/utils/icons";

export default function Featured({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <main
      style={{ gridTemplateColumns: "0.8fr 1.2fr" }}
      className={`flex gap-10 md:gap-3 flex-col-reverse md:grid bg-primaryDark mx-[-15px] sm:mx-[-10vw] py-20`}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl text-white">
          {product?.title || "Pro everywhere"}
        </h1>
        <p className="text-sm text-gray-200">
          {product?.description ||
            "Lorem repudiandae. ipsumporis incidunt reiciendis non et natus delectus quod ullam repellendus eaque vero suscipit laborum quo omnis minus qui, dignissimos dolor sit amet consectetur adipisicing elit. Dolore sit"}
        </p>
        <span className="flex gap-4 mt-3">
          <Link href={"/product/" + product._id} className="primary-link">
            Read more
          </Link>
          <button
            onClick={() => addToCart(product._id)}
            className="primary-btn flex gap-3"
          >
            <CartIcon fill={"none"} /> Add to cart
          </button>
        </span>
      </div>

      <div className="flex items-center justify-center">
        <img
          src={
            product?.images[0]?.secure_url ||
            "https://res.cloudinary.com/dgp4vzn3m/image/upload/v1685890213/eco-products/rrl1fepkadyzrdiqypcm.jpg"
          }
          alt="featured"
          width={200}
          height={200}
          className="w-auto h-56"
        />
      </div>
    </main>
  );
}
