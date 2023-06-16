import { MongoClient } from "mongodb";
import { v4 as uuid } from "uuid";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function checkout(req, res) {
  if (req.method !== "POST") {
    res.json("Only POST request allowed.");
    return;
  }

  const { name, city, email, postalCode, streetAddress, country, products } =
    req.body;

  const productIds = products.split(",");

  const uniqueIds = [...new Set(productIds)];

  const client = await MongoClient.connect(process.env.MDB_URI);
  const db = client.db();

  const dbProducts = await db
    .collection("products")
    .find({ _id: { $in: uniqueIds } })
    .toArray();

  const line_items = [];
  for (let prodId of uniqueIds) {
    let product = dbProducts.find((p) => p._id === prodId);
    let quantity = productIds.filter((pId) => pId === prodId).length;
    let price = parseFloat(product?.price) || 0;

    line_items.push({
      quantity,
      price_data: {
        currency: "USD",
        unit_amount: price * quantity * 100,
        product_data: { name: product.name },
      },
    });
  }
  let orderDetails = {
    customer: { name, email, country, postalCode, streetAddress, city },
    line_items,
    timestamp: Date.now(),
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    _id: uuid(),
    served: false,
  };
  const saveCust = await db.collection("orders").insertOne(orderDetails);

  if (saveCust.acknowledged) {
    //Stripe payment api handler
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.PUBLIC_URI + "?success=1",
      cancel_url: process.env.PUBLIC_URI + "?canceled=1",
      metadata: { orderId: orderDetails._id },
    });

    res.json({ url: session.url });
  }

  client.close();
}
