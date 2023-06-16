import { CartContext } from "@/components/cart-context";
import MainLayout from "@/components/main-layout";
import CartIcon from "@/utils/icons";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useContext, useState } from "react";

export default function ProdutPage({ product }) {
  const { addToCart } = useContext(CartContext);
  return (
    <MainLayout>
      <>
        <Head>
          <title>Product</title>
        </Head>
        <main className="grid gap-3 flex-wrap md:flex-nowrap md:grid-cols-2 py-6">
          {/* product images */}
          <ProductImages images={product.images} />

          {/* product description */}
          <div>
            <h1 className="sub-title">Details</h1>
            <p
              style={{ gridTemplateColumns: "30% 70%" }}
              className="grid text-gray-700"
            >
              {" "}
              <span className="font-semibold text-gray-400">Name</span>{" "}
              {product.name}
            </p>
            <p
              style={{ gridTemplateColumns: "30% 70%" }}
              className="grid text-gray-700"
            >
              <span className="font-semibold text-gray-400">Category: </span>{" "}
              {product.category}
            </p>
            <p
              style={{ gridTemplateColumns: "30% 70%" }}
              className="grid text-gray-700"
            >
              <span className="font-semibold text-gray-400">Description: </span>{" "}
              {product.description}
            </p>
            <div>
              <span className="font-semibold text-gray-400">Properties: </span>
              {product.properties?.map((pp, i) => (
                <div key={i}>
                  <p className="flex gap-2 items-center justify-between">
                    <span className="font-semibold text-gray-400">
                      {pp.property}
                    </span>
                    <span>{pp.propertyValues}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 items-center justify-center mt-6">
              <span>
                <strong>{"US$" + product.price}</strong>
              </span>
              <button
                onClick={() => addToCart(product._id)}
                className="primary-btn flex w-fit gap-3 "
              >
                <CartIcon fill={"aliceblue"}/>
                Add to cart
              </button>
            </div>
          </div>
        </main>
      </>
    </MainLayout>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = await MongoClient.connect(process.env.MDB_URI);
  const db = client.db();
  const product = await db.collection("products").findOne({ _id: id });
  return { props: { product } };
}

export function ProductImages({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div className="bg-[#fafafa] p-3 mt-5">
      <div className="bg-white rounded-md p-4 flex items-center justify-center">
        <img
          src={images[imageIndex].secure_url}
          width={200}
          height={200}
          className="h-64 w-auto"
        />
      </div>
      <div className="flex max-w-[80vw] md:max-w-[700px] overflow-x-scroll gap-4  p-6">
        {images?.map((image, i) => (
          <div
            key={i}
            onClick={() => setImageIndex(i)}
            className="group relative flex w-[130px]"
          >
            <button
              style={{ backgroundImage: "url(" + image.secure_url + ")" }}
              className={`${
                imageIndex === i
                  ? "border-2 border-[#ff63478d]"
                  : "border-transparent opacity-90"
              } h-[100px] w-auto min-w-[120px] max-w-[130px] rounded-md bg-center bg-cover`}
            ></button>
            <span
              className={`hidden group-hover:block absolute bottom-0 text-sm w-full overflow-hidden text-white px-2 bg-[#80808068] text-center`}
            >
              {image.original_filename}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
