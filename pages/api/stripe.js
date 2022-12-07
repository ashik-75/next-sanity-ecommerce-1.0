import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const cartItems = req.body;
  const formatProductsForCheckout = cartItems.map((item) => {
    const image = item.image?.[0].asset._ref;
    const newImageGlobalUrl = image
      .replace("image-", "https://cdn.sanity.io/images/8abjr4fc/ecommerce/")
      .replace("-jpg", ".jpg");
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [newImageGlobalUrl],
        },
        unit_amount: item.price * 100,
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
      quantity: item.qty,
    };
  });

  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          {
            shipping_rate: "shr_1MBA07DBzriSDiJzcYUQ3xXI",
          },
          {
            shipping_rate: "shr_1MBA14DBzriSDiJzhADXBEmm",
          },
        ],
        line_items: formatProductsForCheckout,

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
