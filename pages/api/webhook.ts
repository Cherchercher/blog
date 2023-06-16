import Stripe from 'stripe';
import { buffer } from 'micro';
import { prisma } from 'lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST, {
  apiVersion: '2022-11-15',
});


const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST;


const handler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log(event.type);

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
            status: "active"
          },
          update: {
            userId: user.id,
            productId: charge.metadata.productId,
            status: "active"
          },
          where: {
            userId_productId: {
              userId: user.id,
              productId: charge.metadata.productId
            }
          },
        });
      } else {
        console.warn(`Unhandled event type: ${event.type}`);
      }
      res.redirect(200, '/login');
    } catch (err) {
      res.status(400).end(`Webhook Error: ${err.message}`);
      console.log(err)
      return;
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
