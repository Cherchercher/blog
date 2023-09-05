import { isAfter, parseISO } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import AWS from 'aws-sdk';

import {
  QueryCommand
} from '@aws-sdk/client-dynamodb';


import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
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
})

interface Request extends NextApiRequest {
  query: {
    lesson: string;
  };
}


export interface LessonResponse {
  mediaData:  any | null;
}
interface Response extends NextApiResponse {
  send(params: LessonResponse): any;
}
const handler = async (req: Request, res: Response) => {
  try {
    const session = await getSession({ req });
    const isSessionExpired = session?.expires
      ? isAfter(new Date(), parseISO(session.expires))
      : true;


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

    const { Items: userItems } = await client.send(command);

    let isPaidUser = true;
    if (userItems.length === 0) {
      isPaidUser = true
    }


    if (!isPaidUser || isSessionExpired) {
      return res.send({
        mediaData: null,
      });
    }

    

    //read from s3
    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });
  
    // The id from the route (e.g. /img/abc123987)
    // let filename = query.id;
    // bucket is the "course"_ + cousename nomadichacker
    // key is the section_number_part_number
  
    console.log("query is", req?.query);
    const bucket = req?.query?.tutorial;

    console.log("bucket is", bucket)

    const listObjects = (Bucket) => {
      return new Promise ((resolve, reject) => {
        const s3params = {
          Bucket,
          Delimiter: '/',
        };
        s3.listObjectsV2 (s3params, (err, data) => {
          if (err) {
            reject (err);
          }
          resolve (data);
        });
      });
    };

    const result = await listObjects(bucket);

    console.log(result);


    const getSignedUrl = function(key, bucket) {
      return new Promise((resolve, reject) => {
        s3.getSignedUrl("getObject", {
          Bucket: bucket,
          Key: key
        }, (err, data) => {
          if (err) reject(err);
          resolve(data     
            );
        });
      });
    }


    let mediaData = [];
  
    await Promise.all(
      result.Contents.map(async (data, i) => {
          mediaData.push({name: data.key, url:  await getSignedUrl(data.Key, bucket) })
      })
    );

    res.send({
      mediaData
    });
  } catch (error) {
    console.log(error);
    // res.redirect(`/error?error=${error.message}`)

  }
};
export default handler;
