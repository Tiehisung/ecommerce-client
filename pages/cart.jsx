import { CartContext } from "@/components/cart-context";
import MainLayout from "@/components/main-layout";
import { LoadingSpinner } from "@/utils/spinner";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [localCart, setlocalCart] = useState([]);

  useEffect(() => {
    let ls = JSON.parse(localStorage.getItem("cart"));
    setlocalCart(ls || []);
  }, [cartProducts]);

  return (
    <MainLayout>
      <Head>
        <title>Cart content</title>
      </Head>
      <main className="flex flex-wrap justify-center  lg:flex-nowrap gap-3 items-center py-10">
        <div className="p-3 rounded-md min-w-[320px] w-[60%]  bg-white shadow-sm">
          {localCart?.length === 0 ? (
            <div>No content in cart</div>
          ) : (
            <CartInfo localCart={localCart} />
          )}
        </div>

        {/*Proceed payment panel */}
        <div>
          <DeliveryContactInfo localCart={localCart} />
        </div>
      </main>
    </MainLayout>
  );
}

export function CartInfo({ localCart }) {
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext);
  const [dbProducts, setDbProducts] = useState([]);

  let total = 0;

  for (let prodId of cartProducts) {
    let price =
      parseFloat(dbProducts.find((prod) => prod._id === prodId)?.price) || 0;
    total += price;
  }

  useEffect(() => {
    async function getProducts() {
      const dbProducts = await fetch("/api/get-cart-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: localCart }),
      });
      const data = await dbProducts.json();
      setDbProducts(data.products);
      console.log("dbproducts for cart", data);
    }
    getProducts();
  }, [cartProducts]);
  return (
    <>
      <div className=" max-h-[70vh] overflow-y-auto">
        {!dbProducts && (
          <LoadingSpinner number={1} color={"green"} text={"Loading..."} />
        )}
        {dbProducts.length > 0 && (
          <table className="borderless-table h-full relative w-full pb-5">
            <thead className="sticky top-[0px] -mt-1 h-12">
              <tr>
                <th className="text-left text-gray-400">Product</th>
                <th className="text-left text-gray-400">Quantity</th>
                <th className="text-left text-gray-400">Price (USD)</th>
              </tr>
            </thead>

            <tbody>
              {dbProducts.map((product, i) => (
                <tr key={i}>
                  <td>
                    <div
                      className={`w-[140px] h-[130px] rounded-md p-2 flex items-center justify-center`}
                    >
                      <img
                        src={product.images[0].secure_url}
                        alt=""
                        width={30}
                        height={25}
                        className={` w-full h-full rounded-md`}
                      />
                    </div>
                    {product.name}
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-2xl text-gray-500 border rounded-md px-3 hover:bg-gray-100 active:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="font-bold">
                        {localCart.filter((id) => id === product._id).length}
                      </span>
                      <button
                        onClick={() => addToCart(product._id)}
                        className="text-2xl text-gray-500 border rounded-md px-3 hover:bg-gray-100 active:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    $
                    <span className="text-[tomato]">
                      {localCart.filter((id) => id === product._id).length *
                        parseFloat(product.price)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="shadow-md font-bold border-t-2">
              <tr>
                <td></td>
                <td></td>
                <td>${total}</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </>
  );
}

export function DeliveryContactInfo({ localCart }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");

  const { clearCart } = useContext(CartContext);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log();
    const res = await fetch("/api/checkout-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        city,
        country,
        streetAddress,
        postalCode,
        email,
        products: localCart.join(","),
      }),
    });
    const data = await res.json();
    console.log(data.url);
    if (data.url) {
      window.location = data.url;
    }
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      setIsSuccess(true);
    }
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("cancel")
    ) {
      setIsCanceled(true);
    }
  }, []);

  if (isSuccess) {
    clearCart();
    return (
      <div>
        <h1>Thanks for the order!</h1>
        <p>We will notify you when your items are to be received.</p>
      </div>
    );
  }

  if (isCanceled) {
    clearCart();
    return (
      <div>
        <h1>Sorry for failing to complete transaction!</h1>
        <p>Your data may not be saved if you leave.</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        localCart?.length > 0 ? "grid" : "hidden"
      } p-3 py-4 gap-7 rounded-md min-w-[320px] max-w-[400px] h-fit bg-white shadow-sm`}
    >
      <h1>Order information</h1>
      <form
        method="post"
        action="/api/checkout-cart"
        onSubmit={handleSubmit}
        className={`flex flex-col gap-2`}
      >
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          type="text"
          required
          placeholder="Name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          required
          placeholder="Email"
        />
        <div className="grid grid-cols-2 gap-3 max-w-full">
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            name="city"
            type="text"
            required
            placeholder="City"
          />
          <input
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            name="postalCode"
            type="text"
            required
            placeholder="Postal code"
          />
        </div>
        <input
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          name="country"
          type="text"
          required
          placeholder="Country"
        />
        <input
          onChange={(e) => setStreetAddress(e.target.value)}
          value={streetAddress}
          name="streetAddress"
          type="text"
          required
          placeholder="Street address"
        />
        <input name="products" type="hidden" value={localCart.join(",")} />
        <button className="block primary-btn mt-3">Continue to payment</button>
      </form>
    </div>
  );
}
