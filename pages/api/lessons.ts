import { isAfter, parseISO } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { prisma } from '../../lib/prisma';

interface Request extends NextApiRequest {
  query: {
    lesson: string;
  };
}

export interface LessonsResponse {
    purchased: [
        {
            [key: string]: any | null;
        }
    ] | null;
    others: [
        {
            [key: string]: any | null;
        }
    ] | null;
    errorMessage: string | null;
  }

interface Response extends NextApiResponse {
  send(params: LessonsResponse): any;
}
const handler = async (req: Request, res: Response) => {
  try {
    const session = await getSession({ req });
    const isSessionExpired = session?.expires
      ? isAfter(new Date(), parseISO(session.expires))
      : true;


    if (isSessionExpired) {
        res.redirect(200, '/tutorials');
        return;
        let courses = await prisma.course.findMany();
        let data =  await Promise.all(
        courses.map(async(course) => {
            const features = await prisma.feature.findMany(
                {
                    where: {courseId: course.id}
                }
            );
    
            return {
                ...course,
                features: features.map((features) => (features.description))
            }
        }));

      
        res.send({
            purchased:null,
            others: data,
            errorMessage: null
        });

        // return res.status(599).send({
        //     errorMessage: "Session expired"
        // })
    }


    const email = session?.user?.email;
    const user =  await prisma.user.findUnique({
        where: { email }
  })
    const purchases = await prisma.purchase.findMany({
          where: { userId : user.id}
    })

    const productIDs = purchases.map((purchase)=> purchase.productId);

    console.log(purchases, "purchases");


    let courses = await prisma.course.findMany();
    let data =  await Promise.all(
    courses.map(async(course) => {
        const features = await prisma.feature.findMany(
            {
                where: {courseId: course.id}
            }
        );

        return {
            ...course,
            features: features.map((features) => (features.description))
        }
    }));

    const [purchased, others] = data.reduce(([p, f], e) => (productIDs.includes(e.productId) ? [[...p, e], f] : [p, [...f, e]]), [[], []]);

  
    res.send({
        purchased,
        others,
        errorMessage: null
    });
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't found this Lesson!");
  }
};
export default handler;
