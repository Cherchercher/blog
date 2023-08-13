import { buffer } from 'micro';
import { prisma } from 'lib/prisma';
import Stripe from 'stripe';
import Cors from 'micro-cors';

import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});


const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})


const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST;

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).end(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const charge = event.data.object;
      // Handle successful charge

      const { Item } = await client.send(
        new GetItemCommand({
          TableName: "User",
          Key: {
            email: { S: "xiaoxuah@uci.edu" },
            type: { S: "BUYER"}
          }
        })
      );

      const input = {
        "Item": {
          "email": { S: "xiaoxuah@uci.edu" },
          "type": { S: "BUYER"}
        },
        "ReturnConsumedCapacity": "TOTAL",
        "TableName": "User"
      };

      if (!Item) {
        const command = new PutItemCommand(input);
        const response = await client.send(command);
      }
      
      try {
        // create purchase for User

        const input = {
          "Item": {
            "email": { S: user.email },
            "productId": { S: charge.metadata.productId},
            "status": { S: "active" }
          },
          "ReturnConsumedCapacity": "TOTAL",
          "TableName": "Purchase"
        };
  
        const command = new PutItemCommand(input);
        const response = await client.send(command);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }
    res.status(200).end(); 
  } else {
    res.setHeader('Allow', 'POST');
    res.status(404).end('Method Not Allowed');
  }
};

export default cors(handler);
