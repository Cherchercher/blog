import { isAfter, parseISO } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

import { QueryCommand } from "@aws-sdk/client-dynamodb";

import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

// this is getting all courses
const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

interface Request extends NextApiRequest {
  query: {
    lesson: string;
  };
}

export interface LessonsResponse {
  purchased: any[] | null;
  others: any[] | null;
  errorMessage: string | null;
}

interface Response extends NextApiResponse {
  send(params: LessonsResponse): any;
}
const handler = async (req: Request, res: Response) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session?.expires
      ? isAfter(new Date(), parseISO(session.expires))
      : true) {
      res.writeHead(401, { Location: '/login' }).end()
      return
    }


    // if (isSessionExpired != 2) {
    //   console.log("in redirect")
    //   res.writeHead(307, { Location: '/login' }).end()
    //   return 
    // }

    const email = session?.user?.email;

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

    const { Items: UserItems } = await client.send(command);

    const userId = UserItems[0].id["S"];

    const purchaseParams = {
      TableName: "Purchase",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": { S: userId } },
    };

    const purchaseCommand = new QueryCommand(purchaseParams);

    const { Items: purchased } = await client.send(purchaseCommand);

    let data = await Promise.all(
      purchased.map(async (purchase) => {
        const productId = purchase.productId["S"];
        const courseParams = {
          TableName: "Course",
          KeyConditionExpression: "id = :id",
          ExpressionAttributeValues: { ":id": { S: productId } },
        };
        const courseCommand = new QueryCommand(courseParams);
        const { Items: courses } = await client.send(courseCommand);
        return {
          ...purchase,
          courseBucket: courses[0].courseBucket["S"],
        };
      })
    );

    // const productIDs = PurchaseItems.map((purchase) => purchase.productId);

    // let courses = await prisma.course.findMany();
    // let data = await Promise.all(
    //   courses.map(async (course) => {
    //     const features = await prisma.feature.findMany({
    //       where: { courseId: course.id },
    //     });

    //     return {
    //       ...course,
    //       features: features.map((features) => features.description),
    //     };
    //   })
    // );

    // const [purchased, others] = courses.reduce(
    //   ([p, f], e) =>
    //     productIDs.includes(e.productId) ? [[...p, e], f] : [p, [...f, e]],
    //   [[], []]
    // );

    res.send({
      purchased: data,
      others: [],
      errorMessage: null,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't found this Lesson!");
  }
};
export default handler;
