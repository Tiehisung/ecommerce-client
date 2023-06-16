import MainLayout from "@/components/main-layout";
import ProductBox from "@/components/product-box";
import { MongoClient } from "mongodb";
import Head from "next/head";

export default function AllProductsPage({ products }) {
  console.log(products);
  return (
    <>
      <MainLayout>
        <Head>
          <title>Products</title>
        </Head>
        <main className=" py-6">
          <h1 className="main-title mb-4 flex items-center gap-2">
            Products <span className="text-gray-400"> &gt;</span>
          </h1>

          <div className="flex gap-5 flex-wrap items-center justify-center">
            {products?.map((product, i) => (
              <ProductBox key={i} {...product} />
            ))}
          </div>
        </main>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MDB_URI);
  const db = client.db();
  const products = await db
    .collection("products")
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return { props: { products } };
}
