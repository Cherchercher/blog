import { buffer } from "micro";
import { v4 } from "uuid";
import Stripe from "stripe";
import Cors from "micro-cors";

// for strip payments

import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";

import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

// this is getting all courses
const ddbconfig: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(ddbconfig), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST;

const handler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).end(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const charge = event.data.object;
      const email = charge.customer_details.email;
      // Handle successful charge

      const params = {
        TableName: "User",
        IndexName: "email-accountType-index",
        KeyConditionExpression: "email = :email and accountType = :accountType",
        ExpressionAttributeValues: {
          ":email": { S: email },
          ":accountType": { S: "BUYER" },
        },
      };

      const command = new QueryCommand(params);

      const { Items } = await client.send(command);

      let id = v4();
      const input = {
        Item: {
          email: { S: email },
          accountType: { S: "BUYER" },
          id: { S: v4() },
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "User",
      };

      if (Items.length === 0) {
        const command = new PutItemCommand(input);
        const response = await client.send(command);
      } else {
        id = Items[0].id["S"]
      }

      console.log("details charge", charge)
      try {
        // create purchase for User
        const input = {
          Item: {
            userId: { S: id },
            productId: { S: charge.metadata.productId },
            status: { S: "active" },
          },
          ReturnConsumedCapacity: "TOTAL",
          TableName: "Purchase",
        };

        const command = new PutItemCommand(input);
        await client.send(command);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }
    res.status(200).end();
  } else {
    res.setHeader("Allow", "POST");
    res.status(404).end("Method Not Allowed");
  }
};

export default cors(handler);
