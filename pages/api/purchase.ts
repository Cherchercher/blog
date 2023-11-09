// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
//   // https://github.com/stripe/stripe-node#configuration
//   apiVersion: '2022-11-15',
// })

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST!);

export default async function handler(req, res) {
  console.log("SPATCH ID", req.query)
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: req.query.priceId,
            quantity: 1,
          },
        ],
        allow_promotion_codes: true,
        metadata: { productId: req.query.productId },
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${req.headers.origin}/login?purchaseSuccess=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
