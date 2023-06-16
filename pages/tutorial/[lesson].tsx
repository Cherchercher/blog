import { LockClosedIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';
import { LessonResponse } from 'pages/api/lessons/[lesson]';
import useSWRImmutable from 'swr/immutable';
import Plyr from "plyr-react";
import "plyr-react/plyr.css"

import { useState, useRef } from 'react';
import { fetcher } from 'utils/SWRFetcher';
import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/router';

import TutorialParts from 'components/course/TutorialParts';

const LoadingSkeleton = () => {
  return (
    <div className="flex justify-center max-w-screen-md mx-auto my-24">
      <ContentLoader
        speed={2}
        width={'100%'}
        height={'100%'}
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


const ErrorComponent = ( error?: String) => {
  return (
    <div className="prose max-w-screen-md mx-auto my-24">
      <h1> Error: {error? error: "Couldn&apos;t find this Lesson!"} </h1>
      <p>
        Maybe the Lesson was removed by the author, please contact support cherhuang@goplanatrip.com
      </p>
    </div>
  );
};
export default function LessonPage() {
  const router = useRouter();

  const { lesson } = router.query;
  const { data, error } = useSWRImmutable<LessonResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tutorials/${lesson}`,
    fetcher,
  );


  const [ courseUrl, setCourseUrl] = useState(data?.mediaData[0].url);

  const [ videoSrc, setVideoSrc ] = useState({
    type: "video",
    sources: [
      {
        src: courseUrl,
        type: "video/mp4"
      }
    ]
  });

  useEffect(() => {
   setCourseUrl(data?.mediaData[0].url);
   setVideoSrc({
    type: "video",
    sources: [
      {
        src: data?.mediaData[0].url,
        type: "video/mp4"
      }
    ]
  })
}, [data])

if (error) {
  router.push(`error?error=${error.messae}`)
}
  return (
    <div className='flex flex-row'>
      {data ? (
        <div className="flex-1 pl-6 my-0 grow-1">
          { data.mediaData &&  <Plyr source={videoSrc} />}
        </div>
      ) : !error ? (
        <LoadingSkeleton />
      ) : (
        <ErrorComponent />
      )}

<aside className='bg-gray-100 md:w-60 basis-48 shrink-0 grow-0'>
  <nav>
    <ul>
      {data?.mediaData && (
            <TutorialParts lesson={lesson} parts={data?.mediaData}/>
      )}
    </ul>
  </nav>
</aside>

    </div>
  );
}
