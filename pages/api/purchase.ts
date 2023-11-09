// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
//   // https://github.com/stripe/stripe-node#configuration
//   apiVersion: '2022-11-15',
// })

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST!);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log({ productId: req.query.productId, ...req.body }, JSON.stringify(req.body));
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: req.query.priceId,
            quantity: 1,
          },
        ],
        allow_promotion_codes: true,
        metadata: { productId: req.query.productId, ...req.body },
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: req.body
        ? `${req.headers.origin}/login?purchaseSuccess=true&data=` + JSON.stringify(req.body):`${req.headers.origin}/login?purchaseSuccess=true`,
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


// start: '2023-11-06T21:00:00.000Z',
// end: '2023-11-06T22:00:00.000Z',
// duration: '60',
// timeZone: 'America/Vancouver',
// name: 'XIAOXUAN HUANG',
// email: 'xiaoxuah@uci.edu',
// comments: '?'