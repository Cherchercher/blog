import { isAfter, parseISO } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import AWS from 'aws-sdk';
import { prisma } from '../../../lib/prisma';

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

    const isPaidUser = email
      ? await prisma.user.findUnique({
          where: { email },
        })
      : false;

      console.log(req.query);

    //read from s3
    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY
      }
    });
  
    // The id from the route (e.g. /img/abc123987)
    // let filename = query.id;
    // bucket is the "course"_ + cousename nomadichacker
    // key is the section_number_part_number
  
    const bucket = req?.query?.tutorial;

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

    if (!isPaidUser || isSessionExpired) {
      return res.send({
        mediaData: null,
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
