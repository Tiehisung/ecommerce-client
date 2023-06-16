import { MongoClient } from "mongodb";

export default async function getCartProducts(req, res) {
  const client = await MongoClient.connect(process.env.MDB_URI);
  const db = client.db();
  const { ids } = req.body;
  try {
    const products = await db
      .collection("products")
      .find({ _id: { $in: ids } })
      .toArray();
    res.json({ products });
  } catch (e) {
    throw e;
  } finally {
    client.close();
  }
}
