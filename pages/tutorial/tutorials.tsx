import React from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { fetcher } from "utils/SWRFetcher";
import useSWR from "swr";
import { GetStaticProps } from "next";

import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Tutorials from "../tutorials";

import styles from "../../styles/Product.module.scss";

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       session: await getServerSession(
//         context.req,
//         context.res,
//         authOptions
//       ),
//     },
//   }
// }

interface Props {
  lessons: {
    content: string;
    data: {
      [key: string]: any;
    };
    filePath: string;
  }[];
}

//using this one for now
const Lessons = () => {
  const { data, error } = useSWR<LessonResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons`,
    fetcher
  );

  const { data: session } = useSession();
  if (!session) {
    return <h1>Not Authorized. Please Login.</h1>;
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="prose mx-auto my-12 mx-12">
      {data?.purchased && data?.purchased?.length > 0 ? (
        <>
          {" "}
          <h1 className="text-2xl mx-12 my-12">Purchased</h1>
          <div className="w-full mx-12">
            <div className="w-full">
              {data?.purchased.map((lesson) => (
                <Link
                  as={`/tutorial/${lesson.courseBucket}`}
                  href={`/tutorial/[lesson]`}
                >
                  <div className="cursor-pointer flex mb-4">
                    <img className="h-48 w-48" src={lesson.imageRelativeUrl} />
                    <div className="flex-3 mx-8">
                      <span className="text-xl font-bold">{lesson.name}</span>
                      <p className="text-l flex-3">{lesson.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <a className="text-2xl mx-12 my-12" href="/tutorials">
            No purchsaed tutorials. If this is a mistake, contact
            cherhuang@goplanatrip.com{" "}
          </a>
        </>
      )}

      {data?.others && data?.others.length > 0 && (
        <>
          {" "}
          <h1 className="text-2xl mx-12 my-12 mt-8 border-b py-8">Browse lessons</h1>
          <div className="w-full mx-12">
            <Tutorials products={data?.others} isClassRoom={true}></Tutorials>
          </div>
        </>
      )}

      {/* {data?.others && data?.others.length > 0 && (
        <>
          {" "}
          <h1 className="text-2xl mx-12 my-12">Browse lessons</h1>
          <div className="w-full mx-12">
            <div className="w-full">
              {data?.others.map((lesson) => (
                // <Link
                //   as={`/tutorial/${lesson.courseBucket}`}
                //   href={`/tutorial/[lesson]`}
                //   action={`/api/purchase?productId=${lesson.id}&priceId=${lesson.priceId}`}

                // >
                <div className="cursor-pointer flex">
                  <img className="h-48 w-48" src={lesson.imageRelativeUrl} />
                  <div className="flex-3 mx-8">
                    <span className="text-xl font-bold">{lesson.name}</span>
                    <p className="text-l flex-3">{lesson.description}</p>
                    <form
                      action={`/api/purchase?productId=${lesson.id}&priceId=${lesson.priceId}`}
                      method="POST"
                    >
                      <button type="submit" role="link">
                        Purchase
                      </button>
                    </form>
                  </div>
                </div>
                // </Link>
              ))}
            </div>
          </div>
        </>
      )} */}
    </div>
  );
};

export default Lessons;
