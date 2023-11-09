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

interface Request extends NextApiRequest {
  query: {
    pitch: string;
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

    const bucket = "pitch-nomadic";

    let mediaData = await getSignedUrl(req?.query?.pitch, bucket);

    res.send({
      mediaData
    });
  } catch (error) {
    console.log(error);
    // res.redirect(`/error?error=${error.message}`)

  }
};
export default handler;
