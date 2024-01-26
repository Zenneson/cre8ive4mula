const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SEC);

const calculateOrderAmount = (items) => {
  return 1400;
};

export default async function handler(req, res) {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "us",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
