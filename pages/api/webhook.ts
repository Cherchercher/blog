import { buffer } from 'micro';
import { prisma } from 'lib/prisma';
import Stripe from 'stripe';
import Cors from 'micro-cors';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});


// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST!);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

// let stripePromise: Promise<Stripe | null>;
// const getStripe = () => {
//   if (!stripePromise) {
//     loadStripe.setLoadParameters({advancedFraudSignals: false});
//     stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY_TEST!);
//   }
//   return stripePromise;
// };

// const stripe = await getStripe();

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST;

const handler = async (req, res) => {
  // if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).end(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const charge = event.data.object;
      // Handle successful charge
      const user = await prisma.user.upsert({
        create: {
          email: charge.customer_details.email,
        },
        update: {
          email: charge.customer_details.email,
        },
        where: {
          email: charge.customer_details.email,
        },
      });
      await prisma.purchase.upsert({
        create: {
          userId: user.id,
          productId: charge.metadata.productId,
          status: 'active',
        },
        update: {
          userId: user.id,
          productId: charge.metadata.productId,
          status: 'active',
        },
        where: {
          userId_productId: {
            userId: user.id,
            productId: charge.metadata.productId,
          },
        },
      });
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }
    res.send();
    // console.log('redirecting to login');
    // res.redirect(200, '/login');
  // } else {
  //   res.setHeader('Allow', 'POST');
  //   res.status(404).end('Method Not Allowed');
  // }
};

export default cors(handler);
