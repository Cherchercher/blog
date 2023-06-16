import { isAfter, parseISO } from 'date-fns';
import fs from 'fs';
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
    //bucket is the "course"_ + cousename nomadichacker
    //key is the section_number_part_number
  
    const bucket = req?.query?.lesson;

    const listDirectories = (Bucket) => {
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

    const result = await listDirectories(bucket);

    const listParts = (Bucket, Prefix) => {
      return new Promise ((resolve, reject) => {
        const s3params = {
          Bucket: Bucket,
          Delimiter: '/',
          Prefix
        };
        s3.listObjectsV2 (s3params, (err, data) => {
          if (err) {
            reject (err);
          }
          resolve (data);
        });
      });
    };

  let mediaData = Array(result.CommonPrefixes.length).fill({"name": "", "parts": []});


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


  
    await Promise.all(
      result.CommonPrefixes.map(async (section, i) => {
        const parts = await listParts(bucket, section.Prefix);
        await Promise.all(parts.Contents.map(async (part, j) => {
        const keys = part.Key.split("/");
          if (keys.length > 1) {
            const [ partName, partType ] = keys[1].split(".");
            if (partName != '') {
              const partUrl = await getSignedUrl(part.Key, bucket);
              mediaData[i]["parts"].push({partName, partType, partUrl});
              mediaData[i]["name"] = keys[0];
            }
          }
      }))
    }));

    if (!isPaidUser || isSessionExpired) {
      return res.send({
        mediaData: null,
      });
     
    }
    //display necessary mesage

    console.log("media data is", mediaData)

    res.send({
      mediaData
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/error?error=${error.message}`)

  }
};
export default handler;
