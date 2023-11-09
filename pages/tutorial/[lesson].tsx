import { useEffect } from "react";
import { LessonResponse } from "pages/api/books/[book]";
import useSWRImmutable from "swr/immutable";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

import { useState, useRef } from "react";
import { fetcher } from "utils/SWRFetcher";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/router";

import TutorialParts from "components/course/TutorialParts";

const LoadingSkeleton = () => {
  return (
    <div className="flex justify-center max-w-screen-md mx-auto my-24">
      <ContentLoader
        speed={2}
        width={"100%"}
        height={"100%"}
        viewBox="0 0 557 305"
        backgroundColor="#f5f5f5"
        foregroundColor="#efefef"
      >
        <rect x="0" y="0" rx="3" ry="3" width="370" height="30" />
        <rect x="0" y="190" rx="4" ry="4" width="72" height="15" />
        <rect x="0" y="90" rx="4" ry="4" width="557" height="15" />
        <rect x="0" y="115" rx="4" ry="4" width="305" height="15" />
        <rect x="0" y="140" rx="4" ry="4" width="557" height="15" />
        <rect x="0" y="165" rx="4" ry="4" width="557" height="15" />
        <rect x="0" y="215" rx="4" ry="4" width="418" height="15" />
        <rect x="0" y="240" rx="4" ry="4" width="557" height="15" />
        <rect x="0" y="265" rx="4" ry="4" width="533" height="15" />
        <rect x="0" y="290" rx="4" ry="4" width="344" height="15" />
        <rect x="0" y="43" rx="3" ry="3" width="431" height="21" />
      </ContentLoader>
    </div>
  );
};

const ErrorComponent = (error?: String) => {
  return (
    <div className="prose max-w-screen-md mx-auto my-24">
      <h1> Error: {error ? error : "Couldn&apos;t find this Lesson!"} </h1>
      <p>
        Maybe the Lesson was removed by the author, please contact support
        cherhuang@goplanatrip.com
      </p>
    </div>
  );
};
export default function LessonPage() {
  const router = useRouter();
  const { lesson, courseType } = router.query;
  const { data, error } = useSWRImmutable<LessonResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tutorials/${lesson}?courseType=${courseType}`,
    fetcher
  );

  const [courseUrl, setCourseUrl] = useState(data?.mediaData[0].url);

  const [videoSrc, setVideoSrc] = useState({
    type: "video",
    sources: [
      {
        src: courseUrl,
        type: "video/mp4",
      },
    ],
  });

  useEffect(() => {
    setCourseUrl(data?.mediaData[0].url);
    if (courseType === "SINGLE_VIDEO") {
      setVideoSrc({
        type: "video",
        sources: [
          {
            src: data?.mediaData[0].url,
            type: "video/mp4",
          },
        ],
      });
    }
  }, [data]);

  console.log(courseUrl, courseType, data?.mediaData);

  if (error) {
    router.push(`error?error=${error.message}`);
  }
  return (
    //to do: adapt for multi-part content
    // const sectionItems = [
    //   {
    //     "title": "module 1",
    //     "parts": [
    //       {"title": "Part 1",
    //         "mediaType": "video",
    //         "duration": "2",
    //         "durationUnit": "minute",
    //         "href": "module1/part1"
    //       },
    //       {"title": "part 2",
    //       "mediaType": "video",
    //       "duration": "30",
    //       "durationUnit": "minute",
    //       "href": "module1/part2"
    //       },
    //       {"title": "Quiz",
    //       "mediaType": "quiz",
    //       "duration": "7",
    //       "durationUnit": "question",
    //       "href": "module1/part3"
    //       }
    //     ]
    //   },
    //     {"href": "test",
    //     "title": "module 2"},
    //     {"href": "test",
    //     "title": "module 3"},
    //     {"href": "test",
    //     "title": "module 4"},
    //     {"href": "test",
    //     "title": "module 5"}
    // ]
    //     <aside className='bg-gray-100 md:w-60 basis-48 shrink-0 grow-0'>
    //   <nav>
    //     <ul>
    //       {data?.mediaData?.map( ({name, parts}, i) => (
    //         parts && parts.length > 0 && (
    //           <div onClick={() => onSectionClicked(i)}>
    //            <li className='m-2' key={name}>
    //               <Link href={`/course/${lesson}/${i}`}>
    //                 <a
    //                   className={`flex p-2 bg-primaryShadow rounded hover:bg-gray-400 cursor-pointer`}
    //                 >
    //                   {name}
    //                 </a>
    //               </Link>
    //             </li>

    //         {/* { parts.map( ({partName, partType, partUrl}, j) => ( */}

    //             <CourseParts lesson={lesson} parts={parts} active={clickedSection == i? true: false}/>
    //         {/* ))} */}
    //          </ div> ) ) )}
    //     </ul>
    //   </nav>
    // </aside>
    <div className="flex flex-row">
      {data ? (
        data.mediaData && (
          // { data.mediaData && courseType === 'EBOOK' &&

          //         <object data={courseUrl} type="application/pdf" width="100%" height="100%">
          //     <p>Unable to display PDF file. <a href={courseUrl}>Download</a> instead.</p>
          // </object>
          // https://www.jotform.com/answers/4650040-fit-width-of-pdf-on-pdf-embedder-widget-to-screen-and-remove-its-preview
          <div className="flex-1 pl-6 my-0 grow-1">
            {data.mediaData && courseType === "SINGLE_VIDEO" && (
              <Plyr source={videoSrc} />
            )}
            {data.mediaData && courseType === "EBOOK" && (
              <a href={courseUrl}> Downdown the Ebook </a>
            )}
          </div>
        )
      ) : !error ? (
        <LoadingSkeleton />
      ) : (
        <ErrorComponent />
      )}

      <aside className="bg-gray-100 md:w-60 basis-48 shrink-0 grow-0">
        <nav>
          <ul>
            {data?.mediaData && (
              <TutorialParts lesson={lesson} parts={data?.mediaData} />
            )}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
