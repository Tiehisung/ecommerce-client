import Featured from "@/components/featured";
import Header from "@/components/header";
import { MongoClient } from "mongodb";

export default function HomePage({ featuredProduct }) {
  console.log(featuredProduct)
  return (
    <main className="">
      <Header />
      <Featured product={featuredProduct} />
    </main>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MDB_URI);
  const db = client.db();
  const products = await db
    .collection("products")
    .find({})
    .limit(3)
    .toArray();
    console.log(products)

  return {
    props: {featuredProduct:products[1] },
  };
}
