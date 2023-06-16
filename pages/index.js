import Featured from "@/components/featured";
import Header from "@/components/header";
import MainLayout from "@/components/main-layout";
import NewProduct from "@/components/new-product";
import { MongoClient } from "mongodb";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <MainLayout>
      <main className="min-h-screen">
        <Featured product={featuredProduct} />
        <NewProduct products={newProducts} />
      </main>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MDB_URI);
  const db = client.db();
  const products = await db.collection("products").find({}).limit(3).toArray();

  const newProducts = await db
    .collection("products")
    .find({}, { sort: { timestamp: -1 } })
    .limit(10)
    .toArray();

  return {
    props: { featuredProduct: products[1], newProducts },
  };
}
